import axios from 'axios';
import SupabaseAuthApi from './Auth/SupabaseAuthApi';
import ClarifaiIngredientsApi from './Ingredients/ClarifaiIngredientsApi';
import MockIngredientsApi from './Ingredients/MockIngredientsApi';
import {IngredientsApi} from './Ingredients/types';
import ProfileUserApi from './profile/ProfileUserApi';
import {ProfileApi} from './profile/types';
import EdamamRecipesApi from './Recipes/EdamamRecipesApi';

import MockRecipesApi from './Recipes/MockRecipesApi';

import {RecipesApi} from './Recipes/types';

const API_URLS = {
  local: 'http://192.168.0.10:3000',
  prod: 'https://recetai-backend-production.up.railway.app',
};

export const API_URL = API_URLS.prod;

export const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use(
  config => {
    console.log(
      `requesting to:`,
      `${config.method?.toUpperCase()} - ${config.baseURL + config.url}`,
    );
    console.log('request body:', config.data);
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

const Api: {
  Ingredients: IngredientsApi;
  Recipes: RecipesApi;
  Auth: typeof SupabaseAuthApi;
  Profile: ProfileApi;
} = {
  Ingredients: ClarifaiIngredientsApi,
  Recipes: {
    getRecipesByIngredients: EdamamRecipesApi.getRecipesByIngredients,
    getRandomRecipes: EdamamRecipesApi.getRandomRecipes,
    getRandomRecipeByCategory:EdamamRecipesApi.getRandomRecipeByCategory,
    getSavedRecipes: EdamamRecipesApi.getSavedRecipes,
    saveRecipe: EdamamRecipesApi.saveRecipe,
  },
  Auth: SupabaseAuthApi,
  Profile: {
    postNewNotice: ProfileUserApi.postNewNotice,
    getNoticeByUser: ProfileUserApi.getNoticeByUser,
  },
};

export default Api;
