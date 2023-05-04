import React from 'react';
import {TouchableOpacity, TextProps, TouchableOpacityProps} from 'react-native';
import colors from '../../../../assets/colors';
import Text from '../../Text';
export type RoundedButtonInterface = {
  text: string;
  variant?: 'primary' | 'secondary';
  containerStyle?: TouchableOpacityProps['style'];
  textStyle?: TextProps['style'];
} & TextProps;

const variantColors = {
  primary: {
    backgroundColor: colors.primary,
    textColor: colors.white,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.white,
    textColor: colors.primary,
    borderColor: colors.primary,
  },
} as const;

const RoundedButton: React.FC<RoundedButtonInterface> = ({
  text = '',
  variant = 'primary',
  containerStyle,
  textStyle,
  onPress = () => console.log('pressed'),
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: variantColors[variant].backgroundColor,
        borderColor: variantColors[variant].borderColor,
        borderWidth: 1,
        borderRadius: 50,
        padding: 15,
        alignSelf: 'flex-start',
        ...containerStyle,
      }}>
      <Text
        style={{
          color: variantColors[variant].textColor,
          fontSize: 18,
          fontWeight: '700',
          ...textStyle,
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
