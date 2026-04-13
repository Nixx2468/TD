import type { EventBus } from '../core/EventBus';

export class EconomyManager {
  gold: number;
  score = 0;
  lives: number;
  private unsubs: (() => void)[] = [];

  constructor(startGold: number, startLives: number, private eventBus: EventBus) {
    this.gold = startGold;
    this.lives = startLives;
    this.subscribe();
  }

  private subscribe(): void {
    this.unsubs.push(
      this.eventBus.on('enemy:killed', ({ reward }) => {
        this.gold += reward;
        this.score += reward;
      }),
      this.eventBus.on('enemy:converted', ({ enemy }) => {
        this.score += enemy.config.scoreValue * 2; // bónus por converter
      }),
      this.eventBus.on('enemy:leaked', () => {
        this.loseLife();
      })
    );
  }

  spend(amount: number): boolean {
    if (this.gold < amount) return false;
    this.gold -= amount;
    return true;
  }

  earn(amount: number): void {
    this.gold += amount;
  }

  loseLife(): void {
    this.lives = Math.max(0, this.lives - 1);
    if (this.lives === 0) {
      this.eventBus.emit('game:over', { won: false, score: this.score });
    }
  }

  destroy(): void {
    this.unsubs.forEach(u => u());
  }
}
