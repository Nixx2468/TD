import type { Tower } from '../entities/Tower';
import type { EconomyManager } from '../systems/EconomyManager';

export class TowerInfoPanel {
  private panelW = 240;
  private panelH = 180;

  draw(ctx: CanvasRenderingContext2D, tower: Tower, economy: EconomyManager, W: number): void {
    const x = W - this.panelW - 12;
    const y = 60;

    ctx.save();
    ctx.fillStyle = 'rgba(6,8,16,0.94)';
    ctx.strokeStyle = '#6a5a30';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, y, this.panelW, this.panelH, 6);
    ctx.fill();
    ctx.stroke();

    const lc = tower.currentLevel;
    const cx = x + this.panelW / 2;

    ctx.textAlign = 'center';
    ctx.fillStyle = '#f5d87a';
    ctx.font = 'bold 13px serif';
    ctx.fillText(tower.config.loreTitle, cx, y + 20);

    ctx.fillStyle = '#9a8a5a';
    ctx.font = '11px serif';
    ctx.fillText(lc.label, cx, y + 36);

    // Separador
    ctx.strokeStyle = '#3a3010';
    ctx.beginPath();
    ctx.moveTo(x + 12, y + 44);
    ctx.lineTo(x + this.panelW - 12, y + 44);
    ctx.stroke();

    // Stats
    const stats = [
      ['Purificação', lc.damage === 0 ? '—' : String(lc.damage)],
      ['Alcance', `${lc.range}px`],
      ['Cadência', `${lc.fireRate.toFixed(1)}/s`],
      lc.slowFactor < 1 ? ['Lentidão', `${Math.round((1 - lc.slowFactor) * 100)}%`] : null,
      lc.splashRadius > 0 ? ['Área', `${lc.splashRadius}px`] : null,
    ].filter(Boolean) as [string, string][];

    let sy = y + 56;
    ctx.textAlign = 'left';
    for (const [label, val] of stats) {
      ctx.fillStyle = '#7a6a40';
      ctx.font = '11px serif';
      ctx.fillText(label, x + 14, sy);
      ctx.fillStyle = '#c8aa60';
      ctx.textAlign = 'right';
      ctx.fillText(val, x + this.panelW - 14, sy);
      ctx.textAlign = 'left';
      sy += 16;
    }

    // Nível
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f5d87a';
    ctx.font = '12px serif';
    ctx.fillText('★'.repeat(tower.level + 1) + '☆'.repeat(2 - tower.level), cx, y + this.panelH - 56);

    // Botão upgrade
    const canUpgrade = tower.canUpgrade();
    const upCost = tower.upgradeCost();
    const canAffordUp = economy.gold >= upCost;
    ctx.fillStyle = canUpgrade && canAffordUp ? 'rgba(245,216,122,0.18)' : 'rgba(50,50,50,0.5)';
    ctx.strokeStyle = canUpgrade && canAffordUp ? '#f5d87a' : '#3a3a3a';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 10, y + this.panelH - 44, 100, 28, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = canUpgrade && canAffordUp ? '#f5d87a' : '#555';
    ctx.font = '12px serif';
    ctx.fillText(canUpgrade ? `Nível ${tower.level + 2} ✦${upCost}` : 'Máx.', x + 60, y + this.panelH - 24);

    // Botão vender
    ctx.fillStyle = 'rgba(80,30,30,0.7)';
    ctx.strokeStyle = '#7a3030';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x + 120, y + this.panelH - 44, 108, 28, 4);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#e07070';
    ctx.textAlign = 'center';
    ctx.fillText(`Vender ✦${tower.sellValue()}`, x + 174, y + this.panelH - 24);

    ctx.restore();
  }

  upgradeButtonHit(mx: number, my: number, tower: Tower, W: number): boolean {
    const x = W - this.panelW - 12;
    const y = 60;
    return mx >= x + 10 && mx <= x + 110 && my >= y + this.panelH - 44 && my <= y + this.panelH - 16;
  }

  sellButtonHit(mx: number, my: number, tower: Tower, W: number): boolean {
    const x = W - this.panelW - 12;
    const y = 60;
    return mx >= x + 120 && mx <= x + 228 && my >= y + this.panelH - 44 && my <= y + this.panelH - 16;
  }
}
