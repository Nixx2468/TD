import { EnemyType } from '../../types/enums';
import type { WaveConfig } from '../../types/interfaces';

export const wavesMap1: WaveConfig[] = [
  { waveNumber: 1,  groups: [{ enemyType: EnemyType.Basic, count: 8,  interval: 1.2, delay: 0 }], interWaveDelay: 10 },
  { waveNumber: 2,  groups: [{ enemyType: EnemyType.Basic, count: 10, interval: 1.0, delay: 0 }, { enemyType: EnemyType.Fast, count: 3, interval: 0.8, delay: 4 }], interWaveDelay: 10 },
  { waveNumber: 3,  groups: [{ enemyType: EnemyType.Fast,  count: 8,  interval: 0.7, delay: 0 }, { enemyType: EnemyType.Basic, count: 6, interval: 1.2, delay: 2 }], interWaveDelay: 10 },
  { waveNumber: 4,  groups: [{ enemyType: EnemyType.Tank,  count: 2,  interval: 4.0, delay: 0 }, { enemyType: EnemyType.Basic, count: 8, interval: 1.0, delay: 0 }], interWaveDelay: 12 },
  { waveNumber: 5,  groups: [{ enemyType: EnemyType.Flying, count: 6, interval: 1.0, delay: 0 }, { enemyType: EnemyType.Basic, count: 6, interval: 1.2, delay: 3 }], interWaveDelay: 12 },
  { waveNumber: 6,  groups: [{ enemyType: EnemyType.Basic, count: 12, interval: 0.9, delay: 0 }, { enemyType: EnemyType.Fast, count: 6, interval: 0.6, delay: 4 }], interWaveDelay: 10 },
  { waveNumber: 7,  groups: [{ enemyType: EnemyType.Tank,  count: 3,  interval: 3.5, delay: 0 }, { enemyType: EnemyType.Fast, count: 8, interval: 0.6, delay: 2 }], interWaveDelay: 12 },
  { waveNumber: 8,  groups: [{ enemyType: EnemyType.Flying, count: 8, interval: 0.8, delay: 0 }, { enemyType: EnemyType.Tank, count: 2, interval: 4.0, delay: 3 }], interWaveDelay: 12 },
  { waveNumber: 9,  groups: [{ enemyType: EnemyType.Basic, count: 15, interval: 0.8, delay: 0 }, { enemyType: EnemyType.Fast, count: 8, interval: 0.5, delay: 5 }, { enemyType: EnemyType.Flying, count: 4, interval: 1.2, delay: 8 }], interWaveDelay: 14 },
  { waveNumber: 10, groups: [{ enemyType: EnemyType.Boss,  count: 1,  interval: 0,   delay: 0 }, { enemyType: EnemyType.Basic, count: 8, interval: 1.2, delay: 3 }], interWaveDelay: 15 },
  { waveNumber: 11, groups: [{ enemyType: EnemyType.Tank,  count: 4,  interval: 3.0, delay: 0 }, { enemyType: EnemyType.Fast, count: 10, interval: 0.5, delay: 4 }], interWaveDelay: 12 },
  { waveNumber: 12, groups: [{ enemyType: EnemyType.Flying, count: 12, interval: 0.6, delay: 0 }, { enemyType: EnemyType.Basic, count: 10, interval: 0.9, delay: 4 }], interWaveDelay: 12 },
  { waveNumber: 13, groups: [{ enemyType: EnemyType.Tank,  count: 5,  interval: 2.8, delay: 0 }, { enemyType: EnemyType.Flying, count: 8, interval: 0.7, delay: 5 }], interWaveDelay: 12 },
  { waveNumber: 14, groups: [{ enemyType: EnemyType.Fast,  count: 15, interval: 0.4, delay: 0 }, { enemyType: EnemyType.Basic, count: 10, interval: 1.0, delay: 6 }], interWaveDelay: 12 },
  { waveNumber: 15, groups: [{ enemyType: EnemyType.Boss,  count: 1,  interval: 0,   delay: 0 }, { enemyType: EnemyType.Tank, count: 3, interval: 3.0, delay: 5 }, { enemyType: EnemyType.Fast, count: 8, interval: 0.6, delay: 8 }], interWaveDelay: 16 },
  { waveNumber: 16, groups: [{ enemyType: EnemyType.Flying, count: 14, interval: 0.5, delay: 0 }, { enemyType: EnemyType.Tank, count: 4, interval: 2.5, delay: 5 }], interWaveDelay: 12 },
  { waveNumber: 17, groups: [{ enemyType: EnemyType.Basic, count: 20, interval: 0.6, delay: 0 }, { enemyType: EnemyType.Fast, count: 12, interval: 0.4, delay: 8 }, { enemyType: EnemyType.Flying, count: 8, interval: 0.7, delay: 12 }], interWaveDelay: 14 },
  { waveNumber: 18, groups: [{ enemyType: EnemyType.Tank,  count: 6,  interval: 2.5, delay: 0 }, { enemyType: EnemyType.Boss, count: 1, interval: 0, delay: 10 }], interWaveDelay: 14 },
  { waveNumber: 19, groups: [{ enemyType: EnemyType.Fast,  count: 20, interval: 0.35, delay: 0 }, { enemyType: EnemyType.Flying, count: 12, interval: 0.5, delay: 6 }, { enemyType: EnemyType.Tank, count: 5, interval: 2.5, delay: 12 }], interWaveDelay: 14 },
  { waveNumber: 20, groups: [{ enemyType: EnemyType.Boss,  count: 3,  interval: 8.0, delay: 0 }, { enemyType: EnemyType.Tank, count: 6, interval: 2.0, delay: 4 }, { enemyType: EnemyType.Fast, count: 15, interval: 0.4, delay: 8 }, { enemyType: EnemyType.Flying, count: 10, interval: 0.5, delay: 15 }], interWaveDelay: 0 },
];
