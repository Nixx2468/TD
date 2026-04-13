import { EnemyType } from '../../types/enums';
import type { WaveConfig } from '../../types/interfaces';

// Pináculo Sancta — dificuldade máxima, caminho diagonal
export const wavesMap3: WaveConfig[] = [
  { waveNumber: 1,  groups: [{ enemyType: EnemyType.Fast,  count: 8,  interval: 0.7, delay: 0 }, { enemyType: EnemyType.Basic, count: 6, interval: 1.0, delay: 3 }], interWaveDelay: 8 },
  { waveNumber: 2,  groups: [{ enemyType: EnemyType.Tank,  count: 3,  interval: 3.5, delay: 0 }, { enemyType: EnemyType.Fast, count: 10, interval: 0.5, delay: 4 }], interWaveDelay: 8 },
  { waveNumber: 3,  groups: [{ enemyType: EnemyType.Flying, count: 10, interval: 0.7, delay: 0 }, { enemyType: EnemyType.Tank, count: 3, interval: 3.0, delay: 4 }], interWaveDelay: 8 },
  { waveNumber: 4,  groups: [{ enemyType: EnemyType.Boss,  count: 1,  interval: 0,   delay: 0 }, { enemyType: EnemyType.Fast, count: 12, interval: 0.45, delay: 4 }, { enemyType: EnemyType.Flying, count: 8, interval: 0.6, delay: 8 }], interWaveDelay: 10 },
  { waveNumber: 5,  groups: [{ enemyType: EnemyType.Tank,  count: 6,  interval: 2.5, delay: 0 }, { enemyType: EnemyType.Boss, count: 1, interval: 0, delay: 10 }, { enemyType: EnemyType.Flying, count: 10, interval: 0.5, delay: 12 }], interWaveDelay: 10 },
  { waveNumber: 6,  groups: [{ enemyType: EnemyType.Fast,  count: 20, interval: 0.3, delay: 0 }, { enemyType: EnemyType.Flying, count: 14, interval: 0.4, delay: 8 }], interWaveDelay: 10 },
  { waveNumber: 7,  groups: [{ enemyType: EnemyType.Boss,  count: 2,  interval: 6.0, delay: 0 }, { enemyType: EnemyType.Tank, count: 6, interval: 2.0, delay: 5 }, { enemyType: EnemyType.Fast, count: 15, interval: 0.35, delay: 10 }], interWaveDelay: 12 },
  { waveNumber: 8,  groups: [{ enemyType: EnemyType.Flying, count: 18, interval: 0.4, delay: 0 }, { enemyType: EnemyType.Boss, count: 2, interval: 7.0, delay: 8 }, { enemyType: EnemyType.Tank, count: 5, interval: 2.0, delay: 10 }], interWaveDelay: 12 },
  { waveNumber: 9,  groups: [{ enemyType: EnemyType.Boss,  count: 3,  interval: 5.0, delay: 0 }, { enemyType: EnemyType.Fast, count: 25, interval: 0.28, delay: 8 }, { enemyType: EnemyType.Tank, count: 8, interval: 2.0, delay: 12 }], interWaveDelay: 12 },
  { waveNumber: 10, groups: [{ enemyType: EnemyType.Boss,  count: 5,  interval: 4.0, delay: 0 }, { enemyType: EnemyType.Tank, count: 10, interval: 1.8, delay: 6 }, { enemyType: EnemyType.Flying, count: 20, interval: 0.3, delay: 15 }, { enemyType: EnemyType.Fast, count: 30, interval: 0.25, delay: 20 }], interWaveDelay: 0 },
];
