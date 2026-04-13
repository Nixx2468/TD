import { Projectile } from '../Projectile';
import type { Enemy } from '../Enemy';
import type { CollisionSystem } from '../../systems/CollisionSystem';

export class Arrow extends Projectile {
  private target: Enemy;
  private speed: number;

  constructor(
    x: number, y: number,
    ownerId: string,
    target: Enemy,
    damage: number,
    speed: number,
    colour: string
  ) {
    super(x, y, ownerId, damage, 0, 1, 0, colour, 5);
    this.target = target;
    this.speed = speed;
  }

  update(dt: number): void {
    if (!this.target.active) { this.active = false; return; }
    const dx = this.target.position.x - this.position.x;
    const dy = this.target.position.y - this.position.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    if (d < 6) { this.hit = true; return; }
    const step = this.speed * dt;
    this.position.x += (dx / d) * step;
    this.position.y += (dy / d) * step;
  }

  onImpact(enemies: Enemy[], _cs: CollisionSystem): void {
    if (!this.target.active) return;
    this.target.purify(this.damage);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.colour;
    ctx.shadowColor = this.colour;
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
