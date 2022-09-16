import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { general } from '../styles';

export const CustomButton = (props: { title: string; onClick: () => void }) => {
  return (
    <TouchableOpacity onPress={props.onClick} style={general.button}>
      <View>
        <Text style={{ color: 'white' }}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
