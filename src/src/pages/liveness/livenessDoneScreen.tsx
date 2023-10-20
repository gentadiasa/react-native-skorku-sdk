import React, { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as assets from '../../constants/assets';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useNavigation } from '@react-navigation/native';
import { type StackNavigation } from '../../router/router';
import { getBid } from '../../service/creditService';
import { SignUpContext } from '../../context/SignUpContext';
import Loader from '../../components/Loader';

const LivenessDoneScreen: React.FC = () => {
    const navigation = useNavigation<StackNavigation>();
    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [loading, setLoading] = useState(false)

    async function submit() {
        try {
            setLoading(true)
            let res = await getBid(data)
            setLoading(false)
            if (res) {
                let sh: string = res['sh'].toUpperCase();
                cRegister?.setData({ status_hit: sh })

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
        } catch (error) {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={variables.globalContainer}>
            <Header title='' hideIconBack />
            {loading && <Loader />}
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={assets.identityChecklist}
                        style={styles.imageLogo}
                    />

                    <Text style={variables.globalStyle.textStyle}>
                        {'\n'}Proses EKYVC berhasil{'\n'}
                    </Text>

                    <ButtonPrimary
                        title='Selanjutnya'
                        onPress={submit}
                    // onPress={() => navigation.navigate('SingleHit')}
                    // onPress={() => navigation.navigate('NotSingleHit')}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        ...variables.globalStyle.imageLogo,
        height: variables.responsiveHeight(25),
        width: variables.responsiveHeight(25),
        marginTop: variables.responsiveHeight(3),
        // marginBottom: variables.responsiveHeight(20),
    },
    imageLogo2: {
        ...variables.globalStyle.imageLogo,
        resizeMode: 'contain',
        height: variables.responsiveHeight(12),
        width: variables.responsiveHeight(12),
        marginTop: variables.responsiveHeight(3),
    },
})

export default LivenessDoneScreen