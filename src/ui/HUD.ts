import type { EconomyManager } from '../systems/EconomyManager';

export interface HUDButtons {
  skipWave: { x: number; y: number; w: number; h: number } | null;
  speed:    { x: number; y: number; w: number; h: number };
}

export const HUD_H = 48;

export class HUD {
  private lastButtons: HUDButtons = { skipWave: null, speed: { x: 0, y: 0, w: 0, h: 0 } };

  draw(
    ctx: CanvasRenderingContext2D,
    economy: EconomyManager,
    waveNumber: number,
    totalWaves: number,
    isBetweenWaves: boolean,
    timeLeft: number,
    speedMultiplier: number,
    W: number
  ): HUDButtons {
    // Fundo
    ctx.fillStyle = 'rgba(6,8,16,0.95)';
    ctx.fillRect(0, 0, W, HUD_H);
    ctx.strokeStyle = '#3a3010';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, HUD_H);
    ctx.lineTo(W, HUD_H);
    ctx.stroke();

    ctx.save();
    ctx.font = 'bold 18px serif';
    ctx.textBaseline = 'middle';
    const midY = HUD_H / 2;

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

    // Botão de velocidade (canto sup. esquerdo, abaixo do HUD)
    const speedBtn = { x: 8, y: HUD_H + 8, w: 48, h: 28 };
    ctx.save();
    ctx.fillStyle = 'rgba(245,216,122,0.15)';
    ctx.strokeStyle = '#f5d87a88';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(speedBtn.x, speedBtn.y, speedBtn.w, speedBtn.h, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#f5d87a';
    ctx.font = 'bold 13px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${speedMultiplier}×`, speedBtn.x + speedBtn.w / 2, speedBtn.y + speedBtn.h / 2);
    ctx.restore();

    // Botão de skip de wave
    let skipBtn: HUDButtons['skipWave'] = null;
    if (isBetweenWaves) {
      const secs = Math.ceil(timeLeft);
      const label = `⏭ Próxima onda  +25✦  (${secs}s)`;
      const bW = 280;
      const bH = 30;
      const bX = W / 2 - bW / 2;
      const bY = HUD_H + 8;
      skipBtn = { x: bX, y: bY, w: bW, h: bH };

      ctx.save();
      const pulse = 0.6 + 0.4 * Math.abs(Math.sin(Date.now() / 500));
      ctx.fillStyle = `rgba(245,216,122,${0.12 * pulse})`;
      ctx.strokeStyle = `rgba(245,216,122,${0.7 * pulse})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(bX, bY, bW, bH, 5);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#f5d87a';
      ctx.font = 'bold 13px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, bX + bW / 2, bY + bH / 2);
      ctx.restore();
    }

    this.lastButtons = { skipWave: skipBtn, speed: speedBtn };
    return this.lastButtons;
  }

  hitTest(mx: number, my: number): 'skip' | 'speed' | null {
    const { skipWave, speed } = this.lastButtons;
    if (skipWave && mx >= skipWave.x && mx <= skipWave.x + skipWave.w &&
        my >= skipWave.y && my <= skipWave.y + skipWave.h) return 'skip';
    if (mx >= speed.x && mx <= speed.x + speed.w &&
        my >= speed.y && my <= speed.y + speed.h) return 'speed';
    return null;
  }
}
