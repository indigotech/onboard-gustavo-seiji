import { passCharRegex, passNumberRegex, emailRegex } from './regex';

export const validateLogin = (email: string, password: string) => {
  let error = '';
  if (email == '' || password == '') {
    error += 'Preencha todos os campos\n';
  }
  if (password.length < 7) {
    error += 'A senha deve possuir pelo menos 7 caracteres\n';
  }
  if (!emailRegex.test(email)) {
    error += 'O campo de email deve seguir o formato de um email: abc@def.com\n';
  }
  if (!passNumberRegex.test(password) || !passCharRegex.test(password)) {
    error += 'O campo de senha deve conter ao menos uma letra e um número\n';
  }
  return error.slice(0, -1);
};
