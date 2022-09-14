import React from 'react';
import { FlatList, Image, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { userItemInterface } from '../interfaces';
import { general, usersPageStyles } from '../styles';
import { client } from '../services/apollo-client';
import { usersQueryGQL } from '../services/graph-ql';
import { useQuery } from '@apollo/client';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { loadingGif } from '../utils/get-media';
import AddUserButton from '../components/add-user-button';

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
    <SafeAreaView style={general.centeredWrapper}>
      {loading && !data && <Image source={loadingGif.src} style={general.loadingGifStyle} />}
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
