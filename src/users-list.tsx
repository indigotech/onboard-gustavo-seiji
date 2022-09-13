import React from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { userItemInterface } from './interfaces';
import { loadingGifStyle, usersPage } from './styles';
import { client } from './services/apollo-client';
import { usersQueryGQL } from './services/graph-ql';
import { useQuery } from '@apollo/client';
import { loadingGif } from './utils/loading-gif';
import { logout } from './services/logout';

const UsersList = () => {
  const { data, loading, error, fetchMore } = useQuery(usersQueryGQL, {
    client,
    variables: { pageInfo: { offset: 0, limit: 20 } },
    notifyOnNetworkStatusChange: true,
  });
  if (error?.message === 'Usuário sem credenciais válidas.') logout();
  const renderUser = ({ item }: { item: userItemInterface }) => (
    <View style={usersPage.userItem}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
  const handleEndReach = () => {
    if (data.users.pageInfo.hasNextPage && !loading) {
      fetchMore({ variables: { pageInfo: { offset: data.users.pageInfo.offset + 20, limit: 20 } } });
    }
  };
  return (
    <SafeAreaView style={usersPage.wrapper}>
      <Text style={usersPage.title}>Lista de usuários</Text>
      {loading && !data && <Image source={loadingGif.src} style={loadingGifStyle} />}
      {error && <Text style={usersPage.error}>{error.message}</Text>}
      {data && (
        <FlatList
          style={usersPage.usersContainer}
          data={data.users.nodes}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReach}
          onEndReachedThreshold={0.15}
          ListFooterComponent={
            loading && data ? (
              <Image source={loadingGif.src} style={[loadingGifStyle, { alignSelf: 'center' }]} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default UsersList;
