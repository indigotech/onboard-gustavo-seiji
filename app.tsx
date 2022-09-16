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
import { SafeAreaView, Text, TextInput, View, Image, useColorScheme, TouchableOpacity } from 'react-native';

import { validateLogin } from './src/utils/login-validator';
import { useMutation } from '@apollo/client';
import { client } from './src/services/apollo-client';
import { loginMutationGQL } from './src/services/graph-ql';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { loadingGifStyle, loginPageStyles } from './src/styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { getStorageItem, setStorageItem } from './src/services/persistency';
import { loadingGif } from './src/utils/loading-gif';

const App = (props: NavigationComponentProps) => {
  const isDarkMode = useColorScheme() === 'dark';
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
                  text: 'Users',
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
                  text: 'Users',
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
    <SafeAreaView
      style={[
        loginPageStyles.loginPageWrapper,
        {
          backgroundColor: isDarkMode ? Colors.darker : Colors.white,
        },
      ]}
    >
      <View style={loginPageStyles.inputContainer}>
        <Text>E-mail</Text>
        <TextInput
          style={loginPageStyles.textInput}
          onChangeText={(text) => (email.current = text)}
          placeholder='Ex:joao.silva@gmail.com'
        />
      </View>
      <View style={loginPageStyles.inputContainer}>
        <Text>Senha</Text>
        <TextInput
          style={loginPageStyles.textInput}
          secureTextEntry
          placeholder='Ex: senha123'
          onChangeText={(text) => (password.current = text)}
        />
      </View>
      {errorMessage && <Text style={loginPageStyles.errorText}>{errorMessage}</Text>}
      {loading ? (
        <Image source={loadingGif.src} style={loadingGifStyle} />
      ) : (
        <TouchableOpacity style={loginPageStyles.loginButton} onPress={handleButtonPress}>
          <View>
            <Text style={{ color: 'white' }}>{loading ? 'Carregando' : 'Login'}</Text>
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
