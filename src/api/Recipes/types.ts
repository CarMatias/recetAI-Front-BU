import {Recipe} from '../../schemas/Recipe';

export type Filters = {
  health?: string[];
  timeToCook: number;
};

export interface RecipesApi {
  getRecipesByIngredients(
    ingredients: string[],
    filters?: Filters,
  ): Promise<Recipe[]>;
  getSavedRecipes(userId: string): Promise<Recipe[]>;
  getRandomRecipes(): Promise<Recipe[]>;
  getRandomRecipeByCategory(category:string):Promise<Recipe[]>;
  saveRecipe(recipeId: string, userId: string): Promise<string>;
}
