import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import CustomTextInput from '../../components/CustomTextInput';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import Header from '../../components/Header';
import { type RadioButtonProps, RadioGroup } from 'react-native-radio-buttons-group';
import { SignUpContext, initialDataSignup } from '../../context/SignUpContext';
import { validateForm } from './validation/validationSignUp';

const SignUpScreen: React.FC = () => {

    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [selectedId, setSelectedId] = useState<string | any>();
    const [confPass, setconfPass] = useState('');
    const [confPin, setconfPin] = useState('');
    const [isValid, setValid] = useState(false);

    const validationPassExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    useEffect(() => {
        let valid = validateForm(
            data.name,
            data.email,
            data.no_hp,
            data.password,
            confPass,
            data.pin,
            confPin,
            data.id_jns_otp,
            validationPassExp,
        )
        setValid(valid)
        console.log(data)
    }, [data, confPass, confPin, selectedId]);

    function setId(v: string) {
        setSelectedId(v)
        cRegister?.setData({ id_jns_otp: v })
    }

    function submit() {
        // console.log(data)
        navigation.navigate('PernyataanData')
    }

    function formSection() {
        return (
            <>
                <CustomTextInput
                    title='Nama Lengkap'
                    imgStart={assets.ic_user}
                    onChangeText={v => cRegister?.setData({ ...data, name: v })}
                />
                <CustomTextInput
                    title='Email Pribadi'
                    imgStart={assets.ic_mail}
                    keyboardType='email-address'
                    onChangeText={v => cRegister?.setData({ email: v })}
                />
                <CustomTextInput
                    title='Nomor Telepon'
                    imgStart={assets.ic_phone}
                    keyboardType='phone-pad'
                    onChangeText={v => cRegister?.setData({ no_hp: v })}
                />
                <CustomTextInput
                    title='Kata Sandi'
                    imgStart={assets.ic_lock}
                    obfuscate
                    validationText={validationPassExp.test(data.password!) ? null : 'Kata sandi harus terdiri dari 8 karakter yang merupakan kombinasi huruf & angka'}
                    onChangeText={v => cRegister?.setData({ password: v })}
                />
                <CustomTextInput
                    title='Konfirmasi Kata Sandi'
                    imgStart={assets.ic_lock}
                    obfuscate
                    validationText={data.password == confPass ? null : 'Kata sandi belum sama'}
                    onChangeText={setconfPass}
                />
                <CustomTextInput
                    title='PIN'
                    maxLength={6}
                    keyboardType='decimal-pad'
                    imgStart={assets.ic_key}
                    obfuscate
                    validationText={data.pin?.length! >= 6 ? null : 'PIN harus 6 digit'}
                    onChangeText={v => cRegister?.setData({ pin: v })}
                />
                <CustomTextInput
                    title='Konfirmasi PIN'
                    maxLength={6}
                    keyboardType='decimal-pad'
                    imgStart={assets.ic_key}
                    obfuscate
                    validationText={data.pin == confPin ? null : 'PIN belum sama'}
                    onChangeText={setconfPin}
                />
                <View style={{ height: variables.responsiveHeight(2) }} />
            </>
        )
    }

    function bottomSection() {
        return (
            <>
                <Text style={{ color: 'black', fontWeight: '600', marginLeft: 5, marginBottom: 10, fontSize: 20 }}>
                    Pilih Metode OTP
                </Text>

                <Text style={[
                    variables.globalStyle.textStyle,
                    { marginLeft: 5, marginBottom: variables.responsiveHeight(3), fontSize: 12, width: '90%', textAlign: 'left' }
                ]}>
                    Saat ini verifikasi OTP menggunakan SMS hanya bisa digunakan oleh provider Telkomsel, XL, Indosat, dan Tri.
                    {`\n\n`}Jika kamu tidak menggunakan provider tersebut, silahkan pilih metode OTP menggunakan email.
                </Text>

                <RadioGroup
                    radioButtons={radioButtons}
                    onPress={(v) => setId(v)}
                    selectedId={selectedId}
                    containerStyle={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                />
                <ButtonPrimary
                    title='Daftar Akun'
                    onPress={submit}
                    enabled={isValid}
                />
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: '600', marginLeft: 5, alignSelf: 'center', marginBottom: variables.responsiveHeight(3) }}>
                        Sudah Punya Akun?
                    </Text>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                    // onPress={submit}
                    // onPress={() => cRegister?.setData({ is_exited: true })}
                    >
                        <Text style={{ color: '#25D366', fontWeight: '600', marginLeft: 5, alignSelf: 'center', marginBottom: variables.responsiveHeight(3) }}>
                            Masuk
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        )
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
            <Header
                title='Daftar Akun'
                onPress={() => {
                    navigation.goBack()
                    cRegister?.setData(initialDataSignup)
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>

                {formSection()}

                {bottomSection()}

            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen