import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { data } from './mockList';
import { userItemInterface } from './interfaces';

const BlankPage = () => {
  const renderUser = ({ item }: { item: userItemInterface }) => (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
  return (
    <SafeAreaView>
      <Text>Lista de usuários</Text>
      <FlatList data={data.users} renderItem={renderUser} />
    </SafeAreaView>
  );
};

export default BlankPage;
