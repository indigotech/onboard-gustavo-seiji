import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { data } from './mockList';
import { userItemInterface } from './interfaces';
import { usersPage } from './styles';

const UsersList = () => {
  const renderUser = ({ item }: { item: userItemInterface }) => (
    <View style={usersPage.userItem}>
      <Text style={usersPage.name}>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
  return (
    <SafeAreaView style={usersPage.wrapper}>
      <Text style={usersPage.title}>Lista de usuários</Text>
      <FlatList data={data.users} renderItem={renderUser} />
    </SafeAreaView>
  );
};

export default UsersList;
