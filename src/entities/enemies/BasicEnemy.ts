import { Enemy } from '../Enemy';
import type { Vec2 } from '../../types/interfaces';
import { enemyConfigs } from '../../data/enemies/enemyConfigs';
import { EnemyType } from '../../types/enums';

export class BasicEnemy extends Enemy {
  constructor(start: Vec2) {
    super(enemyConfigs[EnemyType.Basic]!, start);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Desenhado pelo EnemyRenderer
  }
}
