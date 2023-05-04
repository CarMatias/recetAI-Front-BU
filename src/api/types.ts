import {Recipe} from '../schemas/Recipe';

export interface IRecipesApi {
  getRandomRecipes: (quantity: number) => Promise<Recipe[]>;
}
