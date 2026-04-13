import { TowerType, TargetMode } from '../../types/enums';
import type { TowerConfig } from '../../types/interfaces';

export const arrowConfig: TowerConfig = {
  type: TowerType.Arrow,
  loreTitle: 'Flecheiro da Graça',
  colour: '#c8aa60',
  accentColour: '#f5d87a',
  size: 40,
  canTargetFlying: true,
  defaultTargetMode: TargetMode.First,
  levels: [
    { damage: 15, range: 180, fireRate: 1.5, projectileSpeed: 280, splashRadius: 0, slowFactor: 1, slowDuration: 0, cost: 75,  sellValue: 37,  label: 'Arco de Madeira Sagrada' },
    { damage: 25, range: 210, fireRate: 2.0, projectileSpeed: 320, splashRadius: 0, slowFactor: 1, slowDuration: 0, cost: 60,  sellValue: 80,  label: 'Arco de Aço Rúnico' },
    { damage: 40, range: 250, fireRate: 2.8, projectileSpeed: 380, splashRadius: 0, slowFactor: 1, slowDuration: 0, cost: 100, sellValue: 145, label: 'Arco da Águia Áurea' },
  ],
};
