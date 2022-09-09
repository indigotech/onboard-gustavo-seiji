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
import { SafeAreaView, Text, useColorScheme, TextInput, View, Button, Image } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { validateLogin } from './src/utils/login-validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@apollo/client';
import { client } from './src/services/apolo-client';
import { loginMutationGQL } from './src/services/graph-ql';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';

const App = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [errorMessage, setErrorMessage] = React.useState('');
  const email = React.useRef('');
  const password = React.useRef('');
  const [loginMutation, { data, loading, error }] = useMutation(loginMutationGQL, { client });

  const login = () => {
    loginMutation({
      variables: { loginData: { email: email.current, password: password.current } },
      onCompleted: (data) => {
        AsyncStorage.setItem('token', data.login.token);
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  const handleButtonPress = () => {
    const loginValidatorResult = validateLogin(email.current, password.current);
    if (loginValidatorResult !== null) {
      setErrorMessage(loginValidatorResult);
    } else {
      login();
      Navigation.push(props.componentId, {
        component: {
          name: 'Users',
          options: {
            topBar: {
              title: {
                text: 'Users',
              },
            },
          },
        },
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkMode ? Colors.darker : Colors.white,
      }}
    >
      <View>
        <Text>E-mail</Text>
        <TextInput onChangeText={(text) => (email.current = text)} placeholder='ex:joao.silva@gmail.com' />
      </View>
      <View>
        <Text>Senha</Text>
        <TextInput secureTextEntry placeholder='senha123' onChangeText={(text) => (password.current = text)} />
      </View>
      {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
      {loading ? (
        <Image source={require('./src/assets/loading.gif')} style={{ width: 40, height: 40 }} />
      ) : (
        <Button onPress={handleButtonPress} disabled={loading} title={loading ? 'Carregando' : 'Login'} />
      )}
    </SafeAreaView>
  );
};

App.options = {
  topBar: {
    title: {
      text: 'Login',
      color: 'black',
    },
    background: {
      color: 'white',
    },
  },
};

export default App;
