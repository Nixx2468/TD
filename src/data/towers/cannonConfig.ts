import { TowerType, TargetMode } from '../../types/enums';
import type { TowerConfig } from '../../types/interfaces';

export const cannonConfig: TowerConfig = {
  type: TowerType.Cannon,
  loreTitle: 'Ostensório de Área',
  colour: '#8a7040',
  accentColour: '#f5d87a',
  size: 44,
  canTargetFlying: false,
  defaultTargetMode: TargetMode.Closest,
  levels: [
    { damage: 40,  range: 120, fireRate: 0.5,  projectileSpeed: 180, splashRadius: 40, slowFactor: 1, slowDuration: 0, cost: 125, sellValue: 62,  label: 'Ostensório de Ferro' },
    { damage: 65,  range: 135, fireRate: 0.6,  projectileSpeed: 200, splashRadius: 55, slowFactor: 1, slowDuration: 0, cost: 100, sellValue: 130, label: 'Ostensório de Aço' },
    { damage: 100, range: 155, fireRate: 0.75, projectileSpeed: 220, splashRadius: 75, slowFactor: 1, slowDuration: 0, cost: 175, sellValue: 230, label: 'Ostensório do Dragão' },
  ],
};
