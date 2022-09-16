import { dateRegex, emailRegex, passCharRegex, passNumberRegex } from './regex';

export const validateCreateUser = (name: string, phone: string, email: string, birthDate: string, password: string) => {
  let error = '';
  if (name == '' || phone == '' || email == '' || birthDate == '' || password == '') {
    error += 'Preencha todos os campos.\n';
  }
  if (password.length < 7) {
    error += 'A senha deve possuir pelo menos 7 caracteres\n';
  }
  if (!emailRegex.test(email)) {
    error += 'O campo de email deve seguir o formato de um email: abc@def.com\n';
  }
  if (phone.length !== 11) {
    error += 'O campo de telefone deve seguir o formato de um telefone: (11) 90011-0011\n';
  }
  if (!dateRegex.test(birthDate)) {
    error += 'O campo de data de nascimento deve seguir o formato de uma data: 15/05/2000\n';
  }
  if (!passNumberRegex.test(password) || !passCharRegex.test(password)) {
    error += 'O campo de senha deve conter ao menos uma letra e um número\n';
  }
  return error.slice(0, -1);
};
