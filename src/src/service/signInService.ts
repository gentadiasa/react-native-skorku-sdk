import axios from "axios";
import { showAlert } from "../components/showAlert";
import { buildTrxNum } from "../util/textutil";

export async function checkNIK(nik: string) {
    try {
        let payload = {
            "trx_num": buildTrxNum(),
            "nik": nik,
        }
        console.log(payload)
        const response = await axios.post(
            '/auth/check_nik',
            payload,
        )
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == 200) {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}

export async function signIn(
    noHp: string,
    otp: string,
    email: string
) {
    try {
        let payload = {
            "trx_num": buildTrxNum(),
            "no_hp": noHp,
            "otp": otp,
            "email_pribadi": email,
            "email_partner": ""
        }
        console.log(payload)
        const response = await axios.post(
            '/auth/login',
            payload,
        )
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == 200) {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}