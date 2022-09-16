import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { useMutation } from '@apollo/client';
import { TextInputComponent } from '../components/text-input';
import { general } from '../styles';
import { CustomButton } from './custom-button';
import { formatDate } from '../utils/format-date';
import { createUserMutationGQL } from '../services/graph-ql';
import { client } from '../services/apollo-client';
import { loadingGif } from '../utils/get-media';
import { validateCreateUser } from '../utils/validate-create-user';

const AddUser = (props: NavigationComponentProps) => {
  const [role, setRole] = React.useState('user');
  const [date, setDate] = React.useState('');
  const fullName = React.useRef('');
  const phone = React.useRef('');
  const email = React.useRef('');
  const password = React.useRef('');
  const [error, setError] = React.useState('');

  const [createUser, { loading }] = useMutation(createUserMutationGQL, { client });

  const handleButtonPress = () => {
    const createUserError = validateCreateUser(fullName.current, phone.current, email.current, date, password.current);
    setError(createUserError);
    if (createUserError === '') {
      const dateArray = date.split('/');
      const birthDate = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
      createUser({
        variables: {
          data: {
            name: fullName.current,
            email: email.current,
            phone: phone.current,
            birthDate,
            password: password.current,
            role,
          },
        },
        onCompleted: () => {
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
          setError(error.message);
        },
      });
    }
  };
  const handlePhoneChange = (formatted: string, extracted?: string) => {
    if (extracted) {
      phone.current = extracted;
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={general.centeredWrapper}>
        <TextInputComponent name='Nome Completo' handleChange={(value) => (fullName.current = value)} />
        <TextInputComponent
          name='Telefone'
          mask={'([00]) [00000]-[0000]'}
          keyboardType='numeric'
          handleChange={handlePhoneChange}
        />
        <TextInputComponent
          name='Data de Nascimento'
          mask={'[00]/[00]/[0000]'}
          keyboardType='numeric'
          value={date}
          handleChange={(formatted) => setDate(formatDate(formatted))}
        />
        <TextInputComponent name='E-mail' handleChange={(value) => (email.current = value)} />
        <View style={general.inputContainer}>
          <Text>Função do Usuário</Text>
          <TouchableOpacity
            style={general.radioButtonWrapper}
            onPress={() => {
              setRole('user');
            }}
          >
            <View style={[general.radioButton, { backgroundColor: role === 'user' ? 'black' : '#ccc' }]}></View>
            <Text>Usuário</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={general.radioButtonWrapper}
            onPress={() => {
              setRole('admin');
            }}
          >
            <View style={[general.radioButton, { backgroundColor: role === 'admin' ? 'black' : '#ccc' }]}></View>
            <Text>Administrador</Text>
          </TouchableOpacity>
        </View>
        <TextInputComponent password name='Senha' handleChange={(value) => (password.current = value)} />
        {error && <Text style={general.errorText}>{error}</Text>}
        {loading && <Image source={loadingGif.src} style={general.loadingGifStyle} />}
        <CustomButton title='Adicionar Usuário' handleClick={handleButtonPress} />
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddUser;
