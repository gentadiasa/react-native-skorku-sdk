import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import CustomTextInput from '../../components/CustomTextInput';
import CheckBox from '@react-native-community/checkbox';
import { SignUpContext } from '../../context/SignUpContext';
import { formatBOD2 } from '../../util/textutil';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Loader from '../../components/Loader';
import { submitOCR } from '../../service/ocrService';

const DataEktpScreen: React.FC = () => {

    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!
    const data_ocr = data.ocr_data

    const [showName, setshowName] = useState(false);
    const [showDate, setshowDate] = useState(false);
    const [showPOB, setshowPOB] = useState(false);
    const [showGender, setshowGender] = useState(false);
    const [showBlood, setshowBlood] = useState(false);
    const [showReligion, setshowReligion] = useState(false);
    const [showAddress, setshowAddress] = useState(false);
    const [showCheckBox, setshowCheckBox] = useState(false);

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [tglLahir, setTglLahir] = useState('');
    const [date, setDate] = useState(new Date());

    const [loading, setLoading] = useState(false);

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
        let res = date.toLocaleDateString('sv')
        setTglLahir(formatBOD2(res))
        setDate(new Date(res))
        cRegister?.setData({ ocr_data: { ...data_ocr, dob: res } })
    };

    useEffect(() => {
        (async () => {
            setTglLahir(formatBOD2(data_ocr?.dob!))
            setDate(new Date(data_ocr?.dob!))
        })();
    }, []);

    const submit = async () => {
        try {
            setLoading(true)
            let response = await submitOCR(data)
            if (response) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'UploadEktpSuccess' }],
                });
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    function formSection() {
        return (
            <>
                <CustomTextInput
                    title='Nomor KTP'
                    showConfirmButton
                    onPress={() => setshowName(true)}
                    value={data_ocr?.nik}
                    onChangeText={(v) => cRegister?.setData({ ocr_data: { ...data_ocr, nik: v } })}
                />

                {showName && <CustomTextInput
                    showConfirmButton
                    title='Nama sesuai E-KTP'
                    onPress={() => setshowDate(true)}
                    value={data_ocr?.name}
                    onChangeText={(v) => cRegister?.setData({ ocr_data: { ...data_ocr, name: v } })}
                />}

                {showDate && <CustomTextInput
                    onPress={() => setshowPOB(true)}
                    showConfirmButton
                    title='Tanggal Lahir (DD-MM-YYYY)'
                    value={tglLahir}
                    editable={false}
                    onPressC={() => setDatePickerVisibility(!isDatePickerVisible)}
                />}

                {showPOB && <CustomTextInput
                    onPress={() => setshowGender(true)}
                    showConfirmButton
                    title='Tempat Lahir'
                    value={data_ocr?.pob}
                    onChangeText={(v) => cRegister?.setData({ ocr_data: { ...data_ocr, pob: v } })}
                />}

                {showGender && <CustomTextInput
                    onPress={() => setshowBlood(true)}
                    showConfirmButton
                    title='Jenis Kelamin'
                    value={data_ocr?.gender}
                    onChangeText={(v) => cRegister?.setData({ ocr_data: { ...data_ocr, gender: v } })}
                />}

                {showBlood && <CustomTextInput
                    onPress={() => setshowReligion(true)}
                    showConfirmButton
                    title='Golongan Darah'
                    value={data_ocr?.blood_type == '' ? '-' : data_ocr?.blood_type}
                    onChangeText={(v) => cRegister?.setData({ ocr_data: { ...data_ocr, blood_type: v } })}
                />}

                {showReligion && <CustomTextInput
                    onPress={() => setshowAddress(true)}
                    showConfirmButton
                    title='Agama'
                    value={data_ocr?.religion}
                    onChangeText={(v) => cRegister?.setData({ ocr_data: { ...data_ocr, religion: v } })}
                />}

                {showAddress && <CustomTextInput
                    onPress={() => setshowCheckBox(true)}
                    showConfirmButton
                    title='Alamat'
                    multiline
                    value={data_ocr?.address}
                    onChangeText={(v) => cRegister?.setData({ ocr_data: { ...data_ocr, address: v } })}
                />}

                {showCheckBox && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                    <Text>Data KTP sudah benar</Text>
                </View>}
            </>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title='Data E-KTP'
                backgroundColor={variables.colors.primary}
                contentColor='white'
                left={variables.responsiveWidth(4)}
                hideIconBack
            />
            <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={date}
            />
            {loading && <Loader />}
            <View style={variables.globalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ height: variables.spaceVertical.normal }} />
                    <ImageBackground
                        // source={assets.ektpGraphic}
                        source={{ uri: data.ektp_data?.path }}
                        style={variables.globalStyle.ektpGraphicStyle}
                    />

                    <Text style={styles.titleStyle}>
                        Pastikan informasi E-KTP kamu sudah benar
                    </Text>

                    {formSection()}

                    <ButtonPrimary
                        title='Selanjutnya'
                        enabled={toggleCheckBox}
                        onPress={submit}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textContainer: {
        color: 'black',
        fontWeight: '400',
        marginHorizontal: variables.responsiveWidth(3),
        marginVertical: variables.responsiveHeight(3),
        fontSize: 15,
        textAlign: 'justify'
    },
    titleStyle: {
        ...variables.globalStyle.titleStyle,
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: variables.responsiveHeight(5),
        marginBottom: variables.responsiveHeight(1),
    }
})

export default DataEktpScreen