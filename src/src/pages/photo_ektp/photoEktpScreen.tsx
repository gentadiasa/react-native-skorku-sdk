import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';
import { useCameraPermission } from 'react-native-vision-camera'
import ImageCropPicker from 'react-native-image-crop-picker';
import { formatBOD } from '../../util/textutil';
import { SignUpContext } from '../../context/SignUpContext';
import { postOCR } from '../../service/ocrService';
import Loader from '../../components/Loader';
import type { DataOCR } from '../../@types/userdata';

const PhotoEktpScreen: React.FC = () => {

    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const { requestPermission } = useCameraPermission()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        (async () => {
            console.log(data)
        })();
    }, []);

    async function takePhoto() {
        await requestPermission();

        // ImageCropPicker.openPicker({
        ImageCropPicker.openCamera({
            cropping: true,
            freeStyleCropEnabled: true,
            includeBase64: true,
        }).then(img => {
            // let image = img as any
            // let base64image = image['data']
            cRegister?.setData({ ektp_data: img })
        });
    }

    async function submit() {

        try {
            setLoading(true)
            let response = await postOCR(data.id_user!, data.ektp_data!, data.token!)
            setLoading(false)
            if (response) {
                let dataa: DataOCR = {
                    nik: response['nik'],
                    name: response['name'],
                    blood_type: response['blood_type'] ?? '',
                    religion: response['religion'],
                    gender: response['gender'],
                    dob: formatBOD(response['dob']),
                    pob: response['pob'],
                    province: response['province'],
                    city: response['city'],
                    district: response['district'],
                    village: response['village'],
                    rtrw: response['rtrw'],
                    occupation: response['occupation'],
                    nationality: response['nationality'],
                    marital: response['marital'],
                    address: response['address'],
                };
                cRegister?.setData({
                    ocr_data: dataa
                })
                // navigation.navigate('DataEktp')
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'DataEktp' }],
                });
            }
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={variables.globalContainer}>
            <Header title='Foto KTP' hideIconBack />
            <Image
                source={assets.ktpGraphic}
                style={styles.ktpImage}
            />
            {loading && <Loader />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <View
                        style={styles.boxContainer}
                    >
                        {data.ektp_data ?
                            <Image
                                source={{ uri: data.ektp_data.path }}
                                style={{ width: variables.responsiveWidth(74), height: variables.responsiveHeight(22) }}
                            />
                            : <TouchableOpacity
                                style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                                onPress={takePhoto}
                            >
                                <Image
                                    source={assets.ic_camera}
                                    style={styles.icCamera}
                                />
                                <Text style={variables.globalStyle.textStyle}>Ambil Foto KTP</Text>
                            </TouchableOpacity>
                        }


                    </View>
                    <Text style={styles.titleStyle}>
                        FOTO E-KTP
                    </Text>
                    <Text style={variables.globalStyle.textStyle}>
                        Dokumen ini dibutuhkan untuk validasi identitas sesuai dengan peraturan OJK.
                    </Text>

                    <ButtonPrimary
                        title='Foto Ulang'
                        onPress={takePhoto}
                    />
                    <ButtonPrimary
                        title='Selanjutnya'
                        enabled={data.ektp_data !== undefined}
                        onPress={submit}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ktpImage: {
        position: 'absolute',
        alignSelf: 'center',
        top: variables.responsiveHeight(12),
        height: variables.responsiveHeight(25),
        resizeMode: 'contain',
    },
    boxContainer: {
        marginTop: variables.responsiveHeight(23),
        marginBottom: variables.responsiveHeight(3),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: variables.responsiveHeight(25),
        backgroundColor: '#E6E6E6',
        borderColor: 'darkgray',
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'dashed',
    },
    icCamera: {
        height: variables.responsiveHeight(8),
        marginBottom: 10,
        resizeMode: 'contain',
    },
    titleStyle: {
        color: variables.colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: variables.responsiveHeight(1),
    }
})

export default PhotoEktpScreen