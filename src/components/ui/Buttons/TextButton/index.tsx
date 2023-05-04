import React from 'react';
import {StyleProp} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import colors from '../../../../assets/colors';
import Text from '../../Text';

type Props = {
  text: string;
  textStyle?: StyleProp<Text>;
} & React.ComponentProps<typeof TouchableOpacity>;

export default function TextButton({text, textStyle, ...rest}: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Text
        style={{
          fontSize: 16,
          color: colors.primary,
          ...textStyle,
        }}
        title={text}
        variant="Bold"
      />
    </TouchableOpacity>
  );
}
