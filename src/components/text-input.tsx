import React from 'react';
import { View } from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { general } from '../styles';
import styled from 'styled-components/native';
import { LabelProps, TextInputComponentProps, TextInputStyledProps } from '../interfaces';

const Label = styled.Text<LabelProps>`
  font-size: 12px;
  font-weight: normal;
  color: ${(props) => props.color};
  margin-bottom: 12px;
`;
const TextInputStyled = styled.TextInput<TextInputStyledProps>`
  border: 1px solid
    ${(props) => {
      return props.color;
    }};
  height: 44px;
  border-radius: 11px;
`;
const TextInputMaskStyled = styled(TextInputMask)<TextInputStyledProps>`
  border: 1px solid
    ${(props) => {
      return props.color;
    }};
  height: 44px;
  border-radius: 11px;
`;

const TextInputComponent = (props: TextInputComponentProps) => {
  return (
    <View style={general.inputContainer}>
      <Label color={props.error ? 'red' : '#777'}>{props.name}</Label>
      {props.mask ? (
        <TextInputMaskStyled
          mask={props.mask}
          value={props.value}
          color={props.error ? 'red' : '#777'}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
          onChangeText={props.handleChange}
        />
      ) : (
        <TextInputStyled
          secureTextEntry={props.password ? true : false}
          value={props.value}
          color={props.error ? 'red' : '#777'}
          onChangeText={props.handleChange}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        />
      )}
    </View>
  );
};
export default TextInputComponent;
