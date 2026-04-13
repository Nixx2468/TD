import { Enemy } from '../Enemy';
import type { Vec2 } from '../../types/interfaces';
import { enemyConfigs } from '../../data/enemies/enemyConfigs';
import { EnemyType } from '../../types/enums';

export class FlyingEnemy extends Enemy {
  flyProgress = 0; // 0.0–1.0 ao longo da linha reta

  constructor(start: Vec2) {
    super(enemyConfigs[EnemyType.Flying]!, start);
  }

  draw(_ctx: CanvasRenderingContext2D): void {}
}
