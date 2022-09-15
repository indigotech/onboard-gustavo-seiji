import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import TextInputComponent from '../components/TextInput';
import { general } from '../styles';
import TextInputMask from 'react-native-text-input-mask';
import { formatDate } from '../utils/format-date';

const AddUser = () => {
  const [role, setRole] = React.useState('user');
  const [date, setDate] = React.useState('');
  return (
    <ScrollView>
      <SafeAreaView style={general.centeredWrapper}>
        <TextInputComponent name='Nome Completo' />
        <TextInputComponent name='Telefone' />
        <View style={general.inputContainer}>
          <Text>Data de Nascimento</Text>
          <TextInputMask
            mask={'[00]/[00]/[0000]'}
            style={general.textInput}
            value={date}
            onChangeText={(formatted) => {
              setDate(formatDate(formatted));
            }}
          />
        </View>
        <TextInputComponent name='E-mail' />
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
        <TextInputComponent password name='Senha' />
        <TouchableOpacity style={general.button}>
          <View>
            <Text style={{ color: 'white' }}>Adicionar Usuário</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default AddUser;
