import { TowerType } from '../types/enums';
import type { EconomyManager } from '../systems/EconomyManager';

export interface TowerButton {
  type: TowerType;
  x: number; y: number; w: number; h: number;
  label: string;
  cost: number;
  colour: string;
  icon: string;
}

const PANEL_H = 100;
const BTN_W = 140;
const BTN_H = 76;
const GAP = 14;

export class TowerPanel {
  private buttons: TowerButton[] = [];
  readonly panelY: number;

  constructor(W: number, H: number) {
    this.panelY = H - PANEL_H;
    const totalW = 4 * BTN_W + 3 * GAP;
    const startX = (W - totalW) / 2;

    const defs = [
      { type: TowerType.Arrow,  label: 'Flecheiro',   cost: 75,  colour: '#c8aa60', icon: '✦' },
      { type: TowerType.Cannon, label: 'Ostensório',  cost: 125, colour: '#8a7040', icon: '✠' },
      { type: TowerType.Freeze, label: 'Câmara',      cost: 100, colour: '#4080a0', icon: '❄' },
      { type: TowerType.Laser,  label: 'Raio do Verbo', cost: 200, colour: '#a060e0', icon: '☀' },
    ];

    this.buttons = defs.map((d, i) => ({
      ...d,
      x: startX + i * (BTN_W + GAP),
      y: this.panelY + 12,
      w: BTN_W,
      h: BTN_H,
    }));
  }

  buttonAt(mx: number, my: number): TowerButton | null {
    return this.buttons.find(b => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) ?? null;
  }

  draw(ctx: CanvasRenderingContext2D, economy: EconomyManager, selectedType: TowerType | null, W: number, H: number): void {
    // Fundo do painel
    ctx.fillStyle = 'rgba(6,8,16,0.95)';
    ctx.fillRect(0, this.panelY, W, PANEL_H);
    ctx.strokeStyle = '#3a3010';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, this.panelY);
    ctx.lineTo(W, this.panelY);
    ctx.stroke();

    for (const b of this.buttons) {
      const canAfford = economy.gold >= b.cost;
      const sel = selectedType === b.type;

      ctx.save();
      ctx.fillStyle = sel ? 'rgba(245,216,122,0.18)' : canAfford ? 'rgba(245,216,122,0.06)' : 'rgba(50,50,50,0.5)';
      ctx.strokeStyle = sel ? '#f5d87a' : canAfford ? '#6a5a30' : '#3a3a3a';
      ctx.lineWidth = sel ? 2 : 1;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.w, b.h, 5);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = canAfford ? b.colour : '#555';
      ctx.font = `20px serif`;
      ctx.fillText(b.icon, b.x + b.w / 2, b.y + 24);

      ctx.fillStyle = canAfford ? '#c8aa60' : '#555';
      ctx.font = '12px serif';
      ctx.fillText(b.label, b.x + b.w / 2, b.y + 44);

      ctx.fillStyle = canAfford ? '#f5d87a' : '#555';
      ctx.font = 'bold 13px serif';
      ctx.fillText(`✦ ${b.cost}`, b.x + b.w / 2, b.y + 60);

      ctx.restore();
    }

    // Dica de tecla ESC
    ctx.save();
    ctx.textAlign = 'right';
    ctx.fillStyle = '#3a3020';
    ctx.font = '11px serif';
    ctx.fillText('[ESC] cancelar', W - 12, H - 6);
    ctx.restore();
  }
}
