import { Entity } from './Entity';
import type { TowerConfig, TowerLevelConfig } from '../types/interfaces';
import type { Enemy } from './Enemy';
import type { ProjectileManager } from '../systems/ProjectileManager';
import { TargetMode } from '../types/enums';

export abstract class Tower extends Entity {
  level = 0;
  cooldown = 0;
  target: Enemy | null = null;
  targetMode: TargetMode;
  tileX: number;
  tileY: number;
  beamActive = false;
  beamTimer = 0;

  constructor(
    public readonly config: TowerConfig,
    tileX: number,
    tileY: number,
    tileSize: number
  ) {
    const cx = tileX * tileSize + tileSize / 2;
    const cy = tileY * tileSize + tileSize / 2;
    super(cx, cy);
    this.tileX = tileX;
    this.tileY = tileY;
    this.targetMode = config.defaultTargetMode;
  }

  get currentLevel(): TowerLevelConfig {
    return this.config.levels[this.level]!;
  }

  canUpgrade(): boolean {
    return this.level < 2;
  }

  sellValue(): number {
    return this.currentLevel.sellValue;
  }

  upgradeCost(): number {
    if (!this.canUpgrade()) return 0;
    return this.config.levels[this.level + 1]!.cost;
  }

  update(dt: number): void {
    if (this.beamActive) {
      this.beamTimer -= dt;
      if (this.beamTimer <= 0) this.beamActive = false;
    }
    if (this.cooldown > 0) {
      this.cooldown -= dt;
    }
  }

  acquireTarget(enemies: Enemy[]): Enemy | null {
    const lc = this.currentLevel;
    const rangeSq = lc.range * lc.range;
    const candidates = enemies.filter(e => {
      if (!e.active || e.converted) return false;
      if (e.flying && !this.config.canTargetFlying) return false;
      const dx = e.position.x - this.position.x;
      const dy = e.position.y - this.position.y;
      return dx * dx + dy * dy <= rangeSq;
    });
    if (candidates.length === 0) return null;

    switch (this.targetMode) {
      case TargetMode.First:
        return candidates.reduce((a, b) => a.pathProgress > b.pathProgress ? a : b);
      case TargetMode.Last:
        return candidates.reduce((a, b) => a.pathProgress < b.pathProgress ? a : b);
      case TargetMode.Strongest:
        return candidates.reduce((a, b) => a.config.hp > b.config.hp ? a : b);
      case TargetMode.Weakest:
        return candidates.reduce((a, b) => a.config.hp < b.config.hp ? a : b);
      case TargetMode.Closest: {
        return candidates.reduce((a, b) => {
          const dxa = a.position.x - this.position.x;
          const dya = a.position.y - this.position.y;
          const dxb = b.position.x - this.position.x;
          const dyb = b.position.y - this.position.y;
          return (dxa*dxa+dya*dya) < (dxb*dxb+dyb*dyb) ? a : b;
        });
      }
    }
  }

  abstract fire(enemies: Enemy[], pm: ProjectileManager): void;
  draw(_ctx: CanvasRenderingContext2D): void {} // delegado ao TowerRenderer
}
