import {View, Text} from 'react-native';
import React from 'react';
import colors from '../../../assets/colors';

type Props = {
  children: React.ReactNode;
} & React.ComponentProps<typeof View>;

const Container = ({children, style, ...rest}: Props) => {
  return (
    <View
      style={{padding: 20, backgroundColor: 'white', flex: 1, ...style}}
      {...rest}>
      {children}
    </View>
  );
};

export default Container;
