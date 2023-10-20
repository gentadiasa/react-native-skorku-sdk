import React, { useContext, useEffect, useState } from 'react';
import { Image, NativeModules, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigation } from '../../router/router';
import { getLivenessLicense, submitLiveness } from '../../service/ocrService';
import { SignUpContext } from '../../context/SignUpContext';
import { showAlert } from '../../components/showAlert';
import EncryptedStorage from 'react-native-encrypted-storage';

const LivenessIntroScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [livenessReady, setLivenessReady] = useState(false)

    useEffect(() => {
        (async () => {
            let res = await getLivenessLicense(data)
            initLiveness(res['license'])
        })();
    }, [])

    async function initLiveness(license: string) {

        let sdk_key = await EncryptedStorage.getItem('sdkKey')
        let secret_key = await EncryptedStorage.getItem('secretKey');
        console.log(sdk_key, secret_key)
        // The last boolean value represents whether you are opening a Global service or not. If so, it is set to true, otherwise it is false.
        NativeModules.LivenessModule.initSDKByKey(sdk_key, secret_key, "Indonesia", true);
        // NativeModules.LivenessModule.initSDKByLicense('Indonesia', false);

        NativeModules.LivenessModule.setDetectionLevel('NORMAL');
        NativeModules.LivenessModule.setActionSequence(true, ["MOUTH", "BLINK", "POS_YAW",]);
        NativeModules.LivenessModule.setActionTimeoutMills(30000);
        NativeModules.LivenessModule.setLicenseAndCheck(license, (successCode: any) => {
            // license check success,you can start liveness detection.
            console.log(successCode)
            setLivenessReady(true)
        }, (errorCode: any) => {
            console.log(errorCode)
            showAlert('Error', 'license error')
            // license is not available, expired/wrong format/appId not match
        })
    }

    async function livenessStart() {
        await NativeModules.LivenessModule.startLiveness(
            async (successJsonData: any) => {
                console.log(successJsonData)
                let livenessId = successJsonData['livenessId']
                cRegister?.setData({ liveness_id: livenessId })
                let res = await submitLiveness(data, livenessId)
                if (res) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LivenessDone' }],
                    });
                }
            },
            async (failedJsonData: any) => {
                console.log(failedJsonData)
                showAlert('Error', failedJsonData['errorMsg'])
            }
        )
    }

    return (
        <SafeAreaView style={variables.globalContainer}>
            <Header title='' />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={assets.livenessTestGraphic}
                        style={styles.imageLogo}
                    />

                    <Text style={variables.globalStyle.header}>
                        Tes Liveness
                    </Text>

                    <Text style={variables.globalStyle.textStyle}>
                        {'\n'}Silahkan lakukan intruksi{'\n'}
                    </Text>

                    <ButtonPrimary
                        title='Selanjutnya'
                        enabled={livenessReady}
                        onPress={livenessStart}
                    // onPress={() => navigation.navigate('LivenessDone')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        ...variables.globalStyle.imageLogo,
        marginTop: variables.responsiveHeight(3),
        height: variables.responsiveHeight(30),
        width: variables.responsiveHeight(30)
    },
})

export default LivenessIntroScreen