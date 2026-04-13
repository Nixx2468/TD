import { Tower } from '../Tower';
import { laserConfig } from '../../data/towers/laserConfig';
import type { Enemy } from '../Enemy';
import type { ProjectileManager } from '../../systems/ProjectileManager';
import type { EventBus } from '../../core/EventBus';

export class LaserTower extends Tower {
  private eventBus: EventBus;

  constructor(tileX: number, tileY: number, tileSize: number, eventBus: EventBus) {
    super(laserConfig, tileX, tileY, tileSize);
    this.eventBus = eventBus;
  }

  fire(enemies: Enemy[], _pm: ProjectileManager): void {
    const lc = this.currentLevel;
    const rangeSq = lc.range * lc.range;

    // Todos os inimigos em linha dentro do alcance
    const inRange = enemies.filter(e => {
      if (!e.active || e.converted) return false;
      if (e.flying && !this.config.canTargetFlying) return false;
      const dx = e.position.x - this.position.x;
      const dy = e.position.y - this.position.y;
      return dx * dx + dy * dy <= rangeSq;
    });

    if (inRange.length === 0) return;

    for (const e of inRange) {
      const converted = e.purify(lc.damage);
      if (converted) {
        e.active = false;
        this.eventBus.emit('enemy:converted', { enemy: e });
      }
    }

    this.target = inRange[0] ?? null;
    this.beamActive = true;
    this.beamTimer = 0.12;
    this.cooldown = 1 / lc.fireRate;
  }
}
