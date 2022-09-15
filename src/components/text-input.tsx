import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { general } from '../styles';
const TextInputComponent = (props: { name: string; password?: boolean }) => {
  return (
    <View style={general.inputContainer}>
      <Text>{props.name}</Text>
      <TextInput style={general.textInput} secureTextEntry={props.password ? true : false} />
    </View>
  );
};
export default TextInputComponent;
