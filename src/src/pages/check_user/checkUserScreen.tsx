import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import CustomTextInput from '../../components/CustomTextInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import { checkNIK } from '../../service/signInService';
import Loader from '../../components/Loader';
import { showAlert } from '../../components/showAlert';
import Header from '../../components/Header';

const CheckUserScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();

    const [loading, setLoading] = useState(false)
    const [nik, setNik] = useState('')

    useEffect(() => {

    }, []);

    async function submit() {
        try {
            setLoading(true)
            let res = await checkNIK(nik)
            setLoading(false)
            if (res['is_exist'] == 1) {
                navigation.navigate('Signin');
            } else {
                showAlert('Info', 'NIK belum terdaftar')
                navigation.navigate('Signup');
            }
        } catch (error) {
            setLoading(false)
        }

    }

    return (
        <SafeAreaView style={variables.globalContainer}>
            {loading && <Loader />}
            <Header title='' />
            <ScrollView>
                <Image
                    source={assets.logo}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <CustomTextInput
                    title='NIK'
                    keyboardType='number-pad'
                    onChangeText={setNik}
                />

                <ButtonPrimary
                    title='Submit'
                    onPress={submit}
                // onPress={() => navigation.navigate('LivenessDone')}
                />

                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Text >
                        Belum Mempunyai Akun?
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={{ color: '#25D366', fontWeight: '600', marginLeft: 5 }}>
                            Daftar Disini
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginVertical: variables.responsiveHeight(12),
        width: variables.responsiveHeight(15),
        height: variables.responsiveHeight(15),
        alignSelf: 'center',
    },
})

export default CheckUserScreen