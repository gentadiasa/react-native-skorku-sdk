import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as variables from '../../constants/variables';
import Header from '../../components/Header';
import ButtonPrimary from '../../components/ButtonPrimary';
import Loader from '../../components/Loader';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { SignUpContext } from '../../context/SignUpContext';
import { getParam } from '../../service/sysService';


const NotSingleHitScreen: React.FC = () => {

    const cRegister = useContext(SignUpContext);
    const data = cRegister?.data!

    const [loading] = useState(false);
    const [desc, setDesc] = useState('');

    useEffect(() => {

        (async () => {
            try {
                console.log('a')
                const consent = await getParam(data)
                console.log('a')

                if (consent) {
                    let alert_nh = ''
                    let alert_mh = ''
                    let alert_eh = ''
                    consent.map((e: any) => {
                        console.log(e)
                        if (e['param'] == 'alert_nh') {
                            alert_nh = e['value_html']
                        } else if (e['param'] == 'alert_mh') {
                            alert_mh = e['value_html']
                        } else if (e['param'] == 'alert_error_hit') {
                            alert_eh = e['value_html']
                        }
                    })
                    if (data.status_hit == 'NH') {
                        setDesc(alert_nh)
                    } else if (data.status_hit == 'MH') {
                        setDesc(alert_mh)
                    } else if (data.status_hit == 'EH') {
                        setDesc(alert_eh)
                    }
                }
            } catch (error) {
                //   setError(error.message);
            } finally {
                //   setLoaded(true);
            }
        })();
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title='SKORKU'
                backgroundColor={variables.colors.primary}
                contentColor='white'
                left={variables.responsiveWidth(4)}
                hideIconBack
            />

            {loading && < Loader />}
            <View style={variables.globalContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <AutoHeightWebView
                        style={{ width: variables.deviceWidth / 1.2, marginVertical: variables.responsiveHeight(2) }}
                        source={{ html: desc }}
                        overScrollMode='never'
                    />
                    <ButtonPrimary
                        title='Keluar'
                        onPress={() => cRegister?.setData({ is_exited: true })}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default NotSingleHitScreen