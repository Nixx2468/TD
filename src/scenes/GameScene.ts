import { Scene } from '../core/Scene';
import { Game } from '../core/Game';
import { map1 } from '../data/maps/map1';
import { map2 } from '../data/maps/map2';
import { map3 } from '../data/maps/map3';
import { wavesMap1 } from '../data/waves/wavesMap1';
import { wavesMap2 } from '../data/waves/wavesMap2';
import { wavesMap3 } from '../data/waves/wavesMap3';
import type { MapData } from '../types/interfaces';
import type { Enemy } from '../entities/Enemy';
import type { Tower } from '../entities/Tower';
import { EconomyManager } from '../systems/EconomyManager';
import { WaveManager } from '../systems/WaveManager';
import { TowerManager } from '../systems/TowerManager';
import { ProjectileManager } from '../systems/ProjectileManager';
import { CollisionSystem } from '../systems/CollisionSystem';
import { PathSystem } from '../systems/PathSystem';
import { EffectSystem } from '../systems/EffectSystem';
import { MapRenderer } from '../renderer/MapRenderer';
import { EnemyRenderer } from '../renderer/EnemyRenderer';
import { TowerRenderer } from '../renderer/TowerRenderer';
import { ProjectileRenderer } from '../renderer/ProjectileRenderer';
import { HUD } from '../ui/HUD';
import { TowerPanel } from '../ui/TowerPanel';
import { TowerInfoPanel } from '../ui/TowerInfoPanel';
import { TowerType } from '../types/enums';

const MAPS: Record<string, MapData> = { map1, map2, map3 };
const WAVES = { map1: wavesMap1, map2: wavesMap2, map3: wavesMap3 };

export class GameScene extends Scene {
  private map!: MapData;
  private enemies: Enemy[] = [];
  private unsubs: (() => void)[] = [];

  private economy!: EconomyManager;
  private waveManager!: WaveManager;
  private towerManager!: TowerManager;
  private projectileManager!: ProjectileManager;
  private collisionSystem!: CollisionSystem;
  private pathSystem = new PathSystem();
  private effectSystem = new EffectSystem();

  private mapRenderer = new MapRenderer();
  private enemyRenderer = new EnemyRenderer();
  private towerRenderer = new TowerRenderer();
  private projectileRenderer = new ProjectileRenderer();
  private hud = new HUD();
  private towerPanel!: TowerPanel;
  private towerInfoPanel = new TowerInfoPanel();

  private paused = false;
  private time = 0;
  private speedMultiplier = 1;

  constructor(game: Game) { super(game); }

  onEnter(payload?: unknown): void {
    const { mapId } = payload as { mapId: string };
    this.map = MAPS[mapId] ?? map1;
    this.enemies = [];
    this.paused = false;
    this.time = 0;
    this.speedMultiplier = 1;

    const eb = this.game.eventBus;
    this.economy = new EconomyManager(this.map.startGold, this.map.startLives, eb);
    this.collisionSystem = new CollisionSystem(eb);
    this.projectileManager = new ProjectileManager();
    this.towerManager = new TowerManager(this.map, this.economy, eb);
    const waves = WAVES[mapId as keyof typeof WAVES] ?? wavesMap1;
    this.waveManager = new WaveManager(waves, this.enemies, this.map, eb);
    this.towerPanel = new TowerPanel(Game.W, Game.H);

    this.unsubs = [
      eb.on('enemy:killed', ({ enemy }) => {
        enemy.active = false;
        this.waveManager.spawnOnDeath(enemy);
      }),
      eb.on('enemy:converted', ({ enemy }) => {
        enemy.active = false;
        this.waveManager.spawnOnDeath(enemy);
      }),
      eb.on('game:over', ({ won, score }) => {
        setTimeout(() => {
          this.game.switchScene('gameover', { won, score, mapName: this.map.name });
        }, won ? 1200 : 600);
      }),
    ];
  }

  onExit(): void {
    this.unsubs.forEach(u => u());
    this.unsubs = [];
    this.economy.destroy();
    this.projectileManager.clear();
    this.enemies = [];
    this.game.eventBus.clear();
  }

