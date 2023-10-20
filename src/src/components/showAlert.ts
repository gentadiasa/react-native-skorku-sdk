import { Alert, Platform } from "react-native"

export function showAlert(title?: string, resp?: string){
    // let res = resp == null ? 'Under Development' : resp
    // let data = Object(res) ? res.message : res
    // let message = data.response_code == undefined ? data : `${data.response_msg}`
    let message = resp
    console.log(message)
    if (Platform.OS === 'android') {
        Alert.alert(
        title ?? 'title',
        message
        )
    } else {
        const OldAlert = Alert.alert;
        Alert.alert = (...args) => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    OldAlert(...args);
                });
            });
        };
        Alert.alert(
            title ?? 'title',
            message
        )
    }
}