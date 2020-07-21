import { callApi } from '../helpers/apiHelper';
import { IFighters } from '../interfaces/IFighters';

class FighterService {
  async getFighters(): Promise<IFighters[]> {
    try {
      const endpoint: string = 'fighters.json';
      const apiResult: IFighters[] = await callApi<IFighters[]>(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id: string): Promise<IFighters> {
    // todo: implement this method
    // endpoint - `details/fighter/${id}.json`;
    try {
      const endpoint: string = `details/fighter/${id}.json`;
      const apiResult: IFighters = await callApi<IFighters>(endpoint, 'GET');

      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
