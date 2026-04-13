import { Tower } from '../Tower';
import { arrowConfig } from '../../data/towers/arrowConfig';
import type { Enemy } from '../Enemy';
import type { ProjectileManager } from '../../systems/ProjectileManager';
import { Arrow } from '../projectiles/Arrow';

export class ArrowTower extends Tower {
  constructor(tileX: number, tileY: number, tileSize: number) {
    super(arrowConfig, tileX, tileY, tileSize);
  }

  fire(enemies: Enemy[], pm: ProjectileManager): void {
    const t = this.acquireTarget(enemies);
    if (!t) return;
    this.target = t;
    const lc = this.currentLevel;
    pm.add(new Arrow(
      this.position.x,
      this.position.y,
      this.id,
      t,
      lc.damage,
      lc.projectileSpeed,
      this.config.accentColour
    ));
    this.cooldown = 1 / lc.fireRate;
  }
}
