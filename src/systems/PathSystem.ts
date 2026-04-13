import type { Enemy } from '../entities/Enemy';
import type { FlyingEnemy } from '../entities/enemies/FlyingEnemy';
import type { MapData, Vec2 } from '../types/interfaces';

function dist(a: Vec2, b: Vec2): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export class PathSystem {
  moveEnemy(enemy: Enemy, map: MapData, dt: number): boolean {
    if (enemy.flying) {
      return this.moveFlyingEnemy(enemy as FlyingEnemy, map, dt);
    }
    return this.moveGroundEnemy(enemy, map, dt);
  }

  private moveGroundEnemy(enemy: Enemy, map: MapData, dt: number): boolean {
    const wps = map.waypoints;
    if (enemy.waypointIndex >= wps.length - 1) return true; // saiu

    const target = wps[enemy.waypointIndex + 1]!;
    const speed = enemy.getEffectiveSpeed();
    const dx = target.x - enemy.position.x;
    const dy = target.y - enemy.position.y;
    const d = Math.sqrt(dx * dx + dy * dy);
    const step = speed * dt;

    if (step >= d) {
      enemy.position.x = target.x;
      enemy.position.y = target.y;
      enemy.waypointIndex++;
      if (enemy.waypointIndex >= wps.length - 1) return true;
    } else {
      enemy.position.x += (dx / d) * step;
      enemy.position.y += (dy / d) * step;
    }

    // Actualizar pathProgress
    let traveled = 0;
    for (let i = 0; i < enemy.waypointIndex; i++) {
      traveled += dist(wps[i]!, wps[i + 1]!);
    }
    traveled += dist(wps[enemy.waypointIndex]!, enemy.position);
    enemy.pathProgress = traveled / map.totalPathLength;

    return false;
  }

  private moveFlyingEnemy(enemy: FlyingEnemy, map: MapData, dt: number): boolean {
    const [from, to] = map.flyingPath;
    const speed = enemy.getEffectiveSpeed();
    const totalDist = dist(from, to);
    const step = speed * dt / totalDist;
    enemy.flyProgress = Math.min(1, enemy.flyProgress + step);
    enemy.position.x = from.x + (to.x - from.x) * enemy.flyProgress;
    enemy.position.y = from.y + (to.y - from.y) * enemy.flyProgress;
    enemy.pathProgress = enemy.flyProgress;
    return enemy.flyProgress >= 1;
  }
}
