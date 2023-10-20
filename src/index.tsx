import React, { useContext, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, View } from 'react-native';
import AppStack from './src/router/router';
import * as variables from './src/constants/variables';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import { baseUrl } from './src/constants/baseUrl';
import SignUpProvider, { SignUpContext } from './src/context/SignUpContext';
// import { useRoute } from '@react-navigation/native';
import { encodeAuth } from './src/util/textutil';
import type { IDataOCR } from './src/@types/userdata';

export enum SkorkuType {
  ekyc = "ekyc",
  lite = "lite",
}

export interface ISkorkuSDK {
  sdkKey: string,
  secretKey: string,
  skorkuKey: string,
  skorkuSecret: string,
  dataOcr?: IDataOCR,
  skorkuType: SkorkuType,
  onExited(v: boolean): any,
}

// const SkorkuLivenessSDK: React.FC = () => {
export function SkorkuLivenessSDK(props: ISkorkuSDK): JSX.Element {
  // const route = useRoute();
  // const {
  //   sdkKey,
  //   secretKey,
  //   skorkuKey,
  //   skorkuSecret,
  //   dataOcr,
  //   skorkuType,
  //   onExited
  // } = route.params as ISkorkuSDK;
  const {
    sdkKey,
    secretKey,
    skorkuKey,
    skorkuSecret,
    dataOcr,
    skorkuType,
    onExited
  } = props;

  useEffect(() => {
    (async () => {
      await EncryptedStorage.setItem("sdkKey", sdkKey);
      await EncryptedStorage.setItem("secretKey", secretKey);
      await EncryptedStorage.setItem("skorkuType", skorkuType);
      if (skorkuType == SkorkuType.lite) {
        let data = JSON.stringify(dataOcr)
        await EncryptedStorage.setItem("dataOcr", data);
      }

      let encodedAuth = encodeAuth(`${skorkuKey}:${skorkuSecret}`)
      axios.defaults.headers.post['sdk-auth'] = encodedAuth;
      axios.defaults.baseURL = baseUrl;
      axios.defaults.timeout = 60000
      console.log('init', encodedAuth, sdkKey, secretKey, skorkuKey, skorkuSecret)
    })();

  }, []);

  return (
    <>
      <SignUpProvider>
        <App
          onExited={onExited}
        />
        <SkorkuStack />
      </SignUpProvider>
    </>
  );
};

interface AppProps {
  onExited(v: boolean): any;
}

export function App(props: AppProps): JSX.Element {
  const {
    onExited,
  } = props;

  const cRegister = useContext(SignUpContext);

  useEffect(() => {
    onExited!(cRegister?.data.is_exited ?? false)
  }, [cRegister?.data.is_exited])

  return (
    <View />
  );
}

export function SkorkuStack(): JSX.Element {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <StatusBar
        backgroundColor={variables.colors.primary}
      />
      <AppStack />
    </KeyboardAvoidingView>
  )
}

export default SkorkuLivenessSDK;