import {apiClient} from '..';
import {Recipe} from '../../schemas/Recipe';
import {Filters, RecipesApi} from './types';

function mapRecipeFromApi(recipe: any): Recipe {
  console.log('mapping fn');

  return {
    id: recipe.id,
    name: recipe.name,
    imageUrl: recipe.image,
    recipeUrl: recipe.link,
    timeToCook: recipe.timeToCook,
    serves: recipe.serves,
    ingredients: Array.from(
      new Set(recipe.ingredients.map((value: any) => value.food)),
    ).map((value: any) => ({name: value})),
  };
}
class EdamamRecipeApi implements RecipesApi {
  async saveRecipe(recipeId: string, userId: string): Promise<string> {
    const res = await apiClient.post('/saved', {
      userId,
      recipeId,
    });
    return res.data;
  }
  async getSavedRecipes(userId: string): Promise<Recipe[]> {
    const res = await apiClient.get(`/saved?userId=${userId}`);
    const recipes: Recipe[] = res?.data.map((r: any) => mapRecipeFromApi(r));
    return recipes;
  }

  async getRecipesByIngredients(
    ingredients: string[],
    filters?: Filters | undefined,
  ): Promise<Recipe[]> {
    const res = await apiClient.post('/recipes', {
      data: ingredients,
      filters: filters,
    });
    const recipes: Recipe[] =
      res?.data.map((r: any) => mapRecipeFromApi(r)) ?? [];
    return recipes;
  }

  async getRandomRecipes(): Promise<Recipe[]> {
    const res = await apiClient.get('/getrandom');
    console.log(res.data);
    const recipes: Recipe[] = res?.data.map((r: any) => mapRecipeFromApi(r));
    console.log(recipes);
    return recipes;
  }

  async getRandomRecipeByCategory(category: string): Promise<Recipe[]> {
    const res = await apiClient.post('/getrecipebycategory',{category})
    const recipes: Recipe[] = res?.data.map((r: any) => ({
      id: r.id,
      name: r.name,
      imageUrl: r.image,
      recipeUrl: r.link,
      timeToCook: r.timeToCook,
      serves: r.serves,
      ingredients: Array.from(
        new Set(r.ingredients.map((value: any) => value.food)),
      ).map((value: any) => ({name: value})),
    }));
    return recipes;
  }
}

export default new EdamamRecipeApi();
