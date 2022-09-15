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
import { SafeAreaView, Image } from 'react-native';

import { validateLogin } from './src/utils/login-validator';
import { useMutation } from '@apollo/client';
import { client } from './src/services/apollo-client';
import { loginMutationGQL } from './src/services/graph-ql';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { general } from './src/styles';
import { getStorageItem, setStorageItem } from './src/services/persistency';
import { loadingGif } from './src/utils/get-media';
import TextInputComponent from './src/components/text-input';
import { ButtonStyled } from './src/components/button-styled';
import { Title } from './src/components/title';
import { Caption } from './src/components/caption';

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
    setErrorMessage(loginValidatorResult);
    if (loginValidatorResult === '') {
      login();
    }
  };

  return (
    <SafeAreaView style={general.centeredWrapper}>
      <Title>Bem vindo à Taqtile</Title>
      <TextInputComponent
        error={errorMessage ? true : false}
        name='E-mail'
        handleChange={(value) => (email.current = value)}
      />
      <TextInputComponent
        error={errorMessage ? true : false}
        name='Senha'
        handleChange={(value) => (password.current = value)}
        password
      />
      {errorMessage && <Caption style={general.errorText}>{errorMessage}</Caption>}
      {loading ? (
        <Image source={loadingGif.src} style={general.loadingGifStyle} />
      ) : (
        <ButtonStyled onPress={handleButtonPress}>Login</ButtonStyled>
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
