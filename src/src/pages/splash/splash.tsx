import React, { useContext, useEffect } from 'react';
import {
  View,
  Image,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Text
} from 'react-native';

import * as variables from '../../constants/variables';
import * as assets from '../../constants/assets';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import { SignUpContext } from '../../context/SignUpContext';
import EncryptedStorage from 'react-native-encrypted-storage';
import type { IDataOCR } from '../../@types/userdata';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigation>();
  const cRegister = useContext(SignUpContext);

  useEffect(function () {
    (async () => {
      try {
        setTimeout(async () => {
          let data = await EncryptedStorage.getItem("dataOcr");
          let dataOcr: IDataOCR = JSON.parse(data ?? '')
          cRegister?.setData({ ocr_data: dataOcr })
          navigation.reset({
            index: 0,
            routes: [{ name: 'CheckUser' }],
          });
        }, 2500);
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'rgba(0, 0, 0, 0.3)'}
        translucent
      />

      <ImageBackground
        source={assets.batik1}
        style={styles.batik}
      >
        <LinearGradient
          colors={["#1DA83D", "#ffffff00"]}
          style={{ height: '100%', width: '100%' }}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
        ></LinearGradient>
      </ImageBackground>

      <Image
        source={assets.logoSplash}
        style={styles.logo}
        resizeMode="contain"
      />

      <Image
        source={assets.graphicSplash1}
        style={styles.graphicSplash}
        resizeMode="contain"
      />

      <View
        style={{
          position: 'absolute',
          bottom: variables.responsiveHeight(10),
          alignItems: 'center'
        }}
      >
        <Image
          source={assets.logoOjk}
          style={styles.ojk}
          resizeMode="contain"
        />
        <Text style={{ color: 'white' }}>
          KBIJ terdaftar dan diawasi oleh {'\n'} Otorisasi Jasa Keuangan (OJK)
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  statusBar: {
    opacity: 0.8,
    backgroundColor: "red",
  },
  container: {
    width: variables.deviceWidth,
    height: variables.deviceHeightScreen,
    backgroundColor: '#1DA83D',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  logo: {
    position: 'absolute',
    top: variables.responsiveHeight(20),
    width: variables.LOGO_SIZE,
    height: variables.LOGO_SIZE,
  },
  graphicSplash: {
    position: 'absolute',
    width: variables.deviceWidth,
  },
  ojk: {
    width: variables.responsiveHeight(10),
    height: variables.responsiveHeight(10),
  },
  batik: {
    position: 'absolute',
    top: 0,
    width: variables.deviceWidth,
    height: variables.responsiveHeight(25),
    opacity: 1
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
})

export default SplashScreen