import type { Vec2 } from '../types/interfaces';

let nextId = 0;

export abstract class Entity {
  readonly id: string;
  position: Vec2;
  active = true;

  constructor(x: number, y: number) {
    this.id = String(nextId++);
    this.position = { x, y };
  }

  abstract update(dt: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
