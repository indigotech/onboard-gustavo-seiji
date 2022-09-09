import { passCharRegex, passNumberRegex, emailRegex } from './regex';

export const validateLogin = (email:string,password:string)=>{
    let error:string | null = null
    if (email == '' || password == '') {
        error = 'Preencha todos os campos'
      } else if (password.length < 7) {
        error = 'A senha deve possuir pelo menos 7 caracteres'
      } else if (!emailRegex.test(email)) {
        error = 'O campo de email deve seguir o formato de um email: abc@def.com'
      } else if (!passNumberRegex.test(password) || !passCharRegex.test(password)) {
        error = 'O campo de senha deve conter ao menos uma letra e um número'
      }
    return error;
}