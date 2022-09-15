import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import TextInputComponent from '../components/text-input';
import { general } from '../styles';
import { formatDate } from '../utils/format-date';
import { createUserMutationGQL } from '../services/graph-ql';
import { client } from '../services/apollo-client';
import { useMutation } from '@apollo/client';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { loadingGif } from '../utils/get-media';
import { validateCreateUser } from '../utils/validate-create-user';
import { ButtonStyled } from '../components/button-styled';
import { Title } from '../components/title';

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

  return (
    <ScrollView>
      <SafeAreaView style={general.centeredWrapper}>
        <Title>Criar Usuário</Title>
        <TextInputComponent
          error={error ? true : false}
          name='Nome Completo'
          handleChange={(value) => (fullName.current = value)}
        />
        <TextInputComponent
          error={error ? true : false}
          name='Telefone'
          mask={'([00]) [00000]-[0000]'}
          keyboardType='numeric'
          handleChange={(formatted, extracted) => {
            if (extracted) {
              phone.current = extracted;
            }
          }}
        />
        <TextInputComponent
          error={error ? true : false}
          name='Data de Nascimento'
          mask={'[00]/[00]/[0000]'}
          keyboardType='numeric'
          value={date}
          handleChange={(formatted) => setDate(formatDate(formatted))}
        />
        <TextInputComponent
          error={error ? true : false}
          name='E-mail'
          handleChange={(value) => (email.current = value)}
        />
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
        <TextInputComponent
          error={error ? true : false}
          password
          name='Senha'
          handleChange={(value) => (password.current = value)}
        />
        {error && <Text style={general.errorText}>{error}</Text>}
        {loading && <Image source={loadingGif.src} style={general.loadingGifStyle} />}
        <ButtonStyled onPress={handleButtonPress}>Adicionar Usuário</ButtonStyled>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddUser;
