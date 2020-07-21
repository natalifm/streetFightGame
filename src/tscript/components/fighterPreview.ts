import { createElement } from '../helpers/domHelper';
import { IFighters } from '../interfaces/IFighters';

export function createFighterPreview(fighter: IFighters, position: string): HTMLElement {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement: HTMLElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`
  });

  // todo: show fighter info (image, name, health, etc.)
  if (fighter) {
    const fighterInfo: HTMLElement = createElement({ tagName: 'span', className: 'fighter-preview___info' });
    const imageElement: HTMLElement = createFighterImage(fighter);
    fighterInfo.innerText = `${fighter.name} \n Health: ${fighter.health},\n AttackPower: ${fighter.attack},\n DefensePower: ${fighter.defense}`;
    fighterInfo.style.color = 'white';
    fighterInfo.style.fontSize = `20px`;
    fighterElement.append(imageElement, fighterInfo);
  }
  return fighterElement;
}

export function createFighterImage(fighter: IFighters): HTMLElement {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement: HTMLElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes
  });

  return imgElement;
}
