import { Entity } from './Entity';
import type { Enemy } from './Enemy';
import type { CollisionSystem } from '../systems/CollisionSystem';

export abstract class Projectile extends Entity {
  hit = false;
  readonly damage: number;
  readonly splashRadius: number;
  readonly slowFactor: number;
  readonly slowDuration: number;
  readonly ownerId: string;
  readonly colour: string;
  readonly radius: number;

  constructor(
    x: number,
    y: number,
    ownerId: string,
    damage: number,
    splashRadius: number,
    slowFactor: number,
    slowDuration: number,
    colour: string,
    radius: number
  ) {
    super(x, y);
    this.ownerId = ownerId;
    this.damage = damage;
    this.splashRadius = splashRadius;
    this.slowFactor = slowFactor;
    this.slowDuration = slowDuration;
    this.colour = colour;
    this.radius = radius;
  }

  abstract onImpact(enemies: Enemy[], cs: CollisionSystem): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
