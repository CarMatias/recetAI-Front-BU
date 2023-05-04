import {
  FlatList,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/ui/Container';

import {Image, Divider} from '@rneui/base';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {Recipe} from '../../schemas/Recipe';
import Text from '../../components/ui/Text';
import colors from '../../assets/colors';
import Api from '../../api';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  AppTabParamList,
  HomeStackParamList,
  ResultsStackParamList,
  RootStackParamList,
} from '../../Navigation/Navigator';

type Props = {
  navigation: any;
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ESPACIO_CONTENEDOR = width * 0.8;
const ESPACIO = 10;

type HomeScreenProps = CompositeScreenProps<
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, 'Home'>,
    BottomTabScreenProps<AppTabParamList, 'HomeNavigator'>
  >,
  NativeStackScreenProps<RootStackParamList>
>;

const HomeScreen = (props: HomeScreenProps) => {
  const [recipe, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    Api.Recipes.getRandomRecipes().then(setRecipes);
  }, []);

  const findRecipe = (index: number) => {
    props.navigation.navigate('RecipeDetails', {recipe: recipe[index]});
  };

  const handleRecipeCategory = async (category: string) => {
    console.log(category);

    const recipeCategory: Recipe[] =
      await Api.Recipes.getRandomRecipeByCategory(category);
    props.navigation.navigate('ResultsNavigator', {
      screen: 'Results',
      params: {recipelst: recipeCategory},
    });
    console.log(recipeCategory);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <Container
        style={{
          borderTopEndRadius: 15,
          borderTopLeftRadius: 15,
          elevation: 4,
          backgroundColor: 'white',
        }}>
        <View style={styles.beetwen}>
          <Divider width={1} style={{marginBottom: 10}} />
          {recipe.length === 0 ? (
            <ContentLoader
              speed={2}
              width={'100%'}
              height={275}
              preserveAspectRatio="xMinYMin meet"
              viewBox="0 0 200 125"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              {...props}>
              <Rect x="0" y="0" rx="8" ry="8" width="200" height="125" />
            </ContentLoader>
          ) : (
            <FlatList
              data={recipe}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: 10,
                paddingBottom: 20,
                marginBottom: 50,
              }}
              decelerationRate={0}
              snapToInterval={ESPACIO_CONTENEDOR}
              scrollEventThrottle={16}
              renderItem={({item, index}) => {
                return (
                  <View style={{width: ESPACIO_CONTENEDOR}}>
                    <View
                      style={{
                        alignItems: 'center',
                        elevation: 2,
                        height: ESPACIO_CONTENEDOR * 0.6,
                        backgroundColor: 'white',
                        borderRadius: 19,
                        width: 300,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          findRecipe(index);
                        }}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={styles.posterImg}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
          <Divider width={1} style={{marginBottom: 20, marginTop: -50}} />

          <View style={styles.cont}>
            <View>
              <TouchableOpacity
                style={styles.categ}
                onPress={() => handleRecipeCategory('burger')}>
                <Image
                  source={require('../../assets/images/burger.png')}
                  style={styles.cate}
                />
                <Text>Hamburguesa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categ}
                onPress={() => handleRecipeCategory('dessert')}>
                <Image
                  source={require('../../assets/images/icecream.png')}
                  style={styles.cate}
                />
                <Text>Postres</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                borderRadius: 34,
                width: ESPACIO_CONTENEDOR / 2,
              }}>
              <TouchableOpacity
                style={styles.categ}
                onPress={() => handleRecipeCategory('pizza')}>
                <Image
                  source={require('../../assets/images/pizza.png')}
                  style={styles.cate}
                />
                <Text>Pizza</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categ}
                onPress={() => handleRecipeCategory('vegan')}>
                <Image
                  source={require('../../assets/images/vegan.png')}
                  style={styles.cate}
                />
                <Text>Vegano</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Container>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  beetwen: {
    margin: 20,
  },
  cont: {
    display: 'flex',
    flexDirection: 'row',
  },
  posterImg: {
    width: 300,
    height: ESPACIO_CONTENEDOR * 0.6,
    resizeMode: 'cover',
    borderRadius: 19,
    margin: 0,
    marginBottom: 10,
  },
  selectone: {
    width: 50,
    height: ESPACIO_CONTENEDOR * 0.1,
    margin: 20,
  },
  cate: {
    width: 70,
    height: ESPACIO_CONTENEDOR * 0.22,
    margin: 20,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  categ: {
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 30,
    borderColor: 'grey',
    paddingBottom: 5,
    elevation: 2,
    borderRadius: 14,
    backgroundColor: 'white',
  },
});
