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
import {EmptyRecipesState} from '../Results/components/EmptyRecipesState';
import {RecipesList} from '../Results/components/RecipesList';
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
const SavedScreen = ({navigation}: ResultsScreenProps) => {
  const [recipes, setRecipes] = useState<RecipesState>({
    error: null,
    isLoading: false,
    recipes: [],
  });

  const isFocused = useIsFocused();

  const openRecipeDetail = (index: number) => {
    navigation.navigate('RecipeDetails', {
      recipe: recipes.recipes[index],
    });
  };

  const {user} = useAuth();

  const getRecipes = async () => {
    try {
      setRecipes({
        error: null,
        recipes: recipes.recipes,
        isLoading: true,
      });
      const response = await Api.Recipes.getSavedRecipes(user?.id);
      console.log(response);
      setRecipes({
        ...recipes,
        recipes: response.map(r => ({
          ...r,
          isSaved: true,
        })),
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      setRecipes({
        ...recipes,
        error: error.message,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRecipes();
    }
  }, [isFocused]);

  const toggleIsRecipeSaved = async (position: number) => {
    try {
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
    } catch (e) {}
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

export default SavedScreen;
