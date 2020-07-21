import { controls } from '../../constants/controls';
import { IFighters, IFightersFight } from '../interfaces/IFighters';
import FighterPlayer from './FighterPlayers';

export async function fight(firstFighter: IFighters, secondFighter: IFighters): Promise<IFighters> {
  return new Promise((resolve) => {

    const playerOne: FighterPlayer = new FighterPlayer(firstFighter);
    const playerTwo: FighterPlayer = new FighterPlayer(secondFighter);

    const keyDownListener = (event: KeyboardEvent) => {
      keyPress(event.code, playerOne, playerTwo);

      if (playerOne.currentHealth <= 0) {
        removeKeyPress();
        resolve(secondFighter);
      } else if (playerTwo.currentHealth <= 0) {
        removeKeyPress();
        resolve(firstFighter);
      }
    };
    document.addEventListener('keydown', keyDownListener);

    const keyUpListener = (event: KeyboardEvent): void => {
      if (event.code === controls.PlayerOneBlock && playerOne.isBlocking) {
        playerOne.isBlocking = false;
      } else if (event.code === controls.PlayerTwoBlock && playerTwo.isBlocking) {
        playerTwo.isBlocking = false;
      }
    };
    document.addEventListener('keyup', keyUpListener);

    const removeKeyPress = () => {
      document.removeEventListener('keydown', keyDownListener);
      document.removeEventListener('keyup', keyUpListener);
    };
  });
}

const keyPress = (keyCode: string, firstFighter: IFightersFight, secondFighter: IFightersFight): void => {
  switch (keyCode) {
    case controls.PlayerOneAttack:
      playerAttacks(firstFighter, secondFighter, 'right');
      break;
    case controls.PlayerTwoAttack:
      playerAttacks(secondFighter, firstFighter, 'left');
      break;
    case controls.PlayerOneBlock:
      if (!firstFighter.isBlocking) {
        firstFighter.isBlocking = true;
      }
      break;
    case controls.PlayerTwoBlock:
      if (!secondFighter.isBlocking) {
        secondFighter.isBlocking = true;
      }
      break;
    default:
      if (checkSuperHitPressedKey(keyCode, controls.PlayerOneCriticalHitCombination, firstFighter)) {
        checkSuperHitSequence(
          firstFighter,
          secondFighter,
          keyCode,
          controls.PlayerOneCriticalHitCombination,
          'right'
        );
      } else if (checkSuperHitPressedKey(keyCode, controls.PlayerTwoCriticalHitCombination, secondFighter)) {
        checkSuperHitSequence(
          secondFighter,
          firstFighter,
          keyCode,
          controls.PlayerTwoCriticalHitCombination,
          'left'
        );
      }
      break;
  }
};

const updateFighterHealth = (fighter: IFightersFight, side: string): void => {
  document.getElementById(`${side}-fighter-indicator`)!.style.width = `${Math.round(
    (fighter.currentHealth / fighter.initialHealth) * 100
  )}%`;
};

const playerAttacks = (attacker: IFightersFight, defender: IFightersFight, side: string): void => {
  const attackerDamageDealt = getDamage(attacker, defender);
  defender.currentHealth -= attackerDamageDealt;
  resetSuperHit(attacker);
  updateFighterHealth(defender, side);
};

const checkSuperHitSequence = (attacker: IFightersFight, defender: IFightersFight, key: string, combination: string[], side: string): void => {
  switch (attacker.superHitCombination.length) {
    case 0:
      if (checkSuperHitTime(attacker)) {
        //do nothing
      } else if (key === combination[0]) {
        attacker.superHitTime = new Date();
        attacker.superHitCombination.push(key);
      }
      break;
    case 1:
      if (checkSuperHitDelay(attacker)) {
        resetSuperHit(attacker);
      } else if (key === combination[1]) {
        attacker.superHitTime = new Date();
        attacker.superHitCombination.push(key);
      } else {
        resetSuperHit(attacker);
      }
      break;
    case 2:
      if (checkSuperHitDelay(attacker)) {
        resetSuperHit(attacker);
      } else if (key === combination[2]) {
        const defenderPlayerDamageDealt = getCriticalHit(attacker);
        defender.currentHealth -= defenderPlayerDamageDealt;

        updateFighterHealth(defender, side);

        resetSuperHit(attacker);
        updateSuperHitTime(attacker);
      } else {
        resetSuperHit(attacker);
      }
      break;
  }
};

export function getCriticalHit(fighter: IFightersFight): number {
  // return hit power
  return 2 * fighter.attack;
}

export function getDamage(attacker: IFightersFight, defender: IFightersFight): number {
  // return damage
  if (attacker.isBlocking || defender.isBlocking) {
    return 0;
  }
  const hitPower = getHitPower(attacker);
  const blockPower = getBlockPower(defender);
  return blockPower > hitPower ? 0 : hitPower - blockPower;
}

export function getHitPower(fighter: IFightersFight): number {
  // return hit power
  const criticalHitChance = Math.random() + 1;
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter: IFightersFight): number {
  // return block power
  const dodgeChance = Math.random() + 1;
  return dodgeChance * fighter.defense;
}

const resetSuperHit = (fighter: IFightersFight): void => {
  fighter.superHitCombination = [];
  fighter.superHitTime = 0;
};

const updateSuperHitTime = (fighter: IFightersFight): void => {
  fighter.lastSuperHit = new Date();
};

const checkSuperHitPressedKey = (key: string, combination: string[], fighter: IFightersFight): boolean => {
  return combination.includes(key) && !fighter.isBlocking;
};

const checkSuperHitTime = (fighter: IFightersFight): boolean => {
  return (Number(new Date()) - Number(fighter.lastSuperHit)) / 1000 < 10;
};

const checkSuperHitDelay = (fighter: IFightersFight): boolean => {
  return (Number(new Date()) - Number(fighter.superHitTime)) / 1000 > 2;
};