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
  const [users, setUsers] = React.useState<userItemInterface[]>([]);
  const offset = React.useRef(0);
  const { data, error, fetchMore } = useQuery(usersQueryGQL, {
    client,
    variables: { pageInfo: { offset: 0, limit: 20 } },
    onCompleted: (data) => {
      setUsers(data.users.nodes);
      setLoading(false);
    },
  });
  const renderUser = ({ item }: { item: userItemInterface }) => (
    <View style={usersPage.userItem}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
    </View>
  );
  const handleEndReach = () => {
    if (data.users.pageInfo.hasNextPage && !loading) {
      setLoading(true);
      fetchMore({ variables: { pageInfo: { offset: offset.current + 20, limit: 20 } } })
        .then((data) => {
          offset.current += 20;
          setUsers([...users, ...data.data.users.nodes]);
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
      {loading && !data && <Image source={loadingGif.src} style={loadingGifStyle} />}
      {error && <Text style={usersPage.error}>{error.message}</Text>}
      {users && (
        <FlatList
          style={usersPage.usersContainer}
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReach}
          onEndReachedThreshold={0.2}
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
