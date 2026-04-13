import { Entity } from './Entity';
import type { EnemyConfig, Effect, Vec2 } from '../types/interfaces';
import { EffectType } from '../types/enums';

export abstract class Enemy extends Entity {
  readonly config: EnemyConfig;
  purification = 0;       // 0–100: barra de purificação (substitui "dano")
  waypointIndex = 0;
  pathProgress = 0;       // 0.0–1.0 para ordenar targeting
  effects: Effect[] = [];
  converted = false;
  flying: boolean;

  constructor(config: EnemyConfig, start: Vec2) {
    super(start.x, start.y);
    this.config = config;
    this.flying = config.flying;
  }

  // Recebe purificação — retorna true se convertido
  purify(amount: number): boolean {
    const effective = Math.max(0, amount - this.config.armour);
    this.purification = Math.min(100, this.purification + effective);
    if (this.purification >= 100 && !this.converted) {
      this.converted = true;
      return true;
    }
    return false;
  }

  applyEffect(effect: Effect): void {
    const existing = this.effects.find(e => e.type === effect.type);
    if (existing) {
      // Apenas substitui se o novo for mais forte ou mais longo
      if (effect.factor < existing.factor) {
        existing.factor = effect.factor;
        existing.duration = effect.duration;
      } else if (effect.factor === existing.factor && effect.duration > existing.duration) {
        existing.duration = effect.duration;
      }
    } else {
      this.effects.push({ ...effect });
    }
  }

  getEffectiveSpeed(): number {
    const slowEffect = this.effects
      .filter(e => e.type === EffectType.Slow)
      .reduce((min, e) => Math.min(min, e.factor), 1.0);
    return this.config.speed * slowEffect;
  }

  update(_dt: number): void {} // movimento tratado pelo PathSystem
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
