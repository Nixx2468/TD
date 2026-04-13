import type { Enemy } from '../entities/Enemy';
import type { Tower } from '../entities/Tower';
import type { Projectile } from '../entities/Projectile';

export interface EventMap {
  'enemy:killed':   { enemy: Enemy; reward: number };
  'enemy:leaked':   { enemy: Enemy };
  'enemy:converted': { enemy: Enemy };
  'tower:placed':   { tower: Tower; cost: number };
  'tower:upgraded': { tower: Tower; level: number; cost: number };
  'tower:sold':     { tower: Tower; refund: number };
  'wave:started':   { waveNumber: number };
  'wave:completed': { waveNumber: number };
  'game:over':      { won: boolean; score: number };
  'projectile:hit': { projectile: Projectile; enemy: Enemy };
}
