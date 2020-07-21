import { IFighters, IFightersFight } from '../interfaces/IFighters';

export default class FighterPlayer implements IFightersFight {
  name: string;
  attack: number;
  defense: number;
  initialHealth: number;
  currentHealth: number;
  isBlocking: boolean;
  lastTimeSuperHit: Date | number;
  superHitCombination: string[];
  superHitTime: Date | number;
  lastSuperHit: Date | number;

  constructor(fighter: IFighters) {
    this.name = fighter.name;
    this.attack = fighter.attack;
    this.defense = fighter.defense;
    this.initialHealth = fighter.health;
    this.currentHealth = fighter.health;
    this.isBlocking = false;
    this.lastTimeSuperHit = 0;
    this.superHitCombination = [];
    this.superHitTime = 0;
    this.lastSuperHit = 0;
  }
}