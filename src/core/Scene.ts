import type { Game } from './Game';

export abstract class Scene {
  constructor(protected game: Game) {}

  abstract onEnter(payload?: unknown): void;
  abstract onExit(): void;
  abstract update(dt: number): void;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
