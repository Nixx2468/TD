import { Enemy } from '../Enemy';
import type { Vec2 } from '../../types/interfaces';
import { enemyConfigs } from '../../data/enemies/enemyConfigs';
import { EnemyType } from '../../types/enums';

export class FastEnemy extends Enemy {
  constructor(start: Vec2) {
    super(enemyConfigs[EnemyType.Fast]!, start);
  }

  draw(_ctx: CanvasRenderingContext2D): void {}
}
