import React from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { userItemInterface } from './interfaces';
import { loadingGifStyle, usersPage } from './styles';
import { client } from './services/apollo-client';
import { usersQueryGQL } from './services/graph-ql';
import { useQuery } from '@apollo/client';
import { loadingGif } from './utils/loading-gif';

const UsersList = () => {
  const { data, loading, error } = useQuery(usersQueryGQL, { client });
  const renderUser = ({ item }: { item: userItemInterface }) => (
    <View style={usersPage.userItem}>
      <Text style={usersPage.name}>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
  return (
    <SafeAreaView style={usersPage.wrapper}>
      <Text style={usersPage.title}>Lista de usuários</Text>
      {loading && <Image style={loadingGifStyle} source={loadingGif.src} />}
      {error && <Text style={usersPage.error}>{error.message}</Text>}
      {data && <FlatList data={data?.users.nodes} renderItem={renderUser} keyExtractor={(item) => item.id} />}
    </SafeAreaView>
  );
};

export default UsersList;
