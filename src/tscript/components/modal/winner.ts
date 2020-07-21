import { showModal } from './modal';
// import { createFighterImage } from '../fighterPreview';
import {IFighters} from '../../interfaces/IFighters';

export function showWinnerModal(fighter: IFighters): void {
  // call showModal function
  const result = {
    title: `Congratulation, ${fighter.name}, you are the winner`,
    bodyElement: fighter,
    onClose: () => {
      window.location.reload();
    },
  };
  showModal(result);
}