  update(dt: number): void {
    if (this.paused) return;

    this.time += dt;
    const scaledDt = dt * this.speedMultiplier;

    // Input
    const clicks = this.game.input.flush();
    for (const click of clicks) {
      this.handleClick(click.x, click.y);
    }

    if (this.game.input.isKeyDown('Escape')) {
      this.towerManager.placementType = null;
      this.towerManager.selectedTower = null;
    }
    if (this.game.input.isKeyDown('p') || this.game.input.isKeyDown('P')) {
      this.game.switchScene('pause', { from: 'game' });
    }

    // Sistemas (a velocidade escalada)
    this.waveManager.update(scaledDt);
    this.towerManager.update(scaledDt, this.enemies, this.projectileManager);
    this.projectileManager.update(scaledDt, this.enemies, this.collisionSystem);
    this.effectSystem.update(scaledDt, this.enemies);

    // Mover inimigos
    for (const e of this.enemies) {
      if (!e.active) continue;
      const leaked = this.pathSystem.moveEnemy(e, this.map, scaledDt);
      if (leaked) {
        e.active = false;
        this.game.eventBus.emit('enemy:leaked', { enemy: e });
      }
    }

    // Limpar inactivos
    this.enemies = this.enemies.filter(e => e.active || e.converted);
    // Inimigos convertidos permanecem mas não são alvos
  }

  private handleClick(mx: number, my: number): void {
    const W = Game.W;
    const H = Game.H;

    // Botões do HUD (skip de wave e velocidade)
    const hudHit = this.hud.hitTest(mx, my);
    if (hudHit === 'skip') {
      this.waveManager.skipInterWave();
      this.economy.earn(25);
      return;
    }
    if (hudHit === 'speed') {
      this.speedMultiplier = this.speedMultiplier === 3 ? 1 : this.speedMultiplier + 1;
      return;
    }

    // Painel de informação da torre seleccionada
    const sel = this.towerManager.selectedTower;
    if (sel) {
      if (this.towerInfoPanel.upgradeButtonHit(mx, my, sel, W)) {
        this.towerManager.upgrade(sel);
        return;
      }
      if (this.towerInfoPanel.sellButtonHit(mx, my, sel, W)) {
        this.towerManager.sell(sel);
        return;
      }
    }

    // Painel de compra
    const btn = this.towerPanel.buttonAt(mx, my);
    if (btn) {
      this.towerManager.placementType = this.towerManager.placementType === btn.type ? null : btn.type;
      this.towerManager.selectedTower = null;
      return;
    }

    // Área de jogo
    if (my < this.towerPanel.panelY) {
      const tileX = Math.floor(mx / this.map.tileSize);
      const tileY = Math.floor(my / this.map.tileSize);

      if (this.towerManager.placementType !== null) {
        this.towerManager.place(this.towerManager.placementType, tileX, tileY);
        // Manter selecção para colocar mais
      } else {
        const tower = this.towerManager.towerAt(tileX, tileY);
        this.towerManager.selectedTower = tower;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const W = Game.W;
    const H = Game.H;
    const mapH = this.map.rows * this.map.tileSize;

    // Fundo
    ctx.fillStyle = this.map.backgroundColour;
    ctx.fillRect(0, 0, W, H);

    // Offset para HUD no topo
    ctx.save();
    ctx.translate(0, 48);

    // Preview de colocação
    const { mousePosition } = this.game.input;
    const adjY = mousePosition.y - 48;
    if (this.towerManager.placementType !== null && adjY > 0 && adjY < mapH) {
      const tileX = Math.floor(mousePosition.x / this.map.tileSize);
      const tileY = Math.floor(adjY / this.map.tileSize);
      this.mapRenderer.drawBuildableHighlight(ctx, this.map, tileX, tileY, this.towerManager.canPlace(tileX, tileY));
    }

    this.mapRenderer.draw(ctx, this.map);
    this.towerRenderer.drawAll(ctx, this.towerManager.towers, this.towerManager.selectedTower, this.time);
    this.enemyRenderer.drawAll(ctx, this.enemies, this.time);
    this.projectileRenderer.drawAll(ctx, this.projectileManager.getActive());

    ctx.restore();

    // HUD (sem translate)
    this.hud.draw(
      ctx,
      this.economy,
      this.waveManager.currentWaveNumber,
      this.waveManager.totalWaves,
      this.waveManager.isBetweenWaves,
      this.waveManager.interWaveTimeLeft,
      this.speedMultiplier,
      W
    );

    // Painel de torres
    this.towerPanel.draw(ctx, this.economy, this.towerManager.placementType, W, H);

    // Info da torre seleccionada
    if (this.towerManager.selectedTower) {
      this.towerInfoPanel.draw(ctx, this.towerManager.selectedTower, this.economy, W);
    }

    // Tecla P — pausa
    ctx.save();
    ctx.textAlign = 'right';
    ctx.fillStyle = '#3a3020';
    ctx.font = '11px serif';
    ctx.fillText('[P] pausar', W - 160, H - 6);
    ctx.restore();
  }
}
