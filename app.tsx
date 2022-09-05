/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, Text, useColorScheme, TextInput, View, Button } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [emailValue, setEmailValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [error, setError] = React.useState('');
  const emailRegex = new RegExp('[a-zA-Z.]+@(?:[a-zA-Z]+)+.com');
  const passNumberRegex = new RegExp('[0-9]');
  const passCharRegex = new RegExp('[A-z]');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Text>E-mail</Text>
        <TextInput
          placeholder='ex:joao.silva@gmail.com'
          onChangeText={(text) => {
            setEmailValue(text);
          }}
        />
      </View>
      <View>
        <Text>Senha</Text>
        <TextInput
          secureTextEntry
          placeholder='senha123'
          onChangeText={(text) => {
            setPasswordValue(text);
          }}
        />
      </View>
      {!!error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button
        onPress={() => {
          if (emailValue == '' || passwordValue == '') {
            setError('Preencha todos os campos');
          } else if (passwordValue.length < 7) {
            setError('A senha deve possuir pelo menos 7 caracteres');
          } else if (!emailRegex.test(emailValue)) {
            setError('O campo de email deve seguir o formato de um email');
          } else if (!passNumberRegex.test(passwordValue) || !passCharRegex.test(passwordValue)) {
            setError('O campo de senha deve conter ao menos uma letra e um número');
          } else {
            setError('');
          }
        }}
        title='Login'
      />
    </SafeAreaView>
  );
};

export default App;
