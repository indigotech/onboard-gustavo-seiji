import React from 'react';
<<<<<<< HEAD
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import TextInputComponent from '../components/text-input';
import { general } from '../styles';
import TextInputMask from 'react-native-text-input-mask';
import { formatDate } from '../utils/format-date';
=======
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInputComponent from '../components/TextInput';
import { general } from '../styles';
import TextInputMask from 'react-native-text-input-mask';
>>>>>>> 840be87 (Created Add Users frontend)

const AddUser = () => {
  const [role, setRole] = React.useState('user');
  const [date, setDate] = React.useState('');
<<<<<<< HEAD
=======
  const handleDateChange = (formatted: string) => {
    const formattedArray = formatted.split('/');
    if (eval(formattedArray[0]) > 31) {
      formattedArray[0] = '31';
    }
    if (eval(formattedArray[1]) > 12) {
      formattedArray[1] = '12';
    }
    const currentDate = new Date();
    if (eval(formattedArray[2]) > currentDate.getFullYear()) {
      formattedArray[2] = currentDate.getFullYear().toString();
    }
    if (formatted.length === 10) {
      if (currentDate.getFullYear() - eval(formattedArray[2]) > 130) {
        formattedArray[2] = (currentDate.getFullYear() - 130).toString();
      }
    }
    setDate(formattedArray.join('/'));
  };
>>>>>>> 840be87 (Created Add Users frontend)
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
<<<<<<< HEAD
            onChangeText={(formatted) => {
              setDate(formatDate(formatted));
            }}
=======
            onChangeText={handleDateChange}
>>>>>>> 840be87 (Created Add Users frontend)
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
