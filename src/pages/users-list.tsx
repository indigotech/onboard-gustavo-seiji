import React from 'react';
import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import { userItemInterface } from '../interfaces';
import { general, usersPage } from '../styles';
import { client } from '../services/apollo-client';
import { usersQueryGQL } from '../services/graph-ql';
import { useQuery } from '@apollo/client';
import { loadingGif } from '../utils/get-media';
import AddUserButton from '../components/add-user-button';
import { NavigationComponentProps } from 'react-native-navigation';

const UsersList = (props: NavigationComponentProps) => {
  const { data, loading, error, fetchMore } = useQuery(usersQueryGQL, {
    client,
    variables: { pageInfo: { offset: 0, limit: 20 } },
    notifyOnNetworkStatusChange: true,
  });
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
    <SafeAreaView style={general.centeredWrapper}>
      {loading && !data && <Image source={loadingGif.src} style={general.loadingGifStyle} />}
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
              <Image source={loadingGif.src} style={[general.loadingGifStyle, { alignSelf: 'center' }]} />
            ) : null
          }
        />
      )}
      <AddUserButton componentId={props.componentId} />
    </SafeAreaView>
  );
};

export default UsersList;
