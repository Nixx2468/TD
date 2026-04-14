import type { Tower } from '../entities/Tower';
import { TowerType } from '../types/enums';

export class TowerRenderer {
  drawAll(ctx: CanvasRenderingContext2D, towers: Tower[], selectedTower: Tower | null, time: number): void {
    for (const t of towers) {
      if (t === selectedTower) this.drawRange(ctx, t);
    }
    for (const t of towers) {
      this.drawTower(ctx, t, t === selectedTower, time);
    }
  }

  private drawRange(ctx: CanvasRenderingContext2D, t: Tower): void {
    ctx.save();
    ctx.strokeStyle = 'rgba(245,216,122,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(t.position.x, t.position.y, t.currentLevel.range, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(245,216,122,0.05)';
    ctx.fill();
    ctx.setLineDash([]);
    ctx.restore();
  }

  private drawTower(ctx: CanvasRenderingContext2D, t: Tower, selected: boolean, time: number): void {
    const { x, y } = t.position;
    const s = t.config.size / 2;
    const pulse = Math.sin(time * 2.5 + x * 0.01) * 0.5 + 0.5; // 0–1

    ctx.save();

    // Auréola pulsante (animação)
    const glowR = s + 6 + pulse * 5;
    const glow = ctx.createRadialGradient(x, y, s * 0.5, x, y, glowR);
    glow.addColorStop(0, t.config.accentColour + '33');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, glowR, 0, Math.PI * 2);
    ctx.fill();

    // Brilho se seleccionado
    if (selected) {
      ctx.shadowColor = '#f5d87a';
      ctx.shadowBlur = 20;
    }

    // Base da torre
    ctx.fillStyle = t.config.colour;
    ctx.strokeStyle = selected ? '#f5d87a' : t.config.accentColour;
    ctx.lineWidth = selected ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(x - s, y - s, s * 2, s * 2, 4);
    ctx.fill();
    ctx.stroke();

    // Ícone
    ctx.shadowBlur = 0;
    ctx.fillStyle = t.config.accentColour;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${s}px serif`;
    const icons: Record<TowerType, string> = {
      [TowerType.Arrow]:  '✦',
      [TowerType.Cannon]: '✠',
      [TowerType.Freeze]: '❄',
      [TowerType.Laser]:  '☀',
    };
    ctx.fillText(icons[t.config.type] ?? '?', x, y);

    // Cruz vitoriana animada (rotação lenta)
    ctx.save();
    ctx.translate(x, y - s - 10);
    ctx.rotate(pulse * 0.15);
    ctx.strokeStyle = t.config.accentColour + 'aa';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(0, -4); ctx.lineTo(0, 4);
    ctx.moveTo(-4, 0); ctx.lineTo(4, 0);
    ctx.stroke();
    ctx.restore();

    // Nível
    if (t.level > 0) {
      ctx.fillStyle = '#f5d87a';
      ctx.font = '9px serif';
      ctx.fillText('★'.repeat(t.level), x, y + s + 8);
    }

    // Laser beam
    if (t.beamActive && t.target) {
      ctx.strokeStyle = '#e0a0ff';
      ctx.lineWidth = 2 + pulse;
      ctx.shadowColor = '#e0a0ff';
      ctx.shadowBlur = 10 + pulse * 6;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(t.target.position.x, t.target.position.y);
      ctx.stroke();
    }

    ctx.restore();
  }
}
