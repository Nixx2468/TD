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

// Waypoints em tile-space (convertidos para pixel-space em GameScene)
const waypoints = [
  { x: -1.0,  y: 2.5  },
  { x: 1.5,   y: 2.5  },
  { x: 1.5,   y: 4.5  },
  { x: 3.5,   y: 4.5  },
  { x: 3.5,   y: 6.5  },
  { x: 5.5,   y: 6.5  },
  { x: 5.5,   y: 8.5  },
  { x: 7.5,   y: 8.5  },
  { x: 7.5,   y: 10.5 },
  { x: 9.5,   y: 10.5 },
  { x: 9.5,   y: 12.5 },
  { x: 20.0,  y: 12.5 },
];

export const map3: MapData = {
  id: 'map3',
  name: 'Pináculo Sancta',
  lore: 'A catedral fortaleza. O último reduto de Co\'ovatina antes do Nexus de Aether. Defendê-la é defender o mundo.',
  tileSize: 64,
  cols: 20,
  rows: 16,
  tiles,
  waypoints,
  flyingPath: [{ x: -1.0, y: 7.5 }, { x: 21.0, y: 7.5 }],
  totalPathLength: 0,
  startGold: 200,
  startLives: 15,
  backgroundColour: '#0e1a2e',
  pathColour: '#3a4a5e',
};
