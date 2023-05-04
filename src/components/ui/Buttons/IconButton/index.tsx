import {Icon} from '@rneui/themed';
import React from 'react';
import {TouchableOpacity} from 'react-native';

type Props = {
  name: string;
  type:
    | 'material'
    | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'antdesign'
    | 'font-awesome-5'
    | 'feather'
    | 'fontisto'
    | 'material-icons';
  color?: string;
  size?: number;
  backgroundColor?: string;
} & React.ComponentProps<typeof TouchableOpacity>;

export default function IconButton({
  name,
  type,
  backgroundColor,
  size,
  color,
  ...rest
}: Props) {
  return (
    <TouchableOpacity {...rest}>
      <Icon
        name={name}
        type={type}
        backgroundColor={backgroundColor}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
}
