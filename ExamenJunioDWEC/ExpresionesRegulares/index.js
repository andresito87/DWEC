const emailValid = 'abeLincoln@gmail.com';
const emailInvalid = 'abeLincoln@gmail .com';
const regex = /\S+@\S+\.\S+/;

if (regex.test(emailValid)) {
  console.log(`El email ${emailValid} sí es válido`);
}
if (regex.test(emailInvalid)) {
  console.log(`El email ${emailInvalid} no es válido`);
}
