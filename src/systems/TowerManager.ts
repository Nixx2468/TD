import type { Tower } from '../entities/Tower';
import type { Enemy } from '../entities/Enemy';
import type { MapData } from '../types/interfaces';
import type { ProjectileManager } from './ProjectileManager';
import type { EconomyManager } from './EconomyManager';
import type { EventBus } from '../core/EventBus';
import { TileType, TowerType } from '../types/enums';
import { ArrowTower } from '../entities/towers/ArrowTower';
import { CannonTower } from '../entities/towers/CannonTower';
import { FreezeTower } from '../entities/towers/FreezeTower';
import { LaserTower } from '../entities/towers/LaserTower';

export class TowerManager {
  towers: Tower[] = [];
  selectedTower: Tower | null = null;
  placementType: TowerType | null = null;
  private occupied = new Set<string>();

  constructor(
    private map: MapData,
    private economy: EconomyManager,
    private eventBus: EventBus
  ) {}

  private key(tx: number, ty: number): string { return `${tx},${ty}`; }

  canPlace(tileX: number, tileY: number): boolean {
    const tile = this.map.tiles[tileY]?.[tileX];
    if (tile !== TileType.Buildable) return false;
    return !this.occupied.has(this.key(tileX, tileY));
  }

  place(type: TowerType, tileX: number, tileY: number): boolean {
    if (!this.canPlace(tileX, tileY)) return false;
    const tower = this.createTower(type, tileX, tileY);
    const cost = tower.currentLevel.cost;
    if (!this.economy.spend(cost)) return false;
    this.towers.push(tower);
    this.occupied.add(this.key(tileX, tileY));
    this.eventBus.emit('tower:placed', { tower, cost });
    return true;
  }

  private createTower(type: TowerType, tx: number, ty: number): Tower {
    const ts = this.map.tileSize;
    switch (type) {
      case TowerType.Arrow:  return new ArrowTower(tx, ty, ts);
      case TowerType.Cannon: return new CannonTower(tx, ty, ts);
      case TowerType.Freeze: return new FreezeTower(tx, ty, ts);
      case TowerType.Laser:  return new LaserTower(tx, ty, ts, this.eventBus);
    }
  }

  upgrade(tower: Tower): boolean {
    if (!tower.canUpgrade()) return false;
    const cost = tower.upgradeCost();
    if (!this.economy.spend(cost)) return false;
    tower.level++;
    this.eventBus.emit('tower:upgraded', { tower, level: tower.level, cost });
    return true;
  }

  sell(tower: Tower): void {
    const refund = tower.sellValue();
    this.economy.earn(refund);
    this.towers = this.towers.filter(t => t !== tower);
    this.occupied.delete(this.key(tower.tileX, tower.tileY));
    if (this.selectedTower === tower) this.selectedTower = null;
    this.eventBus.emit('tower:sold', { tower, refund });
  }

  update(dt: number, enemies: Enemy[], pm: ProjectileManager): void {
    for (const tower of this.towers) {
      tower.update(dt);
      if (tower.cooldown <= 0) {
        tower.fire(enemies, pm);
      }
    }
  }

  towerAt(tileX: number, tileY: number): Tower | null {
    return this.towers.find(t => t.tileX === tileX && t.tileY === tileY) ?? null;
  }
}
