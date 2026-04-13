import type { Enemy } from '../entities/Enemy';

export class EffectSystem {
  update(dt: number, enemies: Enemy[]): void {
    for (const e of enemies) {
      if (!e.active) continue;
      for (let i = e.effects.length - 1; i >= 0; i--) {
        const effect = e.effects[i]!;
        effect.duration -= dt;
        if (effect.duration <= 0) {
          e.effects.splice(i, 1);
        }
      }
    }
  }
}
