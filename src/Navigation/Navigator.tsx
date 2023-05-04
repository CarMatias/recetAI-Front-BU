import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import MyTabBar from './AppTabNavigator';
import colors from '../assets/colors';
import Home from '../screens/Home';
import Results from '../screens/Results';
import Saved from '../screens/Saved';
import Profile from '../screens/Profile';
import Camera from '../screens/Camera';
import {useAuth} from '../components/providers/AuthProvider';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import Onboarding from '../screens/Onboarding';
import {Recipe} from '../schemas/Recipe';
import RecipeDetails from '../screens/RecipeDetails';
import {useGlobalContext} from '../components/ui/Splash/Splash';

import CustomHeader from './components/CustomHeader';
import IngredientsContext from '../screens/Camera/context/IngredientsContext';
import IngredientsProvider from '../screens/Camera/context/IngredientsContext';

export const ROOT_ROUTES = {
  LOGIN: 'Login',
  REGISTER: 'Register',
  APP: 'App',
  CAMERA: 'Camera',
  ONBOARDING: 'Onboarding',
} as const;

export const APP_ROUTES = {
  HOME: 'Home',
  HOMENAVIGATOR: 'HomeNavigator',
  PROFILE: 'Profile',
  SAVED: 'Saved',
  RESULTS: 'Results',
  RESULTSNAVIGATOR: 'ResultsNavigator',
} as const;

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  App: NavigatorScreenParams<AppTabParamList>;
  Camera: undefined;
  Onboarding: undefined;
  Home: undefined;
};

export type AppTabParamList = {
  HomeNavigator: NavigatorScreenParams<HomeStackParamList>;
  Saved: undefined;
  ResultsNavigator: NavigatorScreenParams<ResultsStackParamList>;
  Profile: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  RecipeDetails: {
    recipe: Recipe;
  };
};

export type ResultsStackParamList = {
  Results: {
    ingredients: string[] | undefined;
    filters: {
      tags: string[];
      timeToCook: number;
    } | undefined;
    recipelst:Recipe[] | undefined
  };
  RecipeDetails: {
    recipe: Recipe;
  };
};
const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();

const TabNavigator = createBottomTabNavigator<AppTabParamList>();

const HomeStackNavigator = createNativeStackNavigator<HomeStackParamList>();

const ResultsStackNavigator =
  createNativeStackNavigator<ResultsStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name={APP_ROUTES.HOME}
        component={Home}
        options={{headerShown: false}}
      />
      <HomeStackNavigator.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{headerShown: false}}
      />
    </HomeStackNavigator.Navigator>
  );
};

const ResultsNavigator = () => {
  return (
    <ResultsStackNavigator.Navigator>
      <ResultsStackNavigator.Screen
        name={APP_ROUTES.RESULTS}
        component={Results}
        options={{headerShown: false}}
      />
      <ResultsStackNavigator.Screen
        name="RecipeDetails"
        component={RecipeDetails}
        options={{headerShown: false}}
      />
    </ResultsStackNavigator.Navigator>
  );
};

const AppTabNavigator = () => {
  return (
    <IngredientsProvider>
    <TabNavigator.Navigator
      tabBar={MyTabBar}
      screenOptions={() => ({
        tabBarActiveTintColor: colors.primary,
      })}>
      <TabNavigator.Screen
        name={APP_ROUTES.HOMENAVIGATOR}
        component={HomeNavigator}
        options={{
          header(props) {
            return(<CustomHeader></CustomHeader>)
          },
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
            borderBottomWidth: 1.5,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'Quicksand-Bold',
          },
        }}
      />
      <TabNavigator.Screen
        name={APP_ROUTES.SAVED}
        component={Saved}
        options={{
          headerTitle: 'Guardadas',
          headerTitleStyle: {
            fontFamily: 'Quicksand-Bold',
          },
        }}
      />
      <TabNavigator.Screen
        name={APP_ROUTES.RESULTSNAVIGATOR}
        component={ResultsNavigator}
        options={{
          headerTitle: 'Resultados',
          headerTitleStyle: {
            fontFamily: 'Quicksand-Bold',
          },
        }}
      />
      <TabNavigator.Screen
        name={APP_ROUTES.PROFILE}
        component={Profile}
        options={{
          headerTitle: 'Perfil',
          headerTitleStyle: {
            fontFamily: 'Quicksand-Bold',
          },
        }}
      />
    </TabNavigator.Navigator>
    </IngredientsProvider>
  );
};

const Navigator = () => {
  const {user} = useAuth();
  const {isFirstUse} = useGlobalContext();

  const renderFirstUse = () => (
    <RootStackNavigator.Screen
      name={ROOT_ROUTES.ONBOARDING}
      component={Onboarding}
    />
  );

  const renderAuthedScreens = () => (
    <>
      <RootStackNavigator.Screen
        name={ROOT_ROUTES.APP}
        component={AppTabNavigator}
      />

      <RootStackNavigator.Screen name={ROOT_ROUTES.CAMERA} component={Camera} />
    </>
  );

  const renderLoginScreens = () => (
    <>
      <RootStackNavigator.Screen
        name={ROOT_ROUTES.LOGIN}
        component={LoginScreen}
      />
      <RootStackNavigator.Screen
        name={ROOT_ROUTES.REGISTER}
        component={RegisterScreen}
      />
    </>
  );

  return (
    <NavigationContainer>
      <RootStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!user
          ? renderLoginScreens()
          : isFirstUse
          ? renderFirstUse()
          : renderAuthedScreens()}
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
