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

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient, InMemoryCache, gql, useMutation } from '@apollo/client';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [errorMessage, setErrorMessage] = React.useState('');
  const email = React.useRef('');
  const password = React.useRef('');
  const emailRegex = new RegExp('[a-zA-Z.]+@(?:[a-zA-Z]+)+.com');
  const passNumberRegex = new RegExp('[0-9]');
  const passCharRegex = new RegExp('[A-z]');
  const client = new ApolloClient({
    uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
    cache: new InMemoryCache(),
  });

  const loginMutationGQL = gql`
    mutation LoginMutation($loginData: LoginInputType!) {
      login(data: $loginData) {
        token
        user {
          id
          name
          phone
          birthDate
          email
          role
        }
      }
    }
  `;

  const [loginMutation, { data, loading, error }] = useMutation(loginMutationGQL, { client: client });

  const handleButtonPress = () => {
    if (email.current == '' || password.current == '') {
      setErrorMessage('Preencha todos os campos');
    } else if (password.current.length < 7) {
      setErrorMessage('A senha deve possuir pelo menos 7 caracteres');
    } else if (!emailRegex.test(email.current)) {
      setErrorMessage('O campo de email deve seguir o formato de um email: abc@def.com');
    } else if (!passNumberRegex.test(password.current) || !passCharRegex.test(password.current)) {
      setErrorMessage('O campo de senha deve conter ao menos uma letra e um número');
    } else {
      setErrorMessage('');
      loginMutation({
        variables: { loginData: { email: email.current, password: password.current } },
        onCompleted: (data) => {
          AsyncStorage.setItem('token', data.login.token);
        },
        onError: (error) => {
          setErrorMessage(error.message);
        },
      });
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
      {!!errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      <Button onPress={handleButtonPress} disabled={loading} title={loading ? 'Carregando' : 'Login'} />
    </SafeAreaView>
  );
};

export default App;
