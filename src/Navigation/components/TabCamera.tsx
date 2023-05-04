import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Icon} from '@rneui/themed';
import colors from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList, ROOT_ROUTES} from '../Navigator';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {};

type ScreenProps = NativeStackNavigationProp<RootStackParamList, 'Camera'>;

export default function TabCamera({}: Props) {
  const navigator = useNavigation<ScreenProps>();

  const handlePress = () => {
    navigator.navigate(ROOT_ROUTES.CAMERA);
  };

  const width = Dimensions.get('window').width;
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        zIndex: 5,
        left: width / 2 - 30,
        right: width / 2 - 30,
        top: '-50%',
        backgroundColor: colors.primary,
        borderRadius: 20,
        elevation: 5,
        paddingVertical: 10,
      }}
      onPress={handlePress}>
      <Icon name="scan1" size={40} type="antdesign" color={colors.white} />
    </TouchableOpacity>
  );
}
