import type { Enemy } from '../entities/Enemy';
import { EnemyType } from '../types/enums';

export class EnemyRenderer {
  drawAll(ctx: CanvasRenderingContext2D, enemies: Enemy[]): void {
    for (const e of enemies) {
      if (!e.active) continue;
      this.drawEnemy(ctx, e);
    }
  }

  private drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy): void {
    const { x, y } = e.position;
    const r = e.config.size;

    ctx.save();

    if (e.converted) {
      // Inimigo convertido — auréola dourada
      ctx.shadowColor = '#f5d87a';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#f5d87a44';
      ctx.beginPath();
      ctx.arc(x, y, r + 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Corpo
    ctx.fillStyle = e.converted ? '#c8aa60' : e.config.colour;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    // Borda
    ctx.strokeStyle = e.converted ? '#f5d87a' : 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Voadores: anel tracejado
    if (e.flying && !e.converted) {
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = '#6090c0';
      ctx.beginPath();
      ctx.arc(x, y, r + 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Boss: anel extra espesso
    if (e.config.type === EnemyType.Boss && !e.converted) {
      ctx.strokeStyle = '#8040c0';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(x, y, r + 2, 0, Math.PI * 2);
      ctx.stroke();
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

    // Fundo
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(bx, by, barW, barH);

    // Preenchimento (luz divina dourada)
    const pct = e.purification / 100;
    const grad = ctx.createLinearGradient(bx, by, bx + barW, by);
    grad.addColorStop(0, '#f5d87a');
    grad.addColorStop(1, '#ffffff');
    ctx.fillStyle = grad;
    ctx.fillRect(bx, by, barW * pct, barH);

    // Borda
    ctx.strokeStyle = '#5a5030';
    ctx.lineWidth = 0.5;
    ctx.strokeRect(bx, by, barW, barH);
  }
}
