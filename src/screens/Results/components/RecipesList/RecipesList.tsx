import {Icon} from '@rneui/themed';
import React from 'react';
import {FlatList, Image, View} from 'react-native';
import colors from '../../../../assets/colors';
import IconButton from '../../../../components/ui/Buttons/IconButton';
import TextButton from '../../../../components/ui/Buttons/TextButton';
import Text from '../../../../components/ui/Text';
import {Recipe} from '../../../../schemas/Recipe';
export interface RecipesListInterface {
  recipes: Recipe[];
  openRecipeDetail: (index: number) => void;
  toggleIsRecipeSaved: (index: number) => void;
  onShare: (index: number) => void;
}

const RecipesList: React.FC<RecipesListInterface> = ({
  recipes,
  openRecipeDetail,
  toggleIsRecipeSaved,

  onShare,
}) => {
  return (
    <FlatList
      data={recipes}
      keyExtractor={item => item.id}
      contentContainerStyle={{paddingTop: 20}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => (
        <View style={{marginBottom: 50}}>
          <View
            style={{
              width: 10,
              backgroundColor: colors.primary,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
              position: 'absolute',
              zIndex: 1000,

              height: '100%',

              // ...(recipeViewsHeight[index]
              //   ? {height: recipeViewsHeight[index]}
              //   : {height: '100%'}),
            }}
          />
          <View
            style={{
              borderRadius: 10,
              flexDirection: 'row',

              backgroundColor: colors.white,
              elevation: 5,
              padding: 20,
              paddingHorizontal: 30,
            }}>
            <View
              style={{
                flex: 3,
                marginRight: 20,
                justifyContent: 'center',
              }}>
              <Image
                source={{uri: item.imageUrl}}
                style={{height: 120, borderRadius: 4}}
              />
            </View>
            <View style={{flex: 2, justifyContent: 'space-around'}}>
              <Text
                style={{
                  fontSize: 18,
                  color: colors.black,
                  marginBottom: 10,
                  fontWeight: '800',
                }}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                {item.timeToCook ? (
                  <>
                    <Icon name="md-stopwatch-outline" type="ionicon" />
                    <Text>{item.timeToCook} minutos</Text>
                  </>
                ) : null}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TextButton
                  text="Ver mas"
                  onPress={() => openRecipeDetail(index)}
                />
                <IconButton
                  name="md-share-social-outline"
                  type="ionicon"
                  onPress={() => onShare(index)}
                />
              </View>
            </View>

            <IconButton
              style={{position: 'absolute', top: -15, right: 15}}
              onPress={() => toggleIsRecipeSaved(index)}
              type="ionicon"
              name={item.isSaved ? 'md-bookmark' : 'md-bookmark-outline'}
              size={30}
              color={colors.primary}
              backgroundColor="#fff"
            />
          </View>
        </View>
      )}
    />
  );
};

export default RecipesList;
