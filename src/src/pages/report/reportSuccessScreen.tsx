import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { SignUpContext } from '../../context/SignUpContext';


const ReportSuccessScreen: React.FC = () => {

    const cRegister = useContext(SignUpContext);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title='SKORKU'
                backgroundColor={variables.colors.primary}
                contentColor='white'
                left={variables.responsiveWidth(4)}
                hideIconBack
            />

            <View style={variables.globalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        position: 'relative',
                        justifyContent: 'center',
                        height: variables.deviceHeight - variables.responsiveHeight(13),
                    }}>
                        <Image
                            source={assets.identityChecklist}
                            style={styles.imageLogo}
                        />
                        <Text style={variables.globalStyle.textStyle}>
                            Laporan Kredit & Skor kamu sudah kami kirimkan ke email.
                            Mohon dicek di Inbox, jika tidak ditemukan mohon dicek folder Spam.{'\n\n'}
                            Silahkan menandai email tersebut sebagai Non/Bukan Spam agar pengiriman email berikutnya dapat diterima pada Inbox.{'\n\n'}
                            Terima kasih
                        </Text>
                        <ButtonPrimary
                            title='Keluar'
                            marginVertical={variables.responsiveHeight(8)}
                            onPress={() => cRegister?.setData({ is_exited: true })}
                        />

                    </View>
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
    imageLogo: {
        ...variables.globalStyle.imageLogo,
        height: variables.responsiveHeight(20),
        width: variables.responsiveHeight(20),
        marginTop: variables.responsiveHeight(3),
        marginBottom: variables.responsiveHeight(5),
    },
})

export default ReportSuccessScreen