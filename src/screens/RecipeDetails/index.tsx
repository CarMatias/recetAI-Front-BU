import {View, FlatList, Linking} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  AppTabParamList,
  HomeStackParamList,
  ResultsStackParamList,
} from '../../Navigation/Navigator';
import colors from '../../assets/colors';
import {Button, Divider, Icon, Image} from '@rneui/themed';
import CustomIcon from '../../assets/icons';
import Container from '../../components/ui/Container';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Text from '../../components/ui/Text';
import {capitalize} from '../../utils/text';
import WebView from 'react-native-webview';
import useWebView from '../../hooks/useWebView';
import FullScreenLoader from '../../components/ui/FullScreenLoader';

type RecipeDetailsScreenProps = CompositeScreenProps<
  | NativeStackScreenProps<ResultsStackParamList, 'RecipeDetails'>
  | NativeStackScreenProps<HomeStackParamList, 'RecipeDetails'>,
  BottomTabScreenProps<AppTabParamList>
>;

const RecipeDetailsScreen = ({
  route: {
    params: {recipe},
  },
}: RecipeDetailsScreenProps) => {
  const {webViewOpened, setWebViewOpened} = useWebView();

  const [isLoading, setIsLoading] = useState(false);

  const handleOpenUrl = () => {
    setWebViewOpened(true);
  };

  useEffect(() => {
    if (webViewOpened) {
      setIsLoading(true);
    }
  }, [webViewOpened]);

  return (
    <Container
      style={{
        flex: 1,
        padding: webViewOpened ? 0 : 20,
        backgroundColor: colors.white,
      }}>
      {webViewOpened ? (
        <>
          {isLoading && <FullScreenLoader />}
          <WebView
            source={{uri: recipe.recipeUrl}}
            onLoadStart={() => {
              console.log('onLoadStart');
            }}
            onLoadEnd={() => {
              console.log('onLoadEnd');
            }}
            onLoadProgress={({nativeEvent}) => {
              console.log('onLoadProgress', nativeEvent.progress);
              if (nativeEvent.progress === 1) {
                setIsLoading(false);
              }
            }}
            onLoad={() => {
              console.log('onLoad');
            }}
          />
        </>
      ) : (
        <FlatList
          data={recipe.ingredients}
          keyExtractor={item => item.name}
          ListHeaderComponent={
            <View>
              <Text
                style={{
                  fontSize: 24,
                  marginBottom: 20,
                  color: colors.primary,
                  fontWeight: '700',
                  textAlign: 'center',
                }}>
                {recipe?.name}
              </Text>
              <Divider style={{marginBottom: 20}} />
              <Image
                source={{uri: recipe.imageUrl}}
                resizeMode="cover"
                style={{
                  height: 225,

                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
            </View>
          }
          ListFooterComponentStyle={{
            flex: 1,
            justifyContent: 'flex-end',
          }}
          contentContainerStyle={{flexGrow: 1}}
          ListFooterComponent={
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Icon
                  name="md-stopwatch-outline"
                  type="ionicon"
                  size={32}
                  color={colors.lightGray}
                />
                <Text>
                  Tiempo de preparacion:
                  {recipe?.timeToCook != 0
                    ? recipe?.timeToCook + ' minutos'
                    : 'No especificado'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Icon
                  name="fast-food-outline"
                  type="ionicon"
                  size={32}
                  color={colors.lightGray}
                />
                <Text> Porciones: {recipe?.serves}</Text>
              </View>
              <View style={{marginBottom: 20}}>
                <Button
                  title="Ver pasos"
                  onPress={handleOpenUrl}
                  color={colors.primary}
                  titleStyle={{
                    fontFamily: 'Quicksand-Bold',
                    marginRight: 10,
                  }}
                  icon={
                    <Icon
                      name="book-outline"
                      type="ionicon"
                      color={colors.white}
                    />
                  }
                  iconRight
                />
              </View>
            </>
          }
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
                paddingBottom: 10,
                borderBottomColor: '#ddd',
                borderBottomWidth: 1,
              }}>
              <CustomIcon
                name="MeatChicken"
                svgProps={{
                  width: 36,
                  height: 36,
                }}
              />
              <Text style={{marginLeft: 5}}>{capitalize(item.name)}</Text>
            </View>
          )}
        />
      )}
    </Container>
  );
};

export default RecipeDetailsScreen;
