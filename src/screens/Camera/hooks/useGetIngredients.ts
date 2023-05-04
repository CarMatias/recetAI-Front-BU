import {useState} from 'react';
import {ToastAndroid} from 'react-native';
import Api from '../../../api';
import {Ingredient} from '../../../schemas/Ingredient';

export default function useGetIngredients() {
  const [ingredients, setIngredients] = useState<{
    data: (Ingredient & {
      locked: boolean;
    })[];
    isLoading: boolean;
    error: boolean;
  }>({
    data: [],
    isLoading: false,
    error: false,
  });

  const getIngredients = async (base64img: string) => {
    setIngredients({data: [], isLoading: true, error: false});

    const res = await Api.Ingredients.getIngredientsByImg(base64img);
    setIngredients({
      data: res.map(r => ({...r, locked: false})),
      isLoading: false,
      error: false,
    });
  };

  const addIngredient = async (ingredient: Ingredient) => {
    if (ingredient.name.trim() === '') {
      ToastAndroid.show('Ingrese un ingrediente válido', ToastAndroid.SHORT);
      return;
    }

    const exists = ingredients.data.find(
      i => i.name.toLowerCase() === ingredient.name.toLowerCase(),
    );
    if (exists) {
      ToastAndroid.show(
        'El ingrediente ya se encuentra en la lista',
        ToastAndroid.SHORT,
      );
      return;
    }

    setIngredients(prev => ({
      data: [...prev.data, {...ingredient, locked: false}],
      isLoading: false,
      error: false,
    }));
    ToastAndroid.show('Ingrediente agregado', ToastAndroid.SHORT);
  };

  const removeIngredient = async (ingredient: Ingredient) => {
    setIngredients(prev => ({
      data: prev.data.filter(i => i.name !== ingredient.name),
      isLoading: false,
      error: false,
    }));
  };

  const clearIngredients = async () => {
    setIngredients({data: [], isLoading: false, error: false});
  };

  const toggleLockIngredient = async (ingredient: Ingredient) => {
    console.log('toggleLockIngredient', ingredient);
    setIngredients(prev => ({
      data: prev.data.map(i => {
        if (i.name === ingredient.name) {
          return {...i, locked: !i.locked};
        }
        return i;
      }),
      isLoading: false,
      error: false,
    }));
  };
  return {
    ingredients: ingredients.data,
    isLoading: ingredients.isLoading,
    error: ingredients.error,
    toggleLockIngredient,
    getIngredients,
    addIngredient,
    removeIngredient,
    clearIngredients,
  };
}
