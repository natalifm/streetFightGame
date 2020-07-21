import { createElement } from '../helpers/domHelper';
import { createFightersSelector } from './fighterSelector';
import { IFighters } from '../interfaces/IFighters';

export function createFighters(fighters: IFighters[]): HTMLElement {
  const selectFighter: (id: string) => Promise<void> = createFightersSelector();
  const container: HTMLElement = createElement({ tagName: 'div', className: 'fighters___root' });
  const preview: HTMLElement = createElement({ tagName: 'div', className: 'preview-container___root' });
  const fightersList: HTMLElement = createElement({ tagName: 'div', className: 'fighters___list' });
  const fighterElements: HTMLElement[] = fighters.map((fighter) => createFighter(fighter, selectFighter));

  fightersList.append(...fighterElements);
  container.append(preview, fightersList);

  return container;
}

function createFighter(fighter: IFighters, selectFighter: (fighterId: string) => Promise<void>): HTMLElement {
  const fighterElement: HTMLElement = createElement({ tagName: 'div', className: 'fighters___fighter' });
  const imageElement: HTMLElement = createImage(fighter);
  const onClick: () => Promise<void> = () => selectFighter(fighter._id);

  fighterElement.append(imageElement);
  fighterElement.addEventListener('click', onClick, false);

  return fighterElement;
}

function createImage(fighter: IFighters): HTMLElement {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement: HTMLElement = createElement({
    tagName: 'img',
    className: 'fighter___fighter-image',
    attributes
  });

  return imgElement;
}