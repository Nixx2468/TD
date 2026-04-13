import { TileType } from '../../types/enums';
import type { MapData } from '../../types/interfaces';

// Planície Cinérea — campos de cinzas, U-turn longo
const P = TileType.Path;
const B = TileType.Buildable;
const D = TileType.Decoration;

const tiles: TileType[][] = [
  //0  1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ P, P, P, P, P, P, P, P, P, P, P, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, D, D, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, D, D, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, P, P, P, P, P, P, P, P, P, P, P, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, P, B ],
  [ B, B, B, D, D, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, P, B ],
  [ B, B, B, D, D, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, P, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, P, P, P, P, P, P, P, P, P, P, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, P, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, P, P, P, P, P, P, P, P, P, P, P ],
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
  [ B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B, B ],
];

const TILE = 64;
const C = (t: number) => t * TILE + TILE / 2;

const waypoints = [
  { x: -TILE,      y: C(1) },
  { x: C(10),      y: C(1) },
  { x: C(10),      y: C(4) },
  { x: C(20),      y: C(4) },
  { x: C(20),      y: C(8) },
  { x: C(11),      y: C(8) },
  { x: C(11),      y: C(11) },
  { x: 22*TILE,    y: C(11) },
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

export const map2: MapData = {
  id: 'map2',
  name: 'Planície Cinérea',
  lore: 'Nada cresce aqui. O Carvão das Sombras queimou tudo o que existia. Os Vorrhans marcham em formação aberta.',
  tileSize: TILE,
  cols: 22,
  rows: 14,
  tiles,
  waypoints,
  flyingPath: [{ x: -TILE, y: C(7) }, { x: 22 * TILE + TILE, y: C(7) }],
  totalPathLength: pathLength(waypoints),
  startGold: 175,
  startLives: 18,
  backgroundColour: '#2a2520',
  pathColour: '#4a3f30',
};
