import type { Tower } from '../entities/Tower';
import { TowerType } from '../types/enums';

export class TowerRenderer {
  drawAll(ctx: CanvasRenderingContext2D, towers: Tower[], selectedTower: Tower | null): void {
    for (const t of towers) {
      if (t === selectedTower) this.drawRange(ctx, t);
    }
    for (const t of towers) {
      this.drawTower(ctx, t, t === selectedTower);
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

  private drawTower(ctx: CanvasRenderingContext2D, t: Tower, selected: boolean): void {
    const { x, y } = t.position;
    const s = t.config.size / 2;
    ctx.save();

    // Brilho se seleccionado
    if (selected) {
      ctx.shadowColor = '#f5d87a';
      ctx.shadowBlur = 16;
    }

    // Base da torre
    ctx.fillStyle = t.config.colour;
    ctx.strokeStyle = selected ? '#f5d87a' : t.config.accentColour;
    ctx.lineWidth = selected ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(x - s, y - s, s * 2, s * 2, 4);
    ctx.fill();
    ctx.stroke();

    // Ícone de tipo
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

    // Cruz decorativa vitoriana no topo
    ctx.strokeStyle = t.config.accentColour + '88';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(x, y - s - 6);
    ctx.lineTo(x, y - s - 14);
    ctx.moveTo(x - 4, y - s - 10);
    ctx.lineTo(x + 4, y - s - 10);
    ctx.stroke();

    // Nível
    if (t.level > 0) {
      ctx.fillStyle = '#f5d87a';
      ctx.font = '9px serif';
      ctx.fillText('★'.repeat(t.level), x, y + s + 8);
    }

    // Laser beam
    if (t.beamActive && t.target) {
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#e0a0ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#e0a0ff';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(t.target.position.x, t.target.position.y);
      ctx.stroke();
    }

    ctx.restore();
  }
}
