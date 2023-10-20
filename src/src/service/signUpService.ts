import axios from "axios";
import { showAlert } from "../components/showAlert";
import type { IDataRegister } from "../@types/userdata";
import { buildTrxNum, getFormatedDate } from "../util/textutil";
import { SkorkuType } from "../../index";
import EncryptedStorage from "react-native-encrypted-storage";

export async function getConsent() {
    try {
        console.log('getConsent')
        console.log(axios.defaults.baseURL)
        const response = await axios.post('/auth/get_consent', {
            "trx_num": buildTrxNum(),
        })
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
        return;
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}

export async function postRegister(data: IDataRegister) {
    let skorkuType = await EncryptedStorage.getItem("skorkuType") ?? '';
    let path = skorkuType == SkorkuType.ekyc ? '/auth/register' : 'auth/register_with_ocr'

    let dateNow = getFormatedDate()
    let payload_register = {
        "trx_num": buildTrxNum(),
        "name": data.name,
        "email": data.email,
        "email_partner": data.email_partner,
        "password": data.password,
        "no_hp": data.no_hp,
        "pin": data.pin,
        "tac": dateNow,
        "privacy": dateNow,
        "pernyataan_data": dateNow,
        "persetujuan_pelanggan": dateNow,
        "id_jns_otp": data.id_jns_otp
    }
    let payload_register_with_ocr = {
        ...payload_register,
        ...data.ocr_data,
    }
    let payload = skorkuType == SkorkuType.ekyc ? payload_register : payload_register_with_ocr
    try {
        console.log(path, payload)
        const response = await axios.post(path, payload)
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                postOTP(data.no_hp, data.id_jns_otp)
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

export async function postOTP(no_hp?: string, id_jns_otp?: string) {
    try {
        const payload = {
            "no_hp": no_hp,
            "trx_num": buildTrxNum(),
            "id_jns_otp": id_jns_otp
        }
        console.log(payload)
        const response = await axios.post('/auth/send_otp', payload)
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
        // return;
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}

export async function verifyOTP(no_hp?: string, otp?: string) {
    try {
        const payload = {
            "no_hp": no_hp,
            "trx_num": buildTrxNum(),
            "otp": otp
        }
        console.log(payload)
        const response = await axios.post('/auth/verify_otp', payload)
        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
                return response.data['data']
            } else {
                showAlert('Info', response.data['message'])
            }
        }
        // return;
    } catch (error) {
        console.error(error);
        showAlert('Error', `${error}`)
    }
}
