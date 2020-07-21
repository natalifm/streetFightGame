import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight';
import { showWinnerModal } from './modal/winner';

import { IFighters } from '../interfaces/IFighters';

export function renderArena(selectedFighters: IFighters[]) {
  const root: HTMLElement | null = document.getElementById('root');
  const arena: HTMLElement = createArena(selectedFighters);
  const [firstFighter, secondFighter] = selectedFighters;

  if (root) {
    root.innerHTML = '';
    root.append(arena);
  }


  // todo:
  // - start the fight
  // - when fight is finished show winner
  fight(firstFighter, secondFighter).then((winner) => {
    showWinnerModal(winner as IFighters);
  });
}

function createArena(selectedFighters: IFighters[]): HTMLElement {
  const arena: HTMLElement = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators: HTMLElement = createHealthIndicators(...selectedFighters);
  const fighters: HTMLElement = createFighters(...selectedFighters);

  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter?: IFighters, rightFighter?: IFighters): HTMLElement {
  const healthIndicators: HTMLElement = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign: HTMLElement = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  if (leftFighter && rightFighter) {
    const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
    const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

    healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  }

  return healthIndicators;
}

function createHealthIndicator(fighter: IFighters, position: string): HTMLElement {
  const { name } = fighter;
  const container: HTMLElement = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });
  const fighterName: HTMLElement = createElement({ tagName: 'span', className: 'arena___fighter-name' });
  const indicator: HTMLElement = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar: HTMLElement = createElement({
    tagName: 'div',
    className: 'arena___health-bar',
    attributes: { id: `${position}-fighter-indicator` }
  });
  fighterName.innerText = name;
  indicator.append(bar);
  container.append(fighterName, indicator);

  return container;
}

function createFighters(firstFighter?: IFighters, secondFighter?: IFighters): HTMLElement {
  const battleField: HTMLElement = createElement({ tagName: 'div', className: `arena___battlefield` });
  if (firstFighter && secondFighter) {
    const firstFighterElement: HTMLElement = createFighter(firstFighter, 'left');
    const secondFighterElement: HTMLElement = createFighter(secondFighter, 'right');

    battleField.append(firstFighterElement, secondFighterElement);
  }
  return battleField;
}

function createFighter(fighter: IFighters, position: string): HTMLElement {
  const imgElement: HTMLElement = createFighterImage(fighter);
  const positionClassName: string = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement: HTMLElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`
  });

  fighterElement.append(imgElement);
  return fighterElement;
}
