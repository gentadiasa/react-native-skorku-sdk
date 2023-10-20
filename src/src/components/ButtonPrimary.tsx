import React from 'react';
import { type DimensionValue, Text, TouchableOpacity, View } from 'react-native';
import * as variables from '../constants/variables';

interface Props {
  title?: string;
  placeHolder?: string;
  width?: DimensionValue;
  marginVertical?: DimensionValue;
  marginStart?: DimensionValue;
  onPress?(): any;
  enabled?: boolean;
  height?: number;
  borderRadius?: number;
}

const ButtonPrimary = (props: Props) => {

  const {
    title = 'Button',
    onPress,
    width,
    marginVertical,
    marginStart,
    height = variables.responsiveHeight(5.5),
    borderRadius = 30,
    enabled = true
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={enabled ? 0.8 : 1}
      onPress={enabled ? onPress : () => { }}
      style={{ borderRadius: borderRadius }}
    >
      <View
        style={{
          backgroundColor: enabled ? variables.colors.primary : 'lightgray',
          height: height,
          width: width ?? variables.responsiveWidth(75),
          marginVertical: marginVertical ?? variables.responsiveHeight(3),
          marginStart: marginStart,
          borderRadius: borderRadius,
          alignSelf: 'center',
          justifyContent: 'center'
        }}
      >
        <Text
          style={{ alignSelf: 'center', color: 'white', fontSize: 15, fontWeight: '600' }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default ButtonPrimary;
