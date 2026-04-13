import { TileType } from '../../types/enums';
import type { MapData } from '../../types/interfaces';

// Pináculo Sancta — catedral fortaleza, segmentos diagonais simulados em L
const P = TileType.Path;
const B = TileType.Buildable;
const D = TileType.Decoration;

const tiles: TileType[][] = [
  //0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ P, P, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, P, B, B, B, B, B, B, B, B, B, B, B, D, D, B, B, B, B, B ],
  [ B, P, P, P, B, B, B, B, B, B, B, B, B, D, D, B, B, B, B, B ],
  [ B, B, B, P, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, P, P, P, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, P, B, B, B, B, B, B, B, B, B, B, D, D, B, B ],
  [ B, B, B, B, B, P, P, P, B, B, B, B, B, B, B, B, D, D, B, B ],
  [ B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, P, P, P, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, P, P, P, P, P, P, P, P, P, P, P ],
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
];

const TILE = 64;
const C = (t: number) => t * TILE + TILE / 2;

const waypoints = [
  { x: -TILE,    y: C(2) },
  { x: C(1),     y: C(2) },
  { x: C(1),     y: C(4) },
  { x: C(3),     y: C(4) },
  { x: C(3),     y: C(6) },
  { x: C(5),     y: C(6) },
  { x: C(5),     y: C(8) },
  { x: C(7),     y: C(8) },
  { x: C(7),     y: C(10) },
  { x: C(9),     y: C(10) },
  { x: C(9),     y: C(12) },
  { x: 20*TILE,  y: C(12) },
];

function pathLength(wps: { x: number; y: number }[]): number {
  let len = 0;
  for (let i = 1; i < wps.length; i++) {
    const dx = wps[i]!.x - wps[i - 1]!.x;
    const dy = wps[i]!.y - wps[i - 1]!.y;
    len += Math.sqrt(dx * dx + dy * dy);
  }
  return len;
}

export const map3: MapData = {
  id: 'map3',
  name: 'Pináculo Sancta',
  lore: 'A catedral fortaleza. O último reduto de Co\'ovatina antes do Nexus de Aether. Defendê-la é defender o mundo.',
  tileSize: TILE,
  cols: 20,
  rows: 16,
  tiles,
  waypoints,
  flyingPath: [{ x: -TILE, y: C(7) }, { x: 20 * TILE + TILE, y: C(7) }],
  totalPathLength: pathLength(waypoints),
  startGold: 200,
  startLives: 15,
  backgroundColour: '#0e1a2e',
  pathColour: '#3a4a5e',
};
