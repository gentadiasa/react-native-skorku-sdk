# react-native-skorku-sdk

skorku sdk package for react native

## Package Installation

```sh
npm i react-native-skorku-sdk
```
#### Add these dependencies to your main package.json
```json
"dependencies": {
    // ...
    "@react-native-community/checkbox": "^0.5.16",
    "@react-native-community/datetimepicker": "^7.6.0",
    "@react-navigation/native": "^6.1.7",
    "@react-navigation/native-stack": "^6.9.13",
    "axios": "^1.5.0",
    "react-native-autoheight-webview": "^1.6.5",
    "react-native-confirmation-code-field": "^7.3.1",
    "react-native-device-info": "^10.11.0",
    "react-native-encrypted-storage": "^4.0.3",
    "react-native-fs": "^2.20.0",
    "react-native-image-crop-picker": "^0.40.0",
    "react-native-linear-gradient": "^2.8.3",
    "react-native-modal-datetime-picker": "^17.1.0",
    "react-native-radio-buttons-group": "^3.0.3",
    "react-native-safe-area-context": "^4.7.2",
    "react-native-screens": "^3.25.0",
    "react-native-vision-camera": "^3.1.0",
    "react-native-webview": "^13.6.0",
    "utf8": "^3.0.0"
},
```
#### then, run:
```sh
npm i
```


## Integrate The Liveness Module

##### 1. Download the corresponding sdk, unzip it and copy the liveness folder to the android directory, same level as the app folder.

- for react-native < 0.60.0 : https://prod-guardian-cv.oss-ap-southeast-5.aliyuncs.com/sdk/android/liveness/react-native/liveness-support.zip
- for react-native >= 0.60.0 : https://prod-guardian-cv.oss-ap-southeast-5.aliyuncs.com/sdk/android/liveness/react-native/liveness-androidx.zip



##### 2. Modify the **android/settings.gradle**

```gradle
// ...
include ':app', ':liveness'

```

##### 3. If u're using react-native >= 0.60.0, on **android/gradle.properties** please add this line:

```
android.enableJetifier=true
```

##### 4. Modify the **android/app/build.gradle** to add the library dependencies:
```java
...
android {
...
}
dependencies {
...
api project(':liveness') // <---- add this
}
```

##### 5. Add **LivenessReactPackage**
 - In the **android/app** directory, find the class that implements **ReactApplication** with the default name **MainApplication**, add **LivenessReactPackage**

- for react-native >= 0.60 :

```java
import ai.advance.liveness.sdk.rn.LivenessReactPackage; // <------- add this

public class MainApplication extends Application implements ReactApplication {

   // ...
    @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          packages.add(new LivenessReactPackage()); // <------- add this
          return packages;
        }
```

- for react-native >=0.29 :

```java
import ai.advance.liveness.sdk.rn.LivenessReactPackage; // <------- add this

public class MainApplication extends Application implements ReactApplication {

   // ...
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(), // <---- add comma
        new LivenessReactPackage() // <---------- add this
      );
    }
```

## Usage

##### 1. Import the component and configure your **NavigationContainer**:

```js
// ...
import SkorkuLivenessSDK, { ISkorkuSDK } from "react-native-skorku-sdk";

export type ScreenNames = [
    // ...
    "SkorkuSDK"
]

export type RootStackParamList = {
    // ...
    SkorkuSDK: ISkorkuSDK
};

export type StackNavigation = NavigationProp<RootStackParamList>;
const Stack = createNativeStackNavigator<RootStackParamList>();

function AppRouter() {

    return (
        <NavigationContainer>
            
            <Stack.Navigator>

                // ...
                <Stack.Screen name="SkorkuSDK" component={SkorkuLivenessSDK} />

            </Stack.Navigator>
            
        </NavigationContainer>
    );
}

export default AppRouter
```

#### 2. Navigate to the SkorkuSDK Component:
```js
navigation.navigate('SkorkuSDK', {
    sdkKey: 'yourSdkKey',
    secretKey: 'yourSecretKey',
    skorkuKey: 'yourSkorkuKey',
    skorkuSecret: 'yourSkorkuSecret',
    onExited: (v) => {
        if(v == true){
            navigation.goBack()
        }
    }
})
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
