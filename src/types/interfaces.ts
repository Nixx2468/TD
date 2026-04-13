import { TileType, TowerType, EnemyType, EffectType, TargetMode } from './enums';

export interface Vec2 {
  x: number;
  y: number;
}

export interface MapData {
  id: string;
  name: string;
  lore: string;
  tileSize: number;
  cols: number;
  rows: number;
  tiles: TileType[][];
  waypoints: Vec2[];
  flyingPath: [Vec2, Vec2];
  totalPathLength: number;
  startGold: number;
  startLives: number;
  backgroundColour: string;
  pathColour: string;
}

export interface TowerLevelConfig {
  damage: number;
  range: number;
  fireRate: number;
  projectileSpeed: number;
  splashRadius: number;
  slowFactor: number;
  slowDuration: number;
  cost: number;
  sellValue: number;
  label: string;
}

export interface TowerConfig {
  type: TowerType;
  levels: [TowerLevelConfig, TowerLevelConfig, TowerLevelConfig];
  defaultTargetMode: TargetMode;
  colour: string;
  accentColour: string;
  size: number;
  canTargetFlying: boolean;
  loreTitle: string;
}

export interface SpawnOnDeathConfig {
  type: EnemyType;
  count: number;
}

export interface EnemyConfig {
  type: EnemyType;
  hp: number;
  speed: number;
  reward: number;
  scoreValue: number;
  flying: boolean;
  armour: number;
  colour: string;
  size: number;
  spawnOnDeath?: SpawnOnDeathConfig;
  loreTitle: string;
}

export interface SpawnGroup {
  enemyType: EnemyType;
  count: number;
  interval: number;
  delay: number;
}

export interface WaveConfig {
  waveNumber: number;
  groups: SpawnGroup[];
  interWaveDelay: number;
}

export interface Effect {
  type: EffectType;
  factor: number;
  duration: number;
}
