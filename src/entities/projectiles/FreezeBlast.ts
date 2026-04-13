import { Projectile } from '../Projectile';
import type { Enemy } from '../Enemy';
import type { CollisionSystem } from '../../systems/CollisionSystem';
import { EffectType } from '../../types/enums';

export class FreezeBlast extends Projectile {
  private target: Enemy;
  private speed: number;

  constructor(
    x: number, y: number,
    ownerId: string,
    target: Enemy,
    speed: number,
    slowFactor: number,
    slowDuration: number,
    colour: string
  ) {
    super(x, y, ownerId, 0, 0, slowFactor, slowDuration, colour, 6);
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

  onImpact(_enemies: Enemy[], _cs: CollisionSystem): void {
    if (!this.target.active) return;
    this.target.applyEffect({
      type: EffectType.Slow,
      factor: this.slowFactor,
      duration: this.slowDuration,
    });
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.colour;
    ctx.globalAlpha = 0.8;
    ctx.shadowColor = '#a0d0ff';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
