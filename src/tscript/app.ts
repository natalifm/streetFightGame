import { createFighters } from './components/fightersView';
import { fighterService } from './services/fightersService';
import { IFighters } from './interfaces/IFighters';


class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root') as HTMLElement;
  static loadingElement = document.getElementById('loading-overlay') as HTMLElement;

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';

      const fighters: IFighters[] = await fighterService.getFighters();
      const fightersElement: HTMLElement = createFighters(fighters);

      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;
