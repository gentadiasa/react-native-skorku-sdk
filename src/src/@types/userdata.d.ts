import { ImageOrVideo } from "react-native-image-crop-picker";

export interface IDataRegister {
	trx_num?: string;
	name?: string;
	email?: string;
	email_partner?: string;
	password?: string;
	no_hp?: string;
	pin?: string;
	tac?: string;
	privacy?: string;
	pernyataan_data?: string;
	persetujuan_pelanggan?: string;
	id_jns_otp?: string;

	ektp_data?: ImageOrVideo;

	id_user?: string;
	package?: string;
	token?: string;

	ocr_data?: DataOCR;
	liveness_id?: string;

	status_hit?: string;
	is_exited?: boolean;
}

export type SignUpContextType = {
	data: IDataRegister;
	setData: (data: IDataRegister) => void;
};

export interface DataOCR {
	nik?: string
	name?: string
	blood_type?: any
	religion?: string
	gender?: string
	dob?: string
	pob?: string
	province?: string
	city?: string
	district?: string
	village?: string
	rtrw?: string
	occupation?: string
	nationality?: string
	marital?: string
	address?: string
	ktp?: string;
}


export interface IDataOCR {
	nik: string
	name?: string
	blood_type: any
	religion: string
	gender: string
	dob: string
	pob: string
	province: string
	city: string
	district: string
	village: string
	rtrw: string
	occupation: string
	nationality: string
	marital: string
	address: string
	ktp: string;
}