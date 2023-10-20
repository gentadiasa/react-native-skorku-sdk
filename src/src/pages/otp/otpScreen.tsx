import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import Loader from '../../components/Loader';
import { postOTP, verifyOTP } from '../../service/signUpService';
import { SignUpContext } from '../../context/SignUpContext';
import {
    CodeField,
    Cursor,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import EncryptedStorage from 'react-native-encrypted-storage';
import { SkorkuType } from "../../../index";


const OTPScreen: React.FC = () => {

    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [loading, setLoading] = useState(false);

    const CELL_COUNT = 6;

    const [value, setValue] = useState('');
    // const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    async function submit() {
        try {
            setLoading(true)
            const resp = await verifyOTP(data.no_hp, value)
            if (resp) {
                cRegister?.setData({ token: resp['token'], id_user: resp['id'], package: resp['package'] })
                let skorkuType = await EncryptedStorage.getItem("skorkuType") ?? '';
                if (skorkuType == SkorkuType.ekyc) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'PhotoEktp' }],
                    });
                } else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'LivenessIntro' }],
                    });
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={variables.globalContainer}>
            <Header title='Verifikasi OTP' />

            {loading && < Loader />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={{ ...variables.globalStyle.textStyle, marginTop: variables.responsiveHeight(5), fontWeight: '300' }}>
                    Kami telah mengirim OTP melalui
                </Text>
                <Text style={{ ...variables.globalStyle.textStyle, fontWeight: 'bold' }}>
                    {data.no_hp} / {data.email}
                </Text>

                <CodeField
                    // ref={ref}
                    {...props}
                    // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                    value={value}
                    onChangeText={setValue}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({ index, symbol, isFocused }) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                />

                <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center', marginBottom: 20 }}>
                    <Text >
                        Belum menerima OTP?
                    </Text>
                    <TouchableOpacity
                        onPress={() => postOTP(data.no_hp, data.id_jns_otp)}
                    >
                        <Text style={{ color: '#25D366', fontWeight: '600', marginLeft: 5 }}>
                            Kirim Ulang
                        </Text>
                    </TouchableOpacity>
                </View>

                <ButtonPrimary
                    title='Selanjutnya'
                    enabled={value.length >= 6}
                    onPress={submit}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    codeFieldRoot: {
        marginTop: variables.responsiveHeight(5),
        marginBottom: variables.responsiveHeight(2.5),
    },
    cell: {
        width: variables.responsiveHeight(6),
        height: variables.responsiveHeight(6),
        lineHeight: variables.responsiveHeight(5),
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: variables.colors.primary2,
        backgroundColor: variables.colors.primary2,
        textAlign: 'center',
    },
    focusCell: {
        borderColor: variables.colors.primary,
    },
});

export default OTPScreen