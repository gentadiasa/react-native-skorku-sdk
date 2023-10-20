import React, { createContext, useState } from 'react';
import type { IDataRegister, SignUpContextType } from '../@types/userdata';

interface Props {
  children?: React.ReactNode;
}

export const initialDataSignup: IDataRegister = {
  trx_num: '',
  name: '',
  email: '',
  email_partner: '',
  password: '',
  no_hp: '',
  pin: '',
  tac: '',
  privacy: '',
  pernyataan_data: '',
  persetujuan_pelanggan: '',
  id_jns_otp: '',
}

// export const SignUpContext = createContext<SignUpContextType>({data: initialDataSignup, setData(){initialDataSignup} });
export const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

const SignUpProvider: React.FC<Props> = ({ children }) => {

  const [data, setDataSignUp] = useState<IDataRegister>(initialDataSignup);

  const setData = (newData: IDataRegister) => {
    setDataSignUp({ ...data, ...newData });
  };

  return (
    <SignUpContext.Provider value={{ data, setData }}>
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider
