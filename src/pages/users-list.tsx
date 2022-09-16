import React from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { userItemInterface } from '../interfaces';
import { loadingGifStyle, usersPageStyles } from '../styles';
import { client } from '../services/apollo-client';
import { usersQueryGQL } from '../services/graph-ql';
import { useQuery } from '@apollo/client';
import { loadingGif } from '../utils/loading-gif';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';

const UsersList = (props: NavigationComponentProps) => {
  const { data, loading, error, fetchMore } = useQuery(usersQueryGQL, {
    client,
    variables: { pageInfo: { offset: 0, limit: 20 } },
    notifyOnNetworkStatusChange: true,
  });
  const handleItemTap = (id: string) => {
    Navigation.push(props.componentId, {
      component: {
        passProps: {
          id,
        },
        name: 'Details',
        options: {
          topBar: {
            title: {
              text: 'Detalhes',
            },
          },
        },
      },
    });
  };
  const renderUser = ({ item }: { item: userItemInterface }) => (
    <TouchableOpacity style={usersPageStyles.userItem} onPress={() => handleItemTap(item.id)}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
    </TouchableOpacity>
  );
  const handleEndReach = () => {
    if (data.users.pageInfo.hasNextPage && !loading) {
      fetchMore({ variables: { pageInfo: { offset: data.users.pageInfo.offset + 20, limit: 20 } } });
    }
  };
  return (
    <SafeAreaView style={usersPageStyles.wrapper}>
      <Text style={usersPageStyles.title}>Lista de usuários</Text>
      {loading && !data && <Image source={loadingGif.src} style={loadingGifStyle} />}
      {error && <Text style={usersPageStyles.error}>{error.message}</Text>}
      {data && (
        <FlatList
          style={usersPageStyles.usersContainer}
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
