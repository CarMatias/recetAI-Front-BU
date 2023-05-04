import {LayoutChangeEvent, Share, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/ui/Container';
import {Recipe} from '../../schemas/Recipe';
import Api from '../../api';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {
  AppTabParamList,
  ResultsStackParamList,
  RootStackParamList,
  ROOT_ROUTES,
} from '../../Navigation/Navigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {EmptyRecipesState} from './components/EmptyRecipesState';
import {RecipesList} from './components/RecipesList';
import usePrevious from '../../hooks/usePrevious';
import {isDeepEqual} from '../../utils/functions';
import {useAuth} from '../../components/providers/AuthProvider';

interface RecipesState {
  recipes: (Recipe & {isSaved?: boolean})[];
  isLoading: boolean;
  error: string | null;
}

type ResultsScreenProps = CompositeScreenProps<
  CompositeScreenProps<
    NativeStackScreenProps<ResultsStackParamList, 'Results'>,
    BottomTabScreenProps<AppTabParamList, 'ResultsNavigator'>
  >,
  NativeStackScreenProps<RootStackParamList>
>;
const ResultsScreen = ({route: {params}, navigation}: ResultsScreenProps) => {
  const [recipes, setRecipes] = useState<RecipesState>({
    error: null,
    isLoading: false,
    recipes: [],
  });

  const {user} = useAuth();

  const isFocused = useIsFocused();

  const previousParams = usePrevious(params);

  const openRecipeDetail = (index: number) => {
    navigation.navigate('RecipeDetails', {
      recipe: recipes.recipes[index],
    });
  };

  const getRecipes = async () => {
    try {
      setRecipes({
        error: null,
        recipes: recipes.recipes,
        isLoading: true,
      });
      const {filters, ingredients} = params;
      const response = await Api.Recipes.getRecipesByIngredients(ingredients, {
        health: filters.tags,
        timeToCook: filters.timeToCook,
      });
      console.log(response);
      setRecipes({
        ...recipes,
        recipes: response,
        isLoading: false,
      });
    } catch (error) {
      setRecipes({
        ...recipes,
        error: error.message,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(params), JSON.stringify(previousParams));
    if (params?.recipelst) {
      setRecipes({error: null, isLoading: false, recipes: params.recipelst});
      return;
    }
    if (isFocused && !isDeepEqual(params, previousParams)) {
      getRecipes();
    }
  }, [isFocused]);

  const toggleIsRecipeSaved = async (position: number) => {
    console.log('toggleIsRecipeSaved', recipes.recipes[position].id, user.id);
    try {
      const res = await Api.Recipes.saveRecipe(
        recipes.recipes[position].id,
        user.id,
      );
      console.log(res);
      if (res) {
        setRecipes({
          ...recipes,
          recipes: recipes.recipes.map((recipe, index) => {
            if (index === position) {
              recipe.isSaved = !recipe.isSaved;
              ToastAndroid.show(
                `${!recipe.isSaved ? 'Eliminado de' : 'Agregado a'} favoritos`,
                ToastAndroid.SHORT,
              );
            }
            return recipe;
          }),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container
      style={{backgroundColor: '#fff', padding: 0, paddingHorizontal: 20}}>
      {recipes.isLoading && <FullScreenLoader color="rgba(0,0,0,0.5)" />}
      {recipes.recipes.length === 0 ? (
        <EmptyRecipesState
          goToCamera={() => navigation.navigate(ROOT_ROUTES.CAMERA)}
        />
      ) : (
        <RecipesList
          recipes={recipes.recipes}
          toggleIsRecipeSaved={toggleIsRecipeSaved}
          openRecipeDetail={openRecipeDetail}
          onShare={index =>
            Share.share({
              message: `Probá cocinar esta receta:\n ${recipes.recipes[index].recipeUrl}`,
            })
          }
        />
      )}
    </Container>
  );
};

export default ResultsScreen;
