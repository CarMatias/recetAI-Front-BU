import {Ingredient} from '../../schemas/Ingredient';
import {IngredientsApi} from './types';

class MockIngredientsApi implements IngredientsApi {
  getIngredientsByImg(
    base64img: string,
  ): Promise<(Ingredient & {confidence: number})[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {name: 'apple', confidence: 0.9},
          {name: 'banana', confidence: 0.8},
          {name: 'cucumber', confidence: 0.7},
          {name: 'dill', confidence: 0.6},
        ]);
      }, 1000);
    });
  }
}

export default new MockIngredientsApi();
