import { TileType } from '../../types/enums';
import type { MapData } from '../../types/interfaces';

// Vale das Velas — floresta sagrada com capelas em ruína
// Grid: 20 cols × 14 rows, tileSize = 64px
// Caminho em forma de S horizontal

const P = TileType.Path;
const B = TileType.Buildable;
const D = TileType.Decoration;

const tiles: TileType[][] = [
  //0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ], // row 0
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ], // row 1
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ], // row 2
  [ P, P, P, P, B, B, B, B, B, B, B, B, B, D, D, B, B, B, B, B ], // row 3
  [ B, B, B, P, B, D, B, B, B, B, B, B, B, D, D, B, B, B, B, B ], // row 4
  [ B, B, B, P, P, P, P, P, B, B, B, B, B, B, B, B, B, B, B, B ], // row 5
  [ B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, B, D, D, B, B ], // row 6
  [ B, B, B, B, B, B, B, P, P, P, P, P, B, B, B, B, D, D, B, B ], // row 7
  [ B, B, B, B, B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, B ], // row 8
  [ B, B, B, B, B, D, B, B, B, B, B, P, P, P, P, P, P, P, P, P ], // row 9
  [ B, B, B, B, B, D, B, B, B, B, B, B, B, B, B, B, B, B, B, B ], // row 10
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ], // row 11
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ], // row 12
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ], // row 13
];

// Waypoints em pixel-space (centro das tiles do caminho)
// tileSize = 64, centro = tile * 64 + 32
const TILE = 64;
const C = (t: number) => t * TILE + TILE / 2;

const waypoints = [
  { x: -TILE,   y: C(3)  }, // entrada (fora do ecrã)
  { x: C(3),    y: C(3)  }, // vira para sul
  { x: C(3),    y: C(5)  },
  { x: C(7),    y: C(5)  }, // vira para sul
  { x: C(7),    y: C(7)  },
  { x: C(11),   y: C(7)  }, // vira para sul
  { x: C(11),   y: C(9)  },
  { x: 20*TILE, y: C(9)  }, // saída (fora do ecrã)
];

// Comprimento total pré-calculado (para pathProgress)
function pathLength(wps: { x: number; y: number }[]): number {
  let len = 0;
  for (let i = 1; i < wps.length; i++) {
    const dx = wps[i]!.x - wps[i - 1]!.x;
    const dy = wps[i]!.y - wps[i - 1]!.y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

export const map1: MapData = {
  id: 'map1',
  name: 'Vale das Velas',
  lore: 'A primeira muralha de luz. Capelas antigas marcam o caminho que o Domínio Vorrhan escolheu para avançar.',
  tileSize: TILE,
  cols: 20,
  rows: 14,
  tiles,
  waypoints,
  flyingPath: [{ x: -TILE, y: C(6) }, { x: 20 * TILE + TILE, y: C(6) }],
  totalPathLength: pathLength(waypoints),
  startGold: 150,
  startLives: 20,
  backgroundColour: '#1a2e0f',
  pathColour: '#6b5a3e',
};
