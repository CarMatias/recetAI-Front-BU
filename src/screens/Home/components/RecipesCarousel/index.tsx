import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';

type Props = {};

const RecipesCarousel = () => {
  const width = Dimensions.get('window').width;
  return (
    <Carousel
      width={width}
      data={[{name: 's'}, {name: '2'}]}
      renderItem={({item}) => (
        <View>
          <Text>{item.name}</Text>
        </View>
      )}
    />
  );
};

export default RecipesCarousel;
