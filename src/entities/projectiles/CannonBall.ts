import { Projectile } from '../Projectile';
import type { Enemy } from '../Enemy';
import type { CollisionSystem } from '../../systems/CollisionSystem';

export class CannonBall extends Projectile {
  private target: Enemy;
  private speed: number;
  private vx = 0;
  private vy = 0;
  private initialized = false;

  constructor(
    x: number, y: number,
    ownerId: string,
    target: Enemy,
    damage: number,
    speed: number,
    splashRadius: number,
    colour: string
  ) {
    super(x, y, ownerId, damage, splashRadius, 1, 0, colour, 8);
    this.target = target;
    this.speed = speed;
  }

  update(dt: number): void {
    if (!this.initialized) {
      const dx = this.target.position.x - this.position.x;
      const dy = this.target.position.y - this.position.y;
      const d = Math.sqrt(dx * dx + dy * dy) || 1;
      this.vx = (dx / d) * this.speed;
      this.vy = (dy / d) * this.speed;
      this.initialized = true;
    }
    this.position.x += this.vx * dt;
    this.position.y += this.vy * dt;

    // Detecção por proximidade do alvo
    const dx = this.target.position.x - this.position.x;
    const dy = this.target.position.y - this.position.y;
    if (dx * dx + dy * dy < 100) this.hit = true;
  }

  onImpact(enemies: Enemy[], cs: CollisionSystem): void {
    cs.splashPurify(this.position, this.splashRadius, this.damage, enemies);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.colour;
    ctx.shadowColor = this.colour;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}
