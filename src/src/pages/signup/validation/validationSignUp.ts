export function validateForm(
  name?: string,
  email?: string,
  phone?: string,
  pass?: string,
  confPass?: string,
  pin?: string,
  confPin?: string,
  id_jns_otp?: string,
  validationPassExp?: RegExp,
) {
  let error: string | any[] = [];
  if(!name){
    console.log(name);
    error.push('name');
  } else if(!email){
    error.push('email');
  } else if(!phone){
    error.push('phone');
  } else if (!validationPassExp?.test(pass!)) {
    error.push('err regexp');
  } else if (pass != confPass) {
    error.push('err conf pass');
  } else if ((pin ?? '').length < 6) {
    error.push('err pin');
  } else if (pin != confPin) {
    error.push('err conf pin');
  } else if (!id_jns_otp) {
    error.push('err selected id');
  }
  console.log(error);
  return Object.keys(error).length === 0;
}
