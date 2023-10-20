import axios from "axios";
import { showAlert } from "../components/showAlert";
import type { IDataRegister } from "../@types/userdata";
import { buildTrxNum } from "../util/textutil";

export async function getParam(data: IDataRegister) {
    try {
        let payload = {
            "trx_num": buildTrxNum(),
        }
        console.log(payload)
        const response = await axios.post(
            '/sys/param',
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