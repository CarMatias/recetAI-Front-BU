import {Ingredient} from '../../schemas/Ingredient';

export interface IngredientsApi {
  getIngredientsByImg(
    base64img: string,
  ): Promise<(Ingredient & {confidence: number})[]>;
}
