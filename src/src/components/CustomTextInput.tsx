import React, { useState } from 'react';
import { Image, type ImageSourcePropType, type KeyboardTypeOptions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as variables from '../constants/variables';
import { ic_eye } from '../constants/assets';
import ButtonPrimary from './ButtonPrimary';

interface Props {
  onChangeText?(text: string): any;
  onPress?(): any;
  hideTitle?: boolean;
  showConfirmButton?: boolean;
  title?: string;
  placeHolder?: string;
  imgStart?: ImageSourcePropType;
  obfuscate?: boolean;
  validationText?: any;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
  value?: string;
  editable?: boolean;
  onPressC?(): any;
}

const CustomTextInput = (props: Props) => {
  const {
    onChangeText,
    onPress,
    onPressC,
    showConfirmButton,
    hideTitle,
    title = 'title',
    placeHolder,
    imgStart = null,
    obfuscate,
    validationText,
    keyboardType,
    maxLength,
    multiline,
    value,
    editable = true,
  } = props;

  const [hide, setHide] = useState(false);
  const [closeButton, setCloseButton] = useState(false);

  return (
    <View style={{ paddingVertical: variables.responsiveHeight(1), }}>
      {!hideTitle ?
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            paddingBottom: variables.responsiveHeight(0.8),
            color: 'black'
          }}
        >
          {title}
        </Text> : null}

      <View style={{ flexDirection: showConfirmButton ? 'row' : 'column' }}>
        {
          !editable ?
            <TouchableOpacity
              style={{ ...variables.globalStyle.textInputContainer, height: variables.responsiveHeight(7) }}
              onPress={onPressC}
              activeOpacity={0.8}
            >
              <Text
                style={{
                  ...variables.globalStyle.textInput,
                  color: 'black'
                }}
              >{value}</Text>
            </TouchableOpacity>
            :
            <View style={variables.globalStyle.textInputContainer}>
              {imgStart !== null ?
                <Image
                  source={imgStart}
                  style={variables.globalStyle.iconStyle}
                  resizeMode='contain'
                /> : null}
              <TextInput
                style={{
                  ...variables.globalStyle.textInput,
                  color: 'black',
                }}
                placeholder={placeHolder ?? title}
                placeholderTextColor={'darkgray'}
                secureTextEntry={obfuscate ? !hide : hide}
                keyboardType={keyboardType}
                onChangeText={t => onChangeText?.(t)}
                maxLength={maxLength}
                value={value}
                editable={editable}

                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
              />

              {!obfuscate ? null :
                <TouchableOpacity onPress={() => setHide(!hide)}>
                  <Image
                    source={ic_eye}
                    style={{ ...variables.globalStyle.iconStyle, marginStart: 0, marginHorizontal: 10 }}
                  />
                </TouchableOpacity>}
            </View>
        }



        {
          !showConfirmButton ? null :
            closeButton ? null :
              <ButtonPrimary
                width={variables.responsiveWidth(22)}
                marginVertical={0}
                marginStart={10}
                borderRadius={10}
                height={variables.responsiveHeight(6)}
                title='Benar'
                onPress={() => {
                  setCloseButton(!closeButton);
                  onPress?.()
                }}
              />
        }

      </View>

      {
        !validationText ? null :
          <Text style={{ color: 'red' }}>
            {validationText}
          </Text>
      }
    </View>
  );
};

export default CustomTextInput;
