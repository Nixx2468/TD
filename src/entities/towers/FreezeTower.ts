import { Tower } from '../Tower';
import { freezeConfig } from '../../data/towers/freezeConfig';
import type { Enemy } from '../Enemy';
import type { ProjectileManager } from '../../systems/ProjectileManager';
import { FreezeBlast } from '../projectiles/FreezeBlast';

export class FreezeTower extends Tower {
  constructor(tileX: number, tileY: number, tileSize: number) {
    super(freezeConfig, tileX, tileY, tileSize);
  }

  fire(enemies: Enemy[], pm: ProjectileManager): void {
    const t = this.acquireTarget(enemies);
    if (!t) return;
    this.target = t;
    const lc = this.currentLevel;
    pm.add(new FreezeBlast(
      this.position.x,
      this.position.y,
      this.id,
      t,
      lc.projectileSpeed,
      lc.slowFactor,
      lc.slowDuration,
      this.config.accentColour
    ));
    this.cooldown = 1 / lc.fireRate;
  }
}
