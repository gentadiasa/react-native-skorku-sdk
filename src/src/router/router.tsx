import { type NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "../pages/splash/splash";
import CheckUserScreen from '../pages/check_user/checkUserScreen';
import SigninScreen from "../pages/signin/signinScreen";
import SignUpScreen from "../pages/signup/signupScreen";
import PernyataanDataScreen from "../pages/signup/pernyataanDataScreen";
import PhotoEktpScreen from "../pages/photo_ektp/photoEktpScreen";
import DataEktpScreen from "../pages/data_ektp/dataEktpScreen";
import UploadEktpSuccessScreen from "../pages/data_ektp/uploadEktpSuccessScreen";
import LivenessIntroScreen from "../pages/liveness/livenessIntroScreen";
import LivenessDoneScreen from "../pages/liveness/livenessDoneScreen";
import OTPScreen from "../pages/otp/otpScreen";
import SingleHitScreen from "../pages/report/singleHitScreen";
import NotSingleHitScreen from "../pages/report/notSingleHitScreen";
import ReportSuccessScreen from "../pages/report/reportSuccessScreen";
import React from "react";

export type ScreenNames = [
  "Splash", "CheckUser", "Signin", "Signup", "PernyataanData", "OTP",
  "PhotoEktp", "DataEktp", "UploadEktpSuccess",
  "LivenessIntro", "LivenessDone",
  "SingleHit", "NotSingleHit", "ReportSuccess"
]
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Splash' component={SplashScreen} />
      <Stack.Screen name="CheckUser" component={CheckUserScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignUpScreen} />
      <Stack.Screen name="PernyataanData" component={PernyataanDataScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="PhotoEktp" component={PhotoEktpScreen} />
      <Stack.Screen name="DataEktp" component={DataEktpScreen} />
      <Stack.Screen name="UploadEktpSuccess" component={UploadEktpSuccessScreen} />
      <Stack.Screen name="LivenessIntro" component={LivenessIntroScreen} />
      <Stack.Screen name="LivenessDone" component={LivenessDoneScreen} />
      <Stack.Screen name="SingleHit" component={SingleHitScreen} />
      <Stack.Screen name="NotSingleHit" component={NotSingleHitScreen} />
      <Stack.Screen name="ReportSuccess" component={ReportSuccessScreen} />
    </Stack.Navigator>
  );
}

export default AppStack