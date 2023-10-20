import axios from "axios";
import { showAlert } from "../components/showAlert";
import type { IDataRegister } from "../@types/userdata";
import { buildTrxNum } from "../util/textutil";

export async function getBid(data: IDataRegister) {
    try {
        let payload = {
            "trx_num": buildTrxNum(),
            "id_user": data.id_user,
        }
        console.log(payload)
        const response = await axios.post(
            '/creditscore/get_bid',
            payload,
            { headers: { Authorization: `Bearer ${data.token}` }, timeout: 60 }
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

export async function getReport(data: IDataRegister) {
    try {
        let payload = {
            "trx_num": buildTrxNum(),
            "id_user": data.id_user,
        }
        console.log(payload)
        const response = await axios.post(
            '/creditscore/get_report',
            payload,
            { headers: { Authorization: `Bearer ${data.token}` } }
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