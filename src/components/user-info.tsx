import React from 'react';
import { Text, View } from 'react-native';
import { detailsPageStyles } from '../styles';

interface UserInfoProps {
  title: string;
  info: string;
}

export const UserInfo = (props: UserInfoProps) => {
  return (
    <View style={detailsPageStyles.dataWrapper}>
      <Text style={detailsPageStyles.title}>{props.title}</Text>
      <Text style={detailsPageStyles.data}>{props.info}</Text>
    </View>
  );
};
