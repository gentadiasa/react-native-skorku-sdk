import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigation } from '../../router/router';

const UploadEktpSuccessScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                title='Data E-KTP'
                backgroundColor={variables.colors.primary}
                contentColor='white'
                left={variables.responsiveWidth(4)}
                hideIconBack
            />
            <View style={variables.globalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{ height: variables.spaceVertical.normal }} />
                    <ImageBackground
                        source={assets.ektpGraphic}
                        style={variables.globalStyle.ektpGraphicStyle}
                    />

                    <Image
                        source={assets.identityChecklist}
                        style={styles.imageLogo}
                    />

                    <Text style={styles.titleStyle}>
                        Kartu Identitas Berhasil Diunggah
                    </Text>

                    <ButtonPrimary
                        title='Selanjutnya'
                        onPress={() => navigation.navigate('LivenessIntro')}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        ...variables.globalStyle.imageLogo,
        marginTop: variables.responsiveHeight(3),
        height: variables.responsiveHeight(12),
        width: variables.responsiveHeight(12)
    },
    titleStyle: {
        ...variables.globalStyle.titleStyle,
        color: 'black',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: variables.responsiveHeight(5),
        marginBottom: variables.responsiveHeight(1),
    }
})

export default UploadEktpSuccessScreen