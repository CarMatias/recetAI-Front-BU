import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../../../assets/colors';
import {Icon} from '@rneui/themed';

type Props = {
  onShootPress: () => void;
  onGalleryPress: () => void;
};

const circleDiameter = 80;

const BottomControls = ({onShootPress, onGalleryPress}: Props) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        height: 150,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#0009',
        flexDirection: 'row',
      }}>
      <View style={{flex: 3, alignItems: 'center'}}>
        <TouchableOpacity onPress={onGalleryPress}>
          <Icon
            name="images-outline"
            type="ionicon"
            color={colors.primary}
            size={32}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 4}}>
        <TouchableOpacity
          style={{
            width: circleDiameter,
            height: circleDiameter,
            borderRadius: 1000,
            borderColor: colors.primary,
            borderWidth: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
          onPress={onShootPress}>
          <View
            style={{
              width: circleDiameter * 0.7,
              height: circleDiameter * 0.7,
              borderRadius: 1000,
              backgroundColor: colors.primary + '99',
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{flex: 3}} />
    </View>
  );
};

export default BottomControls;
