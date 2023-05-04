export type Recipe = {
  id: string;
  name: string;
  timeToCook: number;
  serves: number;
  imageUrl: string;
  recipeUrl: string;
  ingredients: IngredientInRecipe[];
};

type IngredientInRecipe = {
  name: string;
  quantity?: number;
  unit?: string;
  id?: string;
};
