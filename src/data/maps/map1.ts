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

// Waypoints em tile-space (col/row, centros = tile + 0.5)
// Convertidos para pixel-space em GameScene usando o tileSize calculado dinamicamente
const waypoints = [
  { x: -1.0,  y: 3.5 }, // entrada (fora do ecrã)
  { x: 3.5,   y: 3.5 }, // vira para sul
  { x: 3.5,   y: 5.5 },
  { x: 7.5,   y: 5.5 }, // vira para sul
  { x: 7.5,   y: 7.5 },
  { x: 11.5,  y: 7.5 }, // vira para sul
  { x: 11.5,  y: 9.5 },
  { x: 20.0,  y: 9.5 }, // saída (fora do ecrã)
];

export const map1: MapData = {
  id: 'map1',
  name: 'Vale das Velas',
  lore: 'A primeira muralha de luz. Capelas antigas marcam o caminho que o Domínio Vorrhan escolheu para avançar.',
  tileSize: 64,
  cols: 20,
  rows: 14,
  tiles,
  waypoints,
  flyingPath: [{ x: -1.0, y: 6.5 }, { x: 21.0, y: 6.5 }],
  totalPathLength: 0,
  startGold: 150,
  startLives: 20,
  backgroundColour: '#1a2e0f',
  pathColour: '#6b5a3e',
};
