import type { Projectile } from '../entities/Projectile';
import type { Enemy } from '../entities/Enemy';
import type { Vec2 } from '../types/interfaces';
import type { EventBus } from '../core/EventBus';

function circleOverlap(ax: number, ay: number, ar: number, bx: number, by: number, br: number): boolean {
  const dx = ax - bx;
  const dy = ay - by;
  const r = ar + br;
  return dx * dx + dy * dy < r * r;
}

export class CollisionSystem {
  constructor(private eventBus: EventBus) {}

  check(projectiles: Projectile[], enemies: Enemy[]): void {
    for (const p of projectiles) {
      if (!p.active || p.hit) continue;
      for (const e of enemies) {
        if (!e.active || e.converted) continue;
        if (circleOverlap(p.position.x, p.position.y, p.radius, e.position.x, e.position.y, e.config.size)) {
          p.hit = true;
          p.onImpact(enemies, this);
          this.eventBus.emit('projectile:hit', { projectile: p, enemy: e });
          break;
        }
      }
    }
  }

  splashPurify(center: Vec2, radius: number, amount: number, enemies: Enemy[]): void {
    const rSq = radius * radius;
    for (const e of enemies) {
      if (!e.active || e.converted) continue;
      const dx = e.position.x - center.x;
      const dy = e.position.y - center.y;
      if (dx * dx + dy * dy <= rSq) {
        const converted = e.purify(amount);
        if (converted) {
          e.active = false;
          this.eventBus.emit('enemy:converted', { enemy: e });
        }
      }
    }
  }
}
