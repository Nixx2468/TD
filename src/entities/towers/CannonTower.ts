import { Tower } from '../Tower';
import { cannonConfig } from '../../data/towers/cannonConfig';
import type { Enemy } from '../Enemy';
import type { ProjectileManager } from '../../systems/ProjectileManager';
import { CannonBall } from '../projectiles/CannonBall';

export class CannonTower extends Tower {
  constructor(tileX: number, tileY: number, tileSize: number) {
    super(cannonConfig, tileX, tileY, tileSize);
  }

  fire(enemies: Enemy[], pm: ProjectileManager): void {
    const t = this.acquireTarget(enemies);
    if (!t) return;
    this.target = t;
    const lc = this.currentLevel;
    pm.add(new CannonBall(
      this.position.x,
      this.position.y,
      this.id,
      t,
      lc.damage,
      lc.projectileSpeed,
      lc.splashRadius,
      this.config.accentColour
    ));
    this.cooldown = 1 / lc.fireRate;
  }
}
