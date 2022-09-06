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
  const [error, setError] = React.useState('');
  const email = React.useRef('');
  const password = React.useRef('');
  const emailRegex = new RegExp('[a-zA-Z.]+@(?:[a-zA-Z]+)+.com');
  const passNumberRegex = new RegExp('[0-9]');
  const passCharRegex = new RegExp('[A-z]');

  const handleButtonPress = () => {
    if (email.current == '' || password.current == '') {
      setError('Preencha todos os campos');
    } else if (password.current.length < 7) {
      setError('A senha deve possuir pelo menos 7 caracteres');
    } else if (!emailRegex.test(email.current)) {
      setError('O campo de email deve seguir o formato de um email: abc@def.com');
    } else if (!passNumberRegex.test(password.current) || !passCharRegex.test(password.current)) {
      setError('O campo de senha deve conter ao menos uma letra e um número');
    } else {
      setError('');
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View>
        <Text>E-mail</Text>
        <TextInput
          onChangeText={(text) => {
            email.current = text;
          }}
          placeholder='ex:joao.silva@gmail.com'
        />
      </View>
      <View>
        <Text>Senha</Text>
        <TextInput
          secureTextEntry
          placeholder='senha123'
          onChangeText={(text) => {
            password.current = text;
          }}
        />
      </View>
      {!!error && <Text style={{ color: 'red' }}>{error}</Text>}
      <Button onPress={handleButtonPress} title='Login' />
    </SafeAreaView>
  );
};

export default App;
