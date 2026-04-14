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

// Waypoints em tile-space (convertidos para pixel-space em GameScene)
const waypoints = [
  { x: -1.0,  y: 1.5  },
  { x: 10.5,  y: 1.5  },
  { x: 10.5,  y: 4.5  },
  { x: 20.5,  y: 4.5  },
  { x: 20.5,  y: 8.5  },
  { x: 11.5,  y: 8.5  },
  { x: 11.5,  y: 11.5 },
  { x: 22.0,  y: 11.5 },
];

export const map2: MapData = {
  id: 'map2',
  name: 'Planície Cinérea',
  lore: 'Nada cresce aqui. O Carvão das Sombras queimou tudo o que existia. Os Vorrhans marcham em formação aberta.',
  tileSize: 64,
  cols: 22,
  rows: 14,
  tiles,
  waypoints,
  flyingPath: [{ x: -1.0, y: 7.5 }, { x: 23.0, y: 7.5 }],
  totalPathLength: 0,
  startGold: 175,
  startLives: 18,
  backgroundColour: '#2a2520',
  pathColour: '#4a3f30',
};
