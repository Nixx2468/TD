import { Enemy } from '../Enemy';
import type { Vec2 } from '../../types/interfaces';
import { enemyConfigs } from '../../data/enemies/enemyConfigs';
import { EnemyType } from '../../types/enums';

export class TankEnemy extends Enemy {
  constructor(start: Vec2) {
    super(enemyConfigs[EnemyType.Tank]!, start);
  }

  draw(_ctx: CanvasRenderingContext2D): void {}
}
