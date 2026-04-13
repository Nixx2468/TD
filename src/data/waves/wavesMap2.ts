import { EnemyType } from '../../types/enums';
import type { WaveConfig } from '../../types/interfaces';

// Planície Cinérea — dificuldade média-alta, delays menores
export const wavesMap2: WaveConfig[] = [
  { waveNumber: 1,  groups: [{ enemyType: EnemyType.Basic, count: 10, interval: 1.0, delay: 0 }], interWaveDelay: 8 },
  { waveNumber: 2,  groups: [{ enemyType: EnemyType.Fast,  count: 6,  interval: 0.7, delay: 0 }, { enemyType: EnemyType.Basic, count: 8, interval: 1.0, delay: 3 }], interWaveDelay: 8 },
  { waveNumber: 3,  groups: [{ enemyType: EnemyType.Tank,  count: 2,  interval: 4.0, delay: 0 }, { enemyType: EnemyType.Fast, count: 8, interval: 0.6, delay: 2 }], interWaveDelay: 10 },
  { waveNumber: 4,  groups: [{ enemyType: EnemyType.Flying, count: 8, interval: 0.9, delay: 0 }, { enemyType: EnemyType.Basic, count: 10, interval: 1.0, delay: 3 }], interWaveDelay: 10 },
  { waveNumber: 5,  groups: [{ enemyType: EnemyType.Boss,  count: 1,  interval: 0,   delay: 0 }, { enemyType: EnemyType.Fast, count: 10, interval: 0.5, delay: 4 }], interWaveDelay: 12 },
  { waveNumber: 6,  groups: [{ enemyType: EnemyType.Tank,  count: 4,  interval: 3.0, delay: 0 }, { enemyType: EnemyType.Flying, count: 8, interval: 0.7, delay: 5 }], interWaveDelay: 10 },
  { waveNumber: 7,  groups: [{ enemyType: EnemyType.Basic, count: 18, interval: 0.7, delay: 0 }, { enemyType: EnemyType.Fast, count: 10, interval: 0.45, delay: 8 }], interWaveDelay: 10 },
  { waveNumber: 8,  groups: [{ enemyType: EnemyType.Boss,  count: 2,  interval: 8.0, delay: 0 }, { enemyType: EnemyType.Tank, count: 3, interval: 2.5, delay: 5 }], interWaveDelay: 12 },
  { waveNumber: 9,  groups: [{ enemyType: EnemyType.Flying, count: 14, interval: 0.5, delay: 0 }, { enemyType: EnemyType.Tank, count: 5, interval: 2.5, delay: 6 }], interWaveDelay: 12 },
  { waveNumber: 10, groups: [{ enemyType: EnemyType.Boss,  count: 3,  interval: 6.0, delay: 0 }, { enemyType: EnemyType.Fast, count: 20, interval: 0.35, delay: 6 }, { enemyType: EnemyType.Flying, count: 12, interval: 0.5, delay: 15 }], interWaveDelay: 0 },
];
