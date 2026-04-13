export enum TowerType {
  Cannon,  // Ostensório de Área
  Arrow,   // Flecheiro da Graça
  Freeze,  // Câmara de Penitência
  Laser,   // Raio do Verbo
}

export enum EnemyType {
  Basic,   // Soldado Vorrhan
  Fast,    // Corredor Sombrio
  Tank,    // Golem de Ferro
  Flying,  // Cavaleiro Espectral
  Boss,    // Senhor da Guerra Vorrhan
}

export enum TileType {
  Path,
  Buildable,
  Decoration,
  Blocked,
}

export enum GameState {
  Menu,
  Playing,
  Paused,
  GameOver,
}

export enum EffectType {
  Slow,
}

export enum TargetMode {
  First,     // mais avançado no caminho
  Last,      // mais atrasado
  Strongest, // mais HP
  Weakest,   // menos HP
  Closest,   // mais próximo da torre
}
