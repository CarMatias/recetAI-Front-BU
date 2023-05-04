import {Text as RNText, TextProps} from 'react-native';
import React from 'react';

type Props = {
  title?: string;
  variant?: 'Light' | 'Regular' | 'Medium' | 'SemiBold' | 'Bold';
} & TextProps;

const Text = ({style, variant = 'Medium', title, ...rest}: Props) => {
  return (
    <RNText style={{fontFamily: `Quicksand-${variant}`, ...style}} {...rest}>
      {title ?? rest.children}
    </RNText>
  );
};

export default Text;
