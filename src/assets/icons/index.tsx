import React from 'react';
import MeatChicken from './MeatChicken';
import {SvgProps} from 'react-native-svg';

const icons = {
  MeatChicken: (props?: SvgProps) => <MeatChicken {...props} />,
};

type Props = {
  name: keyof typeof icons;
  svgProps?: SvgProps;
};

const CustomIcon = ({name, svgProps}: Props) => {
  return icons[name](svgProps);
};

export default CustomIcon;
