import styled from 'styled-components/native';
import React, { PropsWithChildren } from 'react';
import { TouchableOpacityProps } from 'react-native';

const ButtonWrapper = styled.TouchableOpacity`
  background-color: #007aff;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 11px;
  width: 90%;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: normal;
`;

export const ButtonStyled = (props: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <ButtonWrapper onPress={props.onPress}>
      <ButtonText>{props.children}</ButtonText>
    </ButtonWrapper>
  );
};
