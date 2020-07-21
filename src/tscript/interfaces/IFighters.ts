export interface IFighters {
  _id: string
  name: string
  source: string
  health: number
  defense: number
  attack: number
}

export interface IFightersFight {
  name: string
  attack: number
  defense: number
  isBlocking: boolean
  initialHealth: number
  currentHealth: number
  superHitCombination: string[]
  superHitTime: Date | number
  lastSuperHit: Date | number
}