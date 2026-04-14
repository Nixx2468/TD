import { Scene } from './Scene';
import { EventBus } from './EventBus';
import { InputHandler } from './InputHandler';
import { AssetLoader } from './AssetLoader';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { GameScene } from '../scenes/GameScene';
import { GameOverScene } from '../scenes/GameOverScene';
import { PauseScene } from '../scenes/PauseScene';

export class Game {
  readonly canvas: HTMLCanvasElement;
  readonly ctx: CanvasRenderingContext2D;
  readonly eventBus = new EventBus();
  readonly input: InputHandler;
  readonly assets = new AssetLoader();

  get W(): number { return this.canvas.width; }
  get H(): number { return this.canvas.height; }

  private scenes = new Map<string, Scene>();
  private currentScene!: Scene;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.fitCanvas();
    this.ctx = canvas.getContext('2d')!;
    this.input = new InputHandler(canvas);

    this.scenes.set('menu', new MainMenuScene(this));
    this.scenes.set('game', new GameScene(this));
    this.scenes.set('gameover', new GameOverScene(this));
    this.scenes.set('pause', new PauseScene(this));

    window.addEventListener('resize', () => this.fitCanvas());
  }

  private fitCanvas(): void {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  async start(): Promise<void> {
    await this.assets.load({});
    document.getElementById('loading')?.classList.add('hidden');
    this.switchScene('menu');
    requestAnimationFrame(this.loop.bind(this));
  }

  switchScene(name: string, payload?: unknown): void {
    this.currentScene?.onExit();
    const next = this.scenes.get(name);
    if (!next) throw new Error(`Cena não encontrada: ${name}`);
    this.currentScene = next;
    this.currentScene.onEnter(payload);
  }

  private loop(timestamp: number): void {
    const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
    this.lastTime = timestamp;

    this.currentScene.update(dt);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentScene.draw(this.ctx);

    requestAnimationFrame(this.loop.bind(this));
  }
}
