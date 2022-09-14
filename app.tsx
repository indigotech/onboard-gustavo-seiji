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
import { SafeAreaView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';

import { validateLogin } from './src/utils/login-validator';
import { useMutation } from '@apollo/client';
import { client } from './src/services/apollo-client';
import { loginMutationGQL } from './src/services/graph-ql';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { general, loadingGifStyle, loginPage } from './src/styles';
import { getStorageItem, setStorageItem } from './src/services/persistency';
import { loadingGif } from './src/utils/get-media';

const App = (props: NavigationComponentProps) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const email = React.useRef('');
  const password = React.useRef('');
  const [loginMutation, { loading }] = useMutation(loginMutationGQL, { client });

  React.useEffect(() => {
    getStorageItem('token').then((token) => {
      if (token) {
        Navigation.push(props.componentId, {
          component: {
            name: 'Users',
            options: {
              topBar: {
                title: {
                  text: 'Usuários',
                  alignment: 'center',
                },
              },
            },
          },
        });
      }
    });
  }, []);

  const login = () => {
    loginMutation({
      variables: { loginData: { email: email.current, password: password.current } },
      onCompleted: (data) => {
        setStorageItem('token', data.login.token);
        Navigation.push(props.componentId, {
          component: {
            name: 'Users',
            options: {
              topBar: {
                title: {
                  text: 'Usuários',
                  alignment: 'center',
                },
              },
            },
          },
        });
      },
      onError: (error) => {
        setErrorMessage(error.message);
      },
    });
  };

  const handleButtonPress = () => {
    const loginValidatorResult = validateLogin(email.current, password.current);
    if (loginValidatorResult !== '') {
      setErrorMessage(loginValidatorResult);
    } else {
      setErrorMessage('');
      login();
    }
  };

  return (
    <SafeAreaView style={general.centeredWrapper}>
      <View style={general.inputContainer}>
        <Text>E-mail</Text>
        <TextInput
          style={general.textInput}
          onChangeText={(text) => (email.current = text)}
          placeholder='Ex:joao.silva@gmail.com'
        />
      </View>
      <View style={general.inputContainer}>
        <Text>Senha</Text>
        <TextInput
          style={general.textInput}
          secureTextEntry
          placeholder='Ex: senha123'
          onChangeText={(text) => (password.current = text)}
        />
      </View>
      {errorMessage && <Text style={loginPage.errorText}>{errorMessage}</Text>}
      {loading ? (
        <Image source={loadingGif.src} style={loadingGifStyle} />
      ) : (
        <TouchableOpacity style={general.button} onPress={handleButtonPress}>
          <View>
            <Text style={{ color: 'white' }}>Login</Text>
          </View>
        </TouchableOpacity>
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
