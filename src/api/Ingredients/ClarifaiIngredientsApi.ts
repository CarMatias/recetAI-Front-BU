import axios from 'axios';
import {API_URL} from '..';
import {Ingredient} from '../../schemas/Ingredient';
import {capitalize} from '../../utils/text';
import {IngredientsApi} from './types';
type RecognizedIngredient = {
  id: string;
  name: string;
  confidence: number;
};

class ClarifaiIngredientsApi implements IngredientsApi {
  async getIngredientsByImg(
    base64img: string,
  ): Promise<(Ingredient & {confidence: number})[]> {
    try {
      const res = await axios.post<{data: RecognizedIngredient[]}>(
        API_URL + '/recognition',
        {
          imgBase64: base64img,
        },
      );

      if (res.status === 200) {
        return res.data.data.map(ingredient => ({
          ...ingredient,
          name: capitalize(ingredient.name),
          id: ingredient.id,
        }));
      } else {
        console.log(res);
      }
      return [];
    } catch (e) {
      console.log(e);
    }
    return [];
  }
}

export default new ClarifaiIngredientsApi();
