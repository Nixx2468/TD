import { Scene } from '../core/Scene';
import type { Game } from '../core/Game';

export class PauseScene extends Scene {
  onEnter(): void {}
  onExit(): void {}

  update(_dt: number): void {
    for (const click of this.game.input.flush()) {
      void click;
      this.game.switchScene('game');
    }
    if (this.game.input.isKeyDown('p') || this.game.input.isKeyDown('P')) {
      this.game.switchScene('game');
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const W = this.game.W;
    const H = this.game.H;

    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.textAlign = 'center';

    // Caixa central
    ctx.fillStyle = 'rgba(6,8,16,0.95)';
    ctx.strokeStyle = '#6a5a30';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(W / 2 - 200, H / 2 - 100, 400, 200, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f5d87a';
    ctx.font = 'bold 40px serif';
    ctx.shadowColor = '#f5d87a';
    ctx.shadowBlur = 20;
    ctx.fillText('PAUSADO', W / 2, H / 2 - 30);
    ctx.shadowBlur = 0;

    // Cruz vitoriana
    ctx.strokeStyle = '#f5d87a44';
    ctx.beginPath();
    ctx.moveTo(W / 2, H / 2 - 10); ctx.lineTo(W / 2, H / 2 + 20);
    ctx.moveTo(W / 2 - 20, H / 2 + 6); ctx.lineTo(W / 2 + 20, H / 2 + 6);
    ctx.stroke();

    ctx.fillStyle = '#9a8a5a';
    ctx.font = '20px serif';
    ctx.fillText('Clica ou prime [P] para continuar', W / 2, H / 2 + 60);

    ctx.restore();
  }
}
