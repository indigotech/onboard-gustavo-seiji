import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { general } from '../styles';
const CustomButton = (props: { title: string; handleClick: () => void }) => {
  return (
    <TouchableOpacity onPress={props.handleClick} style={general.button}>
      <View>
        <Text style={{ color: 'white' }}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
