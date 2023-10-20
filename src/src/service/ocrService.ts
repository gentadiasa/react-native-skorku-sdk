import axios from "axios";
import { showAlert } from "../components/showAlert";
import type { IDataRegister } from "../@types/userdata";
import { buildTrxNum, getFileName } from "../util/textutil";
import type { ImageOrVideo } from "react-native-image-crop-picker";
import { getBundleId } from 'react-native-device-info';
import EncryptedStorage from "react-native-encrypted-storage";
import { SkorkuType } from "../../index";
import RNFS from "react-native-fs";

export async function postOCR(id: string, img: ImageOrVideo, token: string) {
    try {
        let trxNum = buildTrxNum()

        const form = new FormData();
        form.append('trx_num', trxNum)
        form.append('id_user', id)
        form.append('id_channel', '1')

        const file = {
            uri: img.path,
            name: getFileName(img.path) ?? `ocrktp-${trxNum}`,
            type: img.mime
        }
        form.append('file', file)
        console.log(file)

        const response = await axios.post(
            '/ekyc/ocr',
            form,
            { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } }
        )

        console.log(response.data)
        if (response.status == 200) {
            if (response.data['status'] == '200') {
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

export async function submitOCR(data: IDataRegister) {
    try {
        console.log(data)
        let data_ocr = data.ocr_data
        const response = await axios.post(
            '/ekyc/submit_ocr',
            {
                "trx_num": buildTrxNum(),
                "id_user": data.id_user,
                "nik": data_ocr?.nik,
                "name": data_ocr?.name,
                "blood_type": data_ocr?.blood_type,
                "religion": data_ocr?.religion,
                "gender": data_ocr?.gender,
                "dob": data_ocr?.dob,
                "pob": data_ocr?.pob,
                "province": data_ocr?.province,
                "city": data_ocr?.city,
                "district": data_ocr?.district,
                "village": data_ocr?.village,
                "rtrw": data_ocr?.rtrw,
                "occupation": data_ocr?.occupation,
                "nationality": data_ocr?.nationality,
                "marital": data_ocr?.marital,
                "address": data_ocr?.address
            },
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

export async function getLivenessLicense(data: IDataRegister) {
    try {

        let payload = {
            "trx_num": buildTrxNum(),
            "id_user": data.id_user,
            "package_name": getBundleId(),
            "id_channel": "1"
        }
        console.log(payload)
        const response = await axios.post(
            '/ekyc/license_liveness',
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

export async function submitLiveness(data: IDataRegister, livenessId: string) {
    try {
        let trxNum = buildTrxNum()

        const form = new FormData();
        form.append('trx_num', trxNum)
        form.append('id_user', data.id_user)
        form.append('liveness_id', livenessId)
        form.append('id_channel', '1')

        let img: ImageOrVideo;

        let skorkuType = await EncryptedStorage.getItem("skorkuType") ?? '';
        if (skorkuType == SkorkuType.lite) {
            let base64ktp = data.ocr_data?.ktp ?? ''
            var base64arr = base64ktp.split("data:image/jpg;base64,");
            var base64code = base64arr.length > 1 ? base64arr[1] : base64arr[0]

            var path = RNFS.DocumentDirectoryPath + `/ektp64.jpg`;
            RNFS.writeFile(path, base64code ?? '', 'base64')
                .then(() => {
                    img.path = path
                    img.mime = 'image/jpg'
                })
                .catch((err: any) => {
                    console.log(err.message);
                });
        } else {
            img = data.ektp_data!
        }

        const file = {
            uri: img!.path,
            name: getFileName(img!.path) ?? `ktp-${trxNum}`,
            type: img!.mime
        }
        form.append('file', file)
        console.log(file)
        console.log(form)

        const response = await axios.post(
            '/ekyc/submit_liveness',
            form,
            { headers: { Authorization: `Bearer ${data.token}`, 'Content-Type': 'multipart/form-data' } }
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
