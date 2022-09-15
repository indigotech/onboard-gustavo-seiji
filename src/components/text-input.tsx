import React from 'react';
import { Text, TextInput, View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { TextInputComponentProps } from '../interfaces';
import { general } from '../styles';

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
          onChangeText={props.handleChange}
        />
      ) : (
        <TextInput
          style={general.textInput}
          secureTextEntry={props.password ? true : false}
          value={props.value}
          onChangeText={props.handleChange}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        />
      )}
    </View>
  );
};
