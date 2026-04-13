import { Scene } from '../core/Scene';
import type { Game } from '../core/Game';

interface Payload {
  won: boolean;
  score: number;
  mapName: string;
}

export class GameOverScene extends Scene {
  private payload: Payload = { won: false, score: 0, mapName: '' };

  onEnter(payload?: unknown): void {
    this.payload = payload as Payload;
  }

  onExit(): void {}

  update(_dt: number): void {
    for (const click of this.game.input.flush()) {
      void click;
      this.game.switchScene('menu');
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const W = 1280;
    const H = 960;
    const { won, score, mapName } = this.payload;

    const bg = ctx.createLinearGradient(0, 0, 0, H);
    if (won) {
      bg.addColorStop(0, '#060c04');
      bg.addColorStop(1, '#0e1c08');
    } else {
      bg.addColorStop(0, '#0c0604');
      bg.addColorStop(1, '#1c0808');
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Auréola
    const glow = ctx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 400);
    glow.addColorStop(0, won ? 'rgba(245,216,122,0.18)' : 'rgba(200,60,60,0.12)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    ctx.save();
    ctx.textAlign = 'center';

    if (won) {
      ctx.fillStyle = '#f5d87a';
      ctx.font = 'bold 80px serif';
      ctx.shadowColor = '#f5d87a';
      ctx.shadowBlur = 40;
      ctx.fillText('CO\'OVATINA PERSISTE', W / 2, 340);
      ctx.shadowBlur = 0;

      ctx.font = '28px serif';
      ctx.fillStyle = '#c8aa60';
      ctx.fillText('O Domínio Vorrhan foi purificado em ' + mapName, W / 2, 410);
    } else {
      ctx.fillStyle = '#e05050';
      ctx.font = 'bold 80px serif';
      ctx.shadowColor = '#e05050';
      ctx.shadowBlur = 40;
      ctx.fillText('O NEXUS FOI TOMADO', W / 2, 340);
      ctx.shadowBlur = 0;

      ctx.font = '28px serif';
      ctx.fillStyle = '#c87070';
      ctx.fillText('Co\'ovatina cai em ' + mapName, W / 2, 410);
    }

    ctx.fillStyle = '#9a8a5a';
    ctx.font = '32px serif';
    ctx.fillText(`Purificação acumulada: ${score}`, W / 2, 490);

    // Cruz decorativa
    ctx.strokeStyle = won ? '#f5d87a44' : '#e0505044';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2, 530); ctx.lineTo(W / 2, 590);
    ctx.moveTo(W / 2 - 40, 560); ctx.lineTo(W / 2 + 40, 560);
    ctx.stroke();

    ctx.fillStyle = '#6a5a30';
    ctx.font = '20px serif';
    ctx.fillText('— Clica para regressar ao menu —', W / 2, 640);

    ctx.restore();
  }
}
