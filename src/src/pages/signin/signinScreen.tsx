import React, { useContext, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import CustomTextInput from '../../components/CustomTextInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import { postOTP } from '../../service/signUpService';
import { type RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { signIn } from '../../service/signInService';
import Loader from '../../components/Loader';
import { SignUpContext } from '../../context/SignUpContext';

const SigninScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);

    const [loading, setLoading] = useState(false)
    const [nohp, setNohp] = useState('')
    const [email, setEmail] = useState('')
    const [otp, setOTP] = useState('')
    const [selectedId, setSelectedId] = useState('');

    async function submit() {
        try {
            setLoading(true)
            let res = await signIn(nohp, otp, email)
            if (res) {
                let sh: string = res['sh'].toUpperCase();
                cRegister?.setData({
                    status_hit: sh,
                    token: res['token'],
                    id_user: res['id'],
                    name: res['name']
                })

                if (sh == 'SH') {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'SingleHit' }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'NotSingleHit' }],
                    });
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'SMS',
            value: 'sms',
            color: variables.colors.primary
        },
        {
            id: '2',
            label: 'Email',
            value: 'email',
            color: variables.colors.primary
        },
        {
            id: '3',
            label: 'Whats App',
            value: 'Whats App',
            color: variables.colors.primary
        }
    ]), []);

    return (
        <SafeAreaView style={variables.globalContainer}>
            {loading && <Loader />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={assets.logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10, color: 'black' }}
                >
                    SIGN IN
                </Text>

                <CustomTextInput
                    title='No. HP'
                    imgStart={assets.ic_phone}
                    keyboardType='phone-pad'
                    onChangeText={setNohp}
                />

                <CustomTextInput
                    title='Email'
                    imgStart={assets.ic_mail}
                    keyboardType='email-address'
                    onChangeText={setEmail}
                />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CustomTextInput
                        title='OTP'
                        imgStart={assets.ic_lock}
                        keyboardType='phone-pad'
                        onChangeText={setOTP}
                        maxLength={6}
                    />

                    <View style={{ margin: 20, height: 7 }}>
                        <ButtonPrimary
                            width={variables.responsiveWidth(30)} marginVertical={0}
                            title='Get OTP'
                            enabled={(nohp.length > 5 || email != '') && selectedId != ''}
                            onPress={() => postOTP(nohp, selectedId)}
                        // onPress={() => console.log(nohp, selectedId)}
                        />
                    </View>
                </View>
                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={(v) => setSelectedId(v)}
                    selectedId={selectedId}
                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                />



                <View style={{ height: variables.responsiveHeight(2) }} />
                <ButtonPrimary
                    title='Lanjutkan'
                    onPress={submit}
                    // onPress={() => console.log(nohp, selectedId)}
                    enabled={otp.length == 6 && email != ''}
                />

                <TouchableOpacity
                    onPress={navigation.goBack}
                >
                    <Text style={{ color: '#25D366', fontWeight: '600', marginLeft: 5, alignSelf: 'center' }}>
                        Kembali
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    logo: {
        marginTop: variables.responsiveHeight(12),
        marginBottom: variables.responsiveHeight(5),
        width: variables.responsiveHeight(15),
        height: variables.responsiveHeight(15),
        alignSelf: 'center',
    },
})

export default SigninScreen