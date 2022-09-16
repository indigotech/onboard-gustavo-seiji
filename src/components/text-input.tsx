import React from 'react';
import { KeyboardType, Text, TextInput, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { general } from '../styles';
export interface TextInputComponentProps {
  name: string;
  password?: boolean;
  onChange: (value: string, extracted?: string) => void;
  mask?: string;
  value?: string;
  keyboardType?: KeyboardType;
}

export const TextInputComponent = (props: TextInputComponentProps) => {
  return (
    <View style={general.inputContainer}>
      <Text>{props.name}</Text>
      {props.mask ? (
        <TextInputMask
          mask={props.mask}
          style={general.textInput}
          value={props.value}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          onChangeText={props.onChange}
        />
      ) : (
        <TextInput
          style={general.textInput}
          secureTextEntry={props.password ? true : false}
          value={props.value}
          onChangeText={props.onChange}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        />
      )}
    </View>
  );
};
