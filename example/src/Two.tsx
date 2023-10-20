import { useNavigation } from '@react-navigation/native';
import React from 'react';
import SkorkuLivenessSDK, { SkorkuType } from 'react-native-skorku-sdk';
import type { StackNavigation } from './router';

function Two(): JSX.Element {
  const navigation = useNavigation<StackNavigation>();

  return (
    <SkorkuLivenessSDK
      sdkKey={''}
      secretKey={''}
      skorkuKey={''}
      skorkuSecret={''}
      skorkuType={SkorkuType.lite}
      dataOcr={
        {
          nik: '',
          blood_type: '',
          religion: '',
          gender: '',
          dob: '',
          pob: '',
          province: '',
          city: '',
          district: '',
          village: '',
          rtrw: '',
          occupation: '',
          nationality: '',
          marital: '',
          address: '',
          ktp: '' // <--- base64ktp
        }
      }
      onExited={(v: boolean) => {
        console.log(v)
        navigation.goBack()
      }} />
  );
}

export default Two;
