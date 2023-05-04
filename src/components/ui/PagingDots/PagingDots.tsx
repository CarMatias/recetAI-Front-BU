import React from 'react';
import {View} from 'react-native';
import colors from '../../../assets/colors';
export interface PagingDotsInterface {
  numberOfDots: number;
  currentIndex: number;
}

const PagingDots: React.FC<PagingDotsInterface> = ({
  currentIndex,
  numberOfDots,
}) => {
  const isSelected = (index: number) => index === currentIndex;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {Array.from({length: numberOfDots}).map((_, index) => {
        return (
          <View
            key={index}
            style={{
              width: isSelected(index) ? 30 : 20,
              height: 10,
              borderRadius: 5,
              backgroundColor:
                index === currentIndex ? colors.primary : colors.lighterGray,
              marginHorizontal: 10,
            }}
          />
        );
      })}
    </View>
  );
};

export default PagingDots;
