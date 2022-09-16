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
import { SafeAreaView, Text, Image } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { useMutation } from '@apollo/client';

import { validateLogin } from './src/utils/login-validator';
import { client } from './src/services/apollo-client';
import { loginMutationGQL } from './src/services/graph-ql';
import { general } from './src/styles';
import { getStorageItem, setStorageItem } from './src/services/persistency';
import { loadingGif } from './src/utils/get-media';
import { TextInputComponent } from './src/components/text-input';
import { CustomButton } from './src/pages/custom-button';

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
      <TextInputComponent name='E-mail' onChange={(value) => (email.current = value)} />
      <TextInputComponent name='Senha' onChange={(value) => (password.current = value)} password />
      {errorMessage && <Text style={general.errorText}>{errorMessage}</Text>}
      {loading ? (
        <Image source={loadingGif.src} style={general.loadingGifStyle} />
      ) : (
        <CustomButton title='Adicionar Usuário' onClick={handleButtonPress} />
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
