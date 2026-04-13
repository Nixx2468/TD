import type { Projectile } from '../entities/Projectile';

export class ProjectileRenderer {
  drawAll(ctx: CanvasRenderingContext2D, projectiles: Projectile[]): void {
    for (const p of projectiles) {
      if (!p.active) continue;
      p.draw(ctx);
    }
  }
}
