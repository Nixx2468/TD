import type { EconomyManager } from '../systems/EconomyManager';

export class HUD {
  draw(
    ctx: CanvasRenderingContext2D,
    economy: EconomyManager,
    waveNumber: number,
    totalWaves: number,
    W: number
  ): void {
    const H_HUD = 48;
    const y = 0;

    // Barra de fundo
    ctx.fillStyle = 'rgba(6,8,16,0.92)';
    ctx.fillRect(0, y, W, H_HUD);

    // Linha dourada inferior
    ctx.strokeStyle = '#3a3010';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, H_HUD);
    ctx.lineTo(W, H_HUD);
    ctx.stroke();

    ctx.save();
    ctx.font = 'bold 18px serif';
    ctx.textBaseline = 'middle';
    const midY = y + H_HUD / 2;

    // Vidas
    ctx.fillStyle = '#e05050';
    ctx.fillText('♥', 20, midY);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillText(String(economy.lives), 42, midY);

    // Ouro
    ctx.fillStyle = '#f5d87a';
    ctx.fillText('✦', 100, midY);
    ctx.fillStyle = '#f0f0f0';
    ctx.fillText(String(economy.gold), 122, midY);

    // Wave
    ctx.textAlign = 'center';
    ctx.fillStyle = '#c8aa60';
    ctx.fillText(`Wave ${waveNumber} / ${totalWaves}`, W / 2, midY);

    // Score
    ctx.textAlign = 'right';
    ctx.fillStyle = '#9090c0';
    ctx.fillText(`Score: ${economy.score}`, W - 20, midY);

    ctx.restore();
  }
}
