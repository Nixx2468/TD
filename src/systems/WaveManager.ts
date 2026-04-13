import type { EventBus } from '../core/EventBus';
import type { WaveConfig, SpawnGroup, MapData, Vec2 } from '../types/interfaces';
import type { Enemy } from '../entities/Enemy';
import { EnemyType } from '../types/enums';
import { BasicEnemy } from '../entities/enemies/BasicEnemy';
import { FastEnemy } from '../entities/enemies/FastEnemy';
import { TankEnemy } from '../entities/enemies/TankEnemy';
import { FlyingEnemy } from '../entities/enemies/FlyingEnemy';
import { BossEnemy } from '../entities/enemies/BossEnemy';

type Phase = 'waiting' | 'spawning' | 'between' | 'complete';

interface ActiveGroup {
  group: SpawnGroup;
  spawned: number;
  elapsed: number;
  timer: number;
  started: boolean;
}

export class WaveManager {
  private waveIndex = 0;
  private phase: Phase = 'between';
  private interWaveTimer = 3; // pausa inicial antes da wave 1
  private activeGroups: ActiveGroup[] = [];
  private waveElapsed = 0;

  totalEnemiesAlive = 0;

  constructor(
    private waves: WaveConfig[],
    private enemies: Enemy[],
    private map: MapData,
    private eventBus: EventBus
  ) {}

  get currentWaveNumber(): number {
    return Math.min(this.waveIndex + 1, this.waves.length);
  }

  get totalWaves(): number {
    return this.waves.length;
  }

  get isComplete(): boolean {
    return this.phase === 'complete';
  }

  update(dt: number): void {
    if (this.phase === 'complete') return;

    this.totalEnemiesAlive = this.enemies.filter(e => e.active && !e.converted).length;

    if (this.phase === 'between') {
      this.interWaveTimer -= dt;
      if (this.interWaveTimer <= 0) {
        this.startNextWave();
      }
      return;
    }

    if (this.phase === 'waiting') return;

    // Spawning
    this.waveElapsed += dt;
    for (const ag of this.activeGroups) {
      if (!ag.started && this.waveElapsed >= ag.group.delay) {
        ag.started = true;
      }
      if (!ag.started) continue;

      ag.timer -= dt;
      if (ag.timer <= 0 && ag.spawned < ag.group.count) {
        this.spawnEnemy(ag.group.enemyType);
        ag.spawned++;
        ag.timer = ag.group.interval;
      }
    }

    // Verifica se todos os grupos terminaram
    const allGroupsDone = this.activeGroups.every(ag => ag.spawned >= ag.group.count);
    if (allGroupsDone && this.totalEnemiesAlive === 0) {
      const wave = this.waves[this.waveIndex - 1];
      if (wave) {
        this.eventBus.emit('wave:completed', { waveNumber: wave.waveNumber });
      }
      if (this.waveIndex >= this.waves.length) {
        this.phase = 'complete';
        this.eventBus.emit('game:over', { won: true, score: 0 });
      } else {
        this.phase = 'between';
        this.interWaveTimer = wave?.interWaveDelay ?? 10;
      }
    }
  }

  private startNextWave(): void {
    if (this.waveIndex >= this.waves.length) {
      this.phase = 'complete';
      return;
    }
    const wave = this.waves[this.waveIndex]!;
    this.waveIndex++;
    this.waveElapsed = 0;
    this.activeGroups = wave.groups.map(g => ({
      group: g,
      spawned: 0,
      elapsed: 0,
      timer: 0,
      started: false,
    }));
    this.phase = 'spawning';
    this.eventBus.emit('wave:started', { waveNumber: wave.waveNumber });
  }

  private spawnEnemy(type: EnemyType): void {
    const waveN = this.waveIndex;
    const hpScale = 1 + 0.12 * (waveN - 1);
    const speedScale = 1 + 0.04 * (waveN - 1);

    const start: Vec2 = this.map.waypoints[0] ?? { x: -64, y: 300 };
    const flyStart: Vec2 = this.map.flyingPath[0];

    let enemy: Enemy;
    switch (type) {
      case EnemyType.Fast:    enemy = new FastEnemy(start); break;
      case EnemyType.Tank:    enemy = new TankEnemy(start); break;
      case EnemyType.Flying:  enemy = new FlyingEnemy(flyStart); break;
      case EnemyType.Boss:    enemy = new BossEnemy(start); break;
      default:                enemy = new BasicEnemy(start); break;
    }

    // Aplicar scaling
    (enemy.config as { hp: number }).hp = Math.round(enemy.config.hp * hpScale);
    (enemy.config as { speed: number }).speed = Math.round(enemy.config.speed * speedScale);

    this.enemies.push(enemy);
    this.totalEnemiesAlive++;
  }

  // Chamado ao converter um inimigo para spawnar os filhos se for Boss
  spawnOnDeath(enemy: Enemy): void {
    if (!enemy.config.spawnOnDeath) return;
    const { type, count } = enemy.config.spawnOnDeath;
    for (let i = 0; i < count; i++) {
      this.spawnEnemy(type);
    }
  }
}
