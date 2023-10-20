import { NavigationContainer, type NavigationProp, } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import React from "react";
import One from "./One";
import Two from "./Two";
import Three from "./Three";
import { SkorkuStack } from "react-native-skorku-sdk";

export type ScreenNames = [
    "One", "Two", "Three", "SkorkuSDK",
]
export type RootStackParamList = Record<ScreenNames[number], undefined>;
// export type RootStackParamList = {
//     One: undefined;
//     Two: undefined;
//     Three: {
//         someProps?: string,
//         exCall(): any
//     };
// };
export type StackNavigation = NavigationProp<RootStackParamList>;

// const Stack = createNativeStackNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator();

function AppRouter() {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="One"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name='One' component={One} />
                <Stack.Screen name="Two" component={Two} />
                <Stack.Screen name="Three" component={Three} />
                <Stack.Screen
                    name="SkorkuSDK"
                    component={SkorkuStack}
                // initialParams={{
                //     sdkKey: 'aa',
                //     secretKey: 'bb',
                //     skorkuKey: 'cc',
                //     skorkuSecret: 'dd',
                //     onExited: (v) => { console.log('aaaa', v) }
                // }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppRouter