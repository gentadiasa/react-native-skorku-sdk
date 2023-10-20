import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const deviceHeightScreen = Dimensions.get('screen').height;
const deviceWidthScreen = Dimensions.get('screen').width;
// responsive
const responsiveHeight = (h: number) => {
  return deviceHeight * (h / 100);
};
const responsiveWidth = (w: number) => {
  return deviceWidth * (w / 100);
};

const NAV_HEIGHT = responsiveHeight(7.6);

function isIphoneWithNotch() {
  const dimen = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTV &&
    (
      // dimen.height === 780 ||
      // dimen.width === 780 ||
      // dimen.height === 812 ||
      // dimen.width === 812 ||
      // dimen.height === 844 ||
      // dimen.width === 844 ||
      // dimen.height === 896 ||
      // dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

const NAV_BORDER_RADIUS = responsiveWidth(3.5);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

const LOGO_SIZE = responsiveHeight(20)

// marginHorizontal
const marginHorizontal = {
  large: responsiveWidth(12.8), // margin = 48
  normal: responsiveWidth(8.5), // margin = 32
  semiSmall: responsiveWidth(6.4), // margin = 24
  small: responsiveWidth(4.27), // margin = 16,
  verySmall: responsiveWidth(2.27), // margin = 16,
}

// margin or padding vertical
const spaceVertical = {
  large: responsiveHeight(7.19), // space = 48
  normal: responsiveHeight(4.8), // space = 32
  semiSmall: responsiveHeight(3.6), // space = 24
  small: responsiveHeight(2.4), // space = 16
  verySmall: responsiveHeight(1.4), // space = 16
}

// colors
const colors = {
  green: '#99ce66',
  red: '#cb0026',
  blue: 'rgb(59,89,152)',
  white: '#fff',
  black: '#121314',
  darkGray: 'rgb(74,74,74)',
  darkGrayd: 'rgba(74,74,74,0.2)',
  darkGrays: 'rgba(74,74,74,0.05)',
  gray: 'rgb(155,155,155)',
  lightGray: 'rgb(216,216,216)',
  dividerGray: '#f1f2f5',
  whiteTrans: 'rgba(999,999,999, 0.5)',
  primary: '#1DA83D',
  primary2: 'rgba(29, 168, 61, 0.2)'
};

// font family
const fontFamily = {
  regular: Platform.OS === 'ios' ? 'SanFranciscoDisplay-Regular' : 'SanRegular',
  medium: Platform.OS === 'ios' ? 'SanFranciscoDisplay-Medium' : 'SanMedium',
  semiBold: Platform.OS === 'ios' ? 'SanFranciscoDisplay-Semibold' : 'SanSemibold',
  bold: Platform.OS === 'ios' ? 'SanFranciscoDisplay-Bold' : 'SanBold',

  brownBold: 'Brown-Bold',
  brownLight: 'Brown-Light',
  brownRegular: 'Brown-Regular',
  brownThin: 'Brown-Thin',

  calibreThin: 'Calibre Thin',
  calibreLight: 'Calibre-Light',
  calibreMedium: 'Calibre-Medium',
  calibreRegular: 'Calibre-Regular',

  circularBlack: 'circular-black',
  circularBold: 'circular-bold',
  circularBook: 'circular-book',
  circularMedium: 'circular-medium',

  freightBold: 'FreightSans-Bold',
  freightBook: 'FreightSans-Book',
  freightMedium: 'FreightSans-Medium',

  helveticaLight: 'HelveticaNeue Light',
  helveticaMedium: 'HelveticaNeue Medium',
  helveticaThin: 'HelveticaNeue Thin',
  helvetica: 'HelveticaNeue',

  metropolisBold: 'Metropolis-Bold',
  metropolicLight: 'Metropolis-Light',
  metropolisMedium: 'Metropolis-Medium',
  metropolisRegular: 'Metropolis-Regular',
  metropolisSemiBold: 'Metropolis-SemiBold',
  metropolisThin: 'Metropolis-Thin',

  proximaBlack: 'Proxima-Nova-Alt-Black',
  proximaRegular: 'Proxima-Nova-Alt-Regular',
  proximaRegularBold: 'Proxima-Nova-Alt-Rg-Bold',
  proximaThinRegular: 'Proxima-Nova-Alt-Thin-Regular',
  proximaCnSemiBold: 'Proxima-Nova-Cn-Semibold',
  proximaSemiBold: 'Proxima-Nova-Semibold',
  proximaThin: 'Proxima-Nova-Thin',

  righteous: 'Righteous-Regular',

  robotoBold: 'Roboto-Bold',
  robotoLight: 'Roboto-Light',
  robotoMedium: 'Roboto-Medium',
  robotoRegular: 'Roboto-Regular',
  roboto: 'Roboto',
};

let fontSize = {
  extraVerySmall: 10,
  extraSmall: 12,
  small: 14,
  normal: 16,
  medium: 18,
  semiLarge: 20,
  large: 24,

  sizeTxt: 64,
  starIc: 18,
  tileHeader: 19,
  addIc: 22,
};

let lineHeight = {
  normal: 24,
  small: 16,
};

let borderRadius = {
  normal: 4,
  backNextBtn: 100,
};

const LARGE_DEVICE_SCALE = 1.3;

if (deviceWidth >= 768) {
  fontSize = {
    extraVerySmall: 10 * LARGE_DEVICE_SCALE,
    extraSmall: 12 * LARGE_DEVICE_SCALE,
    small: 14 * LARGE_DEVICE_SCALE,
    normal: 16 * LARGE_DEVICE_SCALE,
    medium: 18 * LARGE_DEVICE_SCALE,
    semiLarge: 20 * LARGE_DEVICE_SCALE,
    large: 24 * LARGE_DEVICE_SCALE,
    sizeTxt: 64 * LARGE_DEVICE_SCALE,
    starIc: 18 * LARGE_DEVICE_SCALE,
    tileHeader: 19 * LARGE_DEVICE_SCALE,
    addIc: 22 * LARGE_DEVICE_SCALE,
  };
  lineHeight = {
    normal: 24 * LARGE_DEVICE_SCALE,
    small: 16 * LARGE_DEVICE_SCALE,
  }
  borderRadius = {
    normal: 4 * LARGE_DEVICE_SCALE,
    backNextBtn: 100 * LARGE_DEVICE_SCALE,
  };
}

const globalStyle = StyleSheet.create({
  background: {
    width: deviceWidth,
    height: deviceHeight,
    position: 'absolute'
  },
  iconStyle: {
    marginStart: 10,
    width: responsiveHeight(3),
    height: responsiveHeight(3),
    resizeMode: 'contain'
  },
  imageLogo: {
    alignSelf: 'center',
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    // backgroundColor:'red'
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'MyriadPro-Regular',
    fontSize: responsiveHeight(2),
    // height: responsiveHeight(10),
    borderRadius: 8,
    backgroundColor: 'rgba(74,74,74,0.2)',
    width: '100%',
    // maxHeight: responsiveHeight(6),
  },
  textInput: {
    flex: 1,
    // maxHeight: responsiveHeight(6),
    marginHorizontal: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 25,
    color: colors.primary,
  },
  textStyle: {
    color: 'black',
    fontWeight: '500',
    fontSize: 15,
    textAlign: 'center'
  },
  titleStyle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  ektpGraphicStyle: {
    height: responsiveHeight(26),
    resizeMode: 'contain',
  },
})

const globalContainer = {
  flex: 1,
  backgroundColor: 'white',
  paddingHorizontal: responsiveWidth(6),
};

export {
  globalContainer,
  globalStyle,
  isIphoneWithNotch,
  responsiveHeight,
  responsiveWidth,
  LOGO_SIZE,
  marginHorizontal,
  spaceVertical,
  NAV_HEIGHT,
  NAV_BORDER_RADIUS,
  STATUSBAR_HEIGHT,
  deviceHeight,
  deviceWidth,
  deviceHeightScreen,
  deviceWidthScreen,
  colors,
  fontSize,
  fontFamily,
  lineHeight,
  borderRadius,
};
