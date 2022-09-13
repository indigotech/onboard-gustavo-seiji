import React from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { userItemInterface } from './interfaces';
import { loadingGifStyle, usersPage } from './styles';
import { client } from './services/apollo-client';
import { usersQueryGQL } from './services/graph-ql';
import { useQuery } from '@apollo/client';
import { loadingGif } from './utils/loading-gif';

const UsersList = () => {
  const [loading, setLoading] = React.useState(true);
  const { data, error, fetchMore } = useQuery(usersQueryGQL, {
    client,
    variables: { pageInfo: { offset: 0, limit: 20 } },
    onCompleted: () => {
      setLoading(false);
    },
  });
  const renderUser = ({ item }: { item: userItemInterface }) => (
    <View style={usersPage.userItem}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
  const handlePress = () => {
    if (data.users.pageInfo.hasNextPage && !loading) {
      setLoading(true);
      fetchMore({ variables: { pageInfo: { offset: data.users.pageInfo.offset + 20, limit: 20 } } })
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };
  return (
    <SafeAreaView style={usersPage.wrapper}>
      <Text style={usersPage.title}>Lista de usuários</Text>
      {error && <Text style={usersPage.error}>{error.message}</Text>}
      {data && (
        <FlatList
          style={usersPage.usersContainer}
          data={data.users.nodes}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          onEndReached={handlePress}
          onEndReachedThreshold={0.1}
        />
      )}
      {loading && <Image source={loadingGif.src} style={loadingGifStyle} />}
    </SafeAreaView>
  );
};

export default UsersList;
