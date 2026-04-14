import type { Enemy } from '../entities/Enemy';
import { EnemyType } from '../types/enums';

export class EnemyRenderer {
  drawAll(ctx: CanvasRenderingContext2D, enemies: Enemy[], time: number): void {
    for (const e of enemies) {
      if (!e.active && !e.converted) continue;
      this.drawEnemy(ctx, e, time);
    }
  }

  private drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy, time: number): void {
    const { x, y } = e.position;
    const r = e.config.size;

    ctx.save();

    if (e.converted) {
      // Auréola dourada pulsante ao converter
      const pulse = Math.sin(time * 6) * 0.5 + 0.5;
      ctx.shadowColor = '#f5d87a';
      ctx.shadowBlur = 16 + pulse * 12;
      ctx.strokeStyle = `rgba(245,216,122,${0.4 + pulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, r + 8 + pulse * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#c8aa60';
    } else {
      // Inimigo normal — leve oscilação vertical
      const bob = Math.sin(time * 3 + x * 0.05) * 1.5;
      ctx.translate(0, bob);
      ctx.fillStyle = e.config.colour;
    }

    // Corpo
    ctx.shadowColor = e.converted ? '#f5d87a' : 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Borda
    ctx.shadowBlur = 0;
    ctx.strokeStyle = e.converted ? '#f5d87a' : 'rgba(0,0,0,0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Voadores: anel tracejado animado
    if (e.flying && !e.converted) {
      const dashOffset = (time * 20) % 6;
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.lineDashOffset = -dashOffset;
      ctx.strokeStyle = '#6090c0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(x, y, r + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Boss: anel rotativo
    if (e.config.type === EnemyType.Boss && !e.converted) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(time * 0.8);
      ctx.strokeStyle = '#8040c0';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, r + 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Barra de purificação
    this.drawPurificationBar(ctx, e);

    ctx.restore();
  }

  private drawPurificationBar(ctx: CanvasRenderingContext2D, e: Enemy): void {
    const { x, y } = e.position;
    const r = e.config.size;
    const barW = r * 2 + 4;
    const barH = 4;
    const bx = x - barW / 2;
    const by = y - r - 10;

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(bx, by, barW, barH);

    const pct = e.purification / 100;
    if (pct > 0) {
      const grad = ctx.createLinearGradient(bx, by, bx + barW, by);
      grad.addColorStop(0, '#f5d87a');
      grad.addColorStop(1, '#ffffff');
      ctx.fillStyle = grad;
      ctx.fillRect(bx, by, barW * pct, barH);
    }

    ctx.strokeStyle = '#5a5030';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx, by, barW, barH);
  }
}
