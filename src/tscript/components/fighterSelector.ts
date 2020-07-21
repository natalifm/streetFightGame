import { createElement } from '../helpers/domHelper';
import { renderArena } from './arena';
import { createFighterPreview } from './fighterPreview';
import { fighterService } from '../services/fightersService';
import { IFighters } from '../interfaces/IFighters';
const versusImg = '../../../resources/versus.png';

export function createFightersSelector() {
  let selectedFighters: IFighters[] = [];

  return async (fighterId: string) => {
    const fighter: IFighters = await getFighterInfo(fighterId);
    const [playerOne, playerTwo] = selectedFighters;
    const firstFighter: IFighters = playerOne ?? fighter;
    const secondFighter: IFighters = Boolean(playerOne) ? playerTwo ?? fighter : playerTwo;
    selectedFighters = [firstFighter, secondFighter];

    renderSelectedFighters(selectedFighters);
  };
}

const fighterDetailsMap = new Map();

export async function getFighterInfo(fighterId: string): Promise<IFighters> {
  // get fighter info from fighterDetailsMap or from service and write it to fighterDetailsMap
  if (!fighterDetailsMap.has(fighterId)) {
    const fightersInfo = await fighterService.getFighterDetails(fighterId);
    fighterDetailsMap.set(fighterId, fightersInfo);
  }
  return fighterDetailsMap.get(fighterId);
}

function renderSelectedFighters(selectedFighters: IFighters[]): void {
  const fightersPreview: Element | null = document.querySelector('.preview-container___root');
  const [playerOne, playerTwo] = selectedFighters;
  const firstPreview: HTMLElement = createFighterPreview(playerOne, 'left');
  const secondPreview: HTMLElement = createFighterPreview(playerTwo, 'right');
  const versusBlock: HTMLElement = createVersusBlock(selectedFighters);

  if (fightersPreview) {
    fightersPreview.innerHTML = '';
    fightersPreview.append(firstPreview, versusBlock, secondPreview);
  }
}

function createVersusBlock(selectedFighters: IFighters[]): HTMLElement {
  const canStartFight = selectedFighters.filter(Boolean).length === 2;
  const onClick = () => startFight(selectedFighters);
  const container: HTMLElement = createElement({ tagName: 'div', className: 'preview-container___versus-block' });
  const image: HTMLElement = createElement({
    tagName: 'img',
    className: 'preview-container___versus-img',
    attributes: { src: versusImg }
  });
  const disabledBtn = canStartFight ? '' : 'disabled';
  const fightBtn: HTMLElement = createElement({
    tagName: 'button',
    className: `preview-container___fight-btn ${disabledBtn}`
  });

  fightBtn.addEventListener('click', onClick, false);
  fightBtn.innerText = 'Fight';
  container.append(image, fightBtn);

  return container;
}

function startFight(selectedFighters: IFighters[]): void {
  renderArena(selectedFighters);
}
