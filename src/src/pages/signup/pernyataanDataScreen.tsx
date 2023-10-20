import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import Loader from '../../components/Loader';
import { getConsent, postRegister } from '../../service/signUpService';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { SignUpContext } from '../../context/SignUpContext';

const PernyataanDataScreen: React.FC = () => {

    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [loading, setLoading] = useState(false);
    const [desc, setDesc] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const consent = await getConsent()
                setDesc(consent)
            } catch (error) {
                console.log(error)
            }
        })();
    }, [])

    async function submit() {
        try {
            setLoading(true)
            const response = await postRegister(data)
            setLoading(false)

            if (response) {
                navigation.navigate('OTP')
            }

        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={variables.globalContainer}>
            <Header title='Pernyataan Data' />

            {loading && < Loader />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <AutoHeightWebView
                    style={{ width: variables.deviceWidth / 1.2, marginVertical: variables.responsiveHeight(2) }}
                    source={{ html: desc }}
                    overScrollMode='never'
                />

                <ButtonPrimary
                    title='Selanjutnya'
                    onPress={submit}
                // onPress={() => navigation.navigate('OTP')}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default PernyataanDataScreen