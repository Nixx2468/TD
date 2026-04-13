import { TowerType, TargetMode } from '../../types/enums';
import type { TowerConfig } from '../../types/interfaces';

export const freezeConfig: TowerConfig = {
  type: TowerType.Freeze,
  loreTitle: 'Câmara de Penitência',
  colour: '#4080a0',
  accentColour: '#a0d0f0',
  size: 40,
  canTargetFlying: false,
  defaultTargetMode: TargetMode.First,
  levels: [
    { damage: 0, range: 130, fireRate: 0.7, projectileSpeed: 200, splashRadius: 0, slowFactor: 0.55, slowDuration: 1.5, cost: 100, sellValue: 50,  label: 'Cristal de Gelo Sagrado' },
    { damage: 0, range: 145, fireRate: 0.9, projectileSpeed: 220, splashRadius: 0, slowFactor: 0.40, slowDuration: 2.0, cost: 90,  sellValue: 110, label: 'Cristal de Gelo Puro' },
    { damage: 0, range: 165, fireRate: 1.2, projectileSpeed: 250, splashRadius: 0, slowFactor: 0.25, slowDuration: 2.8, cost: 150, sellValue: 205, label: 'Núcleo de Nevasca Divina' },
  ],
};
