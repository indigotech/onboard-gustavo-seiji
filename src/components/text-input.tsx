import React from 'react';
import { KeyboardType, Text, TextInput, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { general } from '../styles';

const TextInputComponent = (props: {
  name: string;
  password?: boolean;
  handleChange: (value: string, extracted?: string) => void;
  mask?: string;
  value?: string;
  keyboardType?: KeyboardType;
}) => {
  return (
    <View style={general.inputContainer}>
      <Text>{props.name}</Text>
      {props.mask ? (
        <TextInputMask
          mask={props.mask}
          style={general.textInput}
          value={props.value}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          onChangeText={props.handleChange}
        />
      ) : (
        <TextInput
          style={general.textInput}
          secureTextEntry={props.password ? true : false}
          onChangeText={props.handleChange}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        />
      )}
    </View>
  );
};
export default TextInputComponent;
