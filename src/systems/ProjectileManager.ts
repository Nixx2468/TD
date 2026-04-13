import type { Projectile } from '../entities/Projectile';
import type { Enemy } from '../entities/Enemy';
import type { CollisionSystem } from './CollisionSystem';

export class ProjectileManager {
  private projectiles: Projectile[] = [];

  add(p: Projectile): void {
    // Reutilizar slot inactivo
    const slot = this.projectiles.findIndex(x => !x.active);
    if (slot >= 0) {
      this.projectiles[slot] = p;
    } else {
      this.projectiles.push(p);
    }
  }

  update(dt: number, enemies: Enemy[], cs: CollisionSystem): void {
    for (const p of this.projectiles) {
      if (!p.active) continue;
      p.update(dt);
      if (p.hit) {
        p.onImpact(enemies, cs);
        p.active = false;
      }
    }
    cs.check(this.projectiles, enemies);
  }

  getActive(): Projectile[] {
    return this.projectiles.filter(p => p.active);
  }

  clear(): void {
    this.projectiles = [];
  }
}
