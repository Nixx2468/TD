import { TowerType, TargetMode } from '../../types/enums';
import type { TowerConfig } from '../../types/interfaces';

export const laserConfig: TowerConfig = {
  type: TowerType.Laser,
  loreTitle: 'Raio do Verbo',
  colour: '#a060e0',
  accentColour: '#e0a0ff',
  size: 42,
  canTargetFlying: true,
  defaultTargetMode: TargetMode.First,
  levels: [
    { damage: 25, range: 160, fireRate: 1.0, projectileSpeed: 0, splashRadius: 0, slowFactor: 1, slowDuration: 0, cost: 200, sellValue: 100, label: 'Raio do Verbo Mk.I' },
    { damage: 45, range: 185, fireRate: 1.3, projectileSpeed: 0, splashRadius: 0, slowFactor: 1, slowDuration: 0, cost: 175, sellValue: 200, label: 'Raio do Verbo Mk.II' },
    { damage: 70, range: 220, fireRate: 1.8, projectileSpeed: 0, splashRadius: 0, slowFactor: 1, slowDuration: 0, cost: 250, sellValue: 350, label: 'Raio do Verbo Mk.III' },
  ],
};
