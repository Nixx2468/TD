import type { Vec2 } from '../types/interfaces';

export class InputHandler {
  readonly clickQueue: Vec2[] = [];
  mousePosition: Vec2 = { x: 0, y: 0 };
  private keys = new Set<string>();
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    canvas.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    window.addEventListener('keydown', e => this.keys.add(e.key));
    window.addEventListener('keyup', e => this.keys.delete(e.key));
  }

  private toCanvas(clientX: number, clientY: number): Vec2 {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  }

  private onMouseDown(e: MouseEvent): void {
    this.clickQueue.push(this.toCanvas(e.clientX, e.clientY));
  }

  private onMouseMove(e: MouseEvent): void {
    this.mousePosition = this.toCanvas(e.clientX, e.clientY);
  }

  private onTouchStart(e: TouchEvent): void {
    e.preventDefault();
    const t = e.touches[0];
    if (t) this.clickQueue.push(this.toCanvas(t.clientX, t.clientY));
  }

  private onTouchMove(e: TouchEvent): void {
    e.preventDefault();
    const t = e.touches[0];
    if (t) this.mousePosition = this.toCanvas(t.clientX, t.clientY);
  }

  isKeyDown(key: string): boolean {
    return this.keys.has(key);
  }

  flush(): Vec2[] {
    return this.clickQueue.splice(0);
  }
}
