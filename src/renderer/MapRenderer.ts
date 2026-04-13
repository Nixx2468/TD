import type { MapData } from '../types/interfaces';
import { TileType } from '../types/enums';

export class MapRenderer {
  draw(ctx: CanvasRenderingContext2D, map: MapData): void {
    const { tiles, tileSize, cols, rows, backgroundColour, pathColour } = map;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const tile = tiles[row]?.[col] ?? TileType.Buildable;
        const x = col * tileSize;
        const y = row * tileSize;

        switch (tile) {
          case TileType.Path:
            ctx.fillStyle = pathColour;
            ctx.fillRect(x, y, tileSize, tileSize);
            // Textura leve
            ctx.fillStyle = 'rgba(0,0,0,0.08)';
            ctx.fillRect(x + 2, y + 2, tileSize - 4, tileSize - 4);
            break;

          case TileType.Decoration:
            ctx.fillStyle = backgroundColour;
            ctx.fillRect(x, y, tileSize, tileSize);
            // Pedra decorativa
            ctx.fillStyle = 'rgba(245,216,122,0.06)';
            ctx.fillRect(x + 8, y + 8, tileSize - 16, tileSize - 16);
            ctx.strokeStyle = 'rgba(245,216,122,0.15)';
            ctx.lineWidth = 1;
            ctx.strokeRect(x + 8, y + 8, tileSize - 16, tileSize - 16);
            // Cruz vitoriana
            ctx.strokeStyle = 'rgba(245,216,122,0.2)';
            ctx.beginPath();
            ctx.moveTo(x + tileSize / 2, y + 12);
            ctx.lineTo(x + tileSize / 2, y + tileSize - 12);
            ctx.moveTo(x + 14, y + tileSize / 2 - 6);
            ctx.lineTo(x + tileSize - 14, y + tileSize / 2 - 6);
            ctx.stroke();
            break;

          default: // Buildable / Blocked
            ctx.fillStyle = backgroundColour;
            ctx.fillRect(x, y, tileSize, tileSize);
            // Grade subtil
            ctx.strokeStyle = 'rgba(255,255,255,0.03)';
            ctx.lineWidth = 0.5;
            ctx.strokeRect(x, y, tileSize, tileSize);
        }
      }
    }
  }

  drawBuildableHighlight(
    ctx: CanvasRenderingContext2D,
    map: MapData,
    tileX: number,
    tileY: number,
    canPlace: boolean
  ): void {
    const x = tileX * map.tileSize;
    const y = tileY * map.tileSize;
    ctx.fillStyle = canPlace ? 'rgba(245,216,122,0.18)' : 'rgba(200,50,50,0.22)';
    ctx.fillRect(x, y, map.tileSize, map.tileSize);
    ctx.strokeStyle = canPlace ? 'rgba(245,216,122,0.6)' : 'rgba(200,50,50,0.6)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, map.tileSize, map.tileSize);
  }
}
