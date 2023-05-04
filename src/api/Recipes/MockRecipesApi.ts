import {Recipe} from '../../schemas/Recipe';
import {RecipesApi} from './types';

const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Pollo al verdeo con papas',
    serves: 4,
    timeToCook: 75,
    recipeUrl:
      'https://cookpad.com/ar/recetas/3851963-supremas-de-pollo-al-verdeo-con-papas-noisette',
    ingredients: [
      {
        id: '1',
        name: 'Pollo',
        quantity: 1,
        unit: 'kg',
      },
      {
        id: '2',
        name: 'Verdeo',
        quantity: 0.5,
        unit: 'kg',
      },
      {
        id: '3',
        name: 'Papas',
        quantity: 1,
        unit: 'kg',
      },
    ],
    imageUrl:
      'https://i.pinimg.com/originals/2e/f7/6d/2ef76dd5f3b4383b3a533a8274a36e3f.jpg',
  },
  {
    id: '2',
    name: 'Pollo con papas al horno',
    serves: 4,
    timeToCook: 60,
    ingredients: [
      {
        id: '1',
        name: 'Pollo',
        quantity: 1,
        unit: 'kg',
      },
      {
        id: '3',
        name: 'papas',
        quantity: 2,
        unit: 'kg',
      },
    ],
    imageUrl:
      'https://www.cocinaabuenashoras.com/files/pollo-asado-al-horno-2.jpg',
    recipeUrl:
      'https://www.cocinaabuenashoras.com/pollo-asado-al-horno-con-patatas.html',
  },
  {
    id: '3',
    name: 'Pollo al champiñon con papas',
    serves: 4,
    timeToCook: 120,
    ingredients: [
      {
        id: '1',
        name: 'Pollo',
        quantity: 1,
        unit: 'kg',
      },
      {
        id: '3',
        name: 'papas',
        quantity: 2,
        unit: 'kg',
      },
      {
        id: '4',
        name: 'champiñon',
        quantity: 0.1,
        unit: 'kg',
      },
      {
        id: '4',
        name: 'crema',
        quantity: 0.1,
        unit: 'kg',
      },
      {
        id: '5',
        name: 'cebolla',
        quantity: 0.1,
        unit: 'kg',
      },
    ],
    imageUrl: 'https://assets.unileversolutions.com/recipes-v2/210719.jpg',
    recipeUrl:
      'https://www.recepedia.com/es-ar/recetas/aves/210719-supremas-de-pollo-al-champignon/',
  },
  {
    id: '4',
    name: 'Tarta de pollo',
    serves: 8,
    timeToCook: 90,
    recipeUrl: 'https://www.deliciosi.com/tarta-de-pollo-y-choclo/',
    ingredients: [
      {
        id: '1',
        name: 'Pollo',
        quantity: 1,
        unit: 'kg',
      },
      {
        id: '3',
        name: 'cebolla',
        quantity: 2,
        unit: 'kg',
      },
      {
        id: '4',
        name: 'morron',
        quantity: 0.1,
        unit: 'kg',
      },
      {
        id: '4',
        name: 'queso',
        quantity: 0.1,
        unit: 'kg',
      },
    ],
    imageUrl:
      'https://www.deliciosi.com/images/1300/1392/tarta-de-pollo-y-choclo.jpg',
  },
];

class MockRecipesApi implements RecipesApi {
  getSavedRecipes(): Promise<Recipe[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(recipes);
        resolve(recipes.filter((_, index) => index % 2 === 0));
      }, 5000);
    });
  }
  getRandomRecipes(): Promise<Recipe[]> {
    throw new Error('Method not implemented.');
  }

  async getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log(recipes);
        resolve(recipes);
      }, 5000);
    });
  }
}

export default new MockRecipesApi();
