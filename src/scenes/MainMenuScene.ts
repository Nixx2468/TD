import { Scene } from '../core/Scene';
import type { Game } from '../core/Game';
import { map1 } from '../data/maps/map1';
import { map2 } from '../data/maps/map2';
import { map3 } from '../data/maps/map3';
import type { MapData } from '../types/interfaces';

const MAPS = [map1, map2, map3];

interface MapButton {
  map: MapData;
  x: number;
  y: number;
  w: number;
  h: number;
}

export class MainMenuScene extends Scene {
  private buttons: MapButton[] = [];
  private hoveredIndex = -1;

  constructor(game: Game) {
    super(game);
  }

  onEnter(): void {
    const W = this.game.W;
    const btnW = Math.min(340, Math.floor((W - 80) / MAPS.length - 20));
    const btnH = 180;
    const gap = 40;
    const totalW = MAPS.length * btnW + (MAPS.length - 1) * gap;
    const startX = (W - totalW) / 2;
    const y = Math.round(this.game.H * 0.58);

    this.buttons = MAPS.map((map, i) => ({
      map,
      x: startX + i * (btnW + gap),
      y,
      w: btnW,
      h: btnH,
    }));

    this.game.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onExit(): void {
    this.game.canvas.removeEventListener('mousemove', this.onMouseMove.bind(this));
  }

  private onMouseMove(e: MouseEvent): void {
    const rect = this.game.canvas.getBoundingClientRect();
    const scaleX = this.game.canvas.width / rect.width;
    const scaleY = this.game.canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;
    this.hoveredIndex = this.buttons.findIndex(
      b => mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h
    );
  }

  update(_dt: number): void {
    for (const click of this.game.input.flush()) {
      const idx = this.buttons.findIndex(
        b => click.x >= b.x && click.x <= b.x + b.w && click.y >= b.y && click.y <= b.y + b.h
      );
      if (idx >= 0) {
        this.game.switchScene('game', { mapId: MAPS[idx]!.id });
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const W = this.game.W;
    const H = this.game.H;

    // Fundo
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#060810');
    bg.addColorStop(1, '#0e1628');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Auréola central
    const glow = ctx.createRadialGradient(W / 2, 320, 40, W / 2, 320, 340);
    glow.addColorStop(0, 'rgba(245, 216, 122, 0.15)');
    glow.addColorStop(1, 'rgba(245, 216, 122, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // Título
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f5d87a';
    const titleY = Math.round(H * 0.19);
    ctx.font = `bold ${Math.round(H * 0.075)}px serif`;
    ctx.shadowColor = '#f5d87a';
    ctx.shadowBlur = 30;
    ctx.fillText('O MUNDO DE LEIRHAM', W / 2, titleY);
    ctx.shadowBlur = 0;

    ctx.font = `${Math.round(H * 0.029)}px serif`;
    ctx.fillStyle = '#c8aa60';
    ctx.fillText('Torre Defense — Co\'ovatina contra o Domínio Vorrhan', W / 2, titleY + Math.round(H * 0.063));

    // Cruz decorativa
    const crossCY = Math.round(H * 0.42);
    ctx.strokeStyle = '#f5d87a44';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2, crossCY - 110); ctx.lineTo(W / 2, crossCY + 110);
    ctx.moveTo(W / 2 - 110, crossCY); ctx.lineTo(W / 2 + 110, crossCY);
    ctx.stroke();

    ctx.font = `${Math.round(H * 0.023)}px serif`;
    ctx.fillStyle = '#9a8a5a';
    ctx.fillText('— Escolhe o campo de batalha —', W / 2, Math.round(H * 0.54));
    ctx.restore();

    // Botões de mapa
    for (let i = 0; i < this.buttons.length; i++) {
      const b = this.buttons[i]!;
      const hovered = i === this.hoveredIndex;

      ctx.save();
      ctx.strokeStyle = hovered ? '#f5d87a' : '#6a5a30';
      ctx.lineWidth = hovered ? 2 : 1;
      ctx.fillStyle = hovered ? 'rgba(245,216,122,0.12)' : 'rgba(245,216,122,0.05)';
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.w, b.h, 6);
      ctx.fill();
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.fillStyle = hovered ? '#f5d87a' : '#c8aa60';
      ctx.font = 'bold 20px serif';
      ctx.fillText(b.map.name, b.x + b.w / 2, b.y + 36);

      ctx.fillStyle = '#7a6a40';
      ctx.font = '13px serif';

      // Wrap texto lore
      const words = b.map.lore.split(' ');
      let line = '';
      let lineY = b.y + 68;
      for (const word of words) {
        const test = line ? line + ' ' + word : word;
        if (ctx.measureText(test).width > b.w - 24) {
          ctx.fillText(line, b.x + b.w / 2, lineY);
          line = word;
          lineY += 18;
        } else {
          line = test;
        }
      }
      if (line) ctx.fillText(line, b.x + b.w / 2, lineY);

      // Vidas / ouro
      ctx.fillStyle = '#5a8a3a';
      ctx.font = '13px serif';
      ctx.fillText(`♥ ${b.map.startLives} vidas   ✦ ${b.map.startGold} ouro`, b.x + b.w / 2, b.y + b.h - 14);

      ctx.restore();
    }

    // Rodapé
    ctx.save();
    ctx.textAlign = 'center';
    ctx.fillStyle = '#3a3020';
    ctx.font = '12px serif';
    ctx.fillText('Co\'ovatina não mata. Co\'ovatina purifica.', W / 2, H - 24);
    ctx.restore();
  }
}
