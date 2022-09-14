import { useQuery } from '@apollo/client';
import React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { PropsWithId } from '../interfaces';
import { client } from '../services/apollo-client';
import { userDetailsQueryGQL } from '../services/graph-ql';
import { detailsPage, loadingGifStyle, usersPage } from '../styles';
import { loadingGif } from '../utils/loading-gif';

const UserDetails = (props: PropsWithId) => {
  const { data, loading, error } = useQuery(userDetailsQueryGQL, { client, variables: { id: props.id } });
  return (
    <SafeAreaView style={usersPage.wrapper}>
      {loading && !data && <Image source={loadingGif.src} style={loadingGifStyle} />}
      {error && <Text style={usersPage.error}>{error.message}</Text>}
      {data && (
        <>
          <Text style={detailsPage.h1}>{data.user.name}</Text>
          <View style={detailsPage.dataWrapper}>
            <Text style={detailsPage.title}>Telefone</Text>
            <Text style={detailsPage.data}>{data.user.phone}</Text>
          </View>
          <View style={detailsPage.dataWrapper}>
            <Text style={detailsPage.title}>Data de nascimento</Text>
            <Text style={detailsPage.data}>{data.user.birthDate}</Text>
          </View>
          <View style={detailsPage.dataWrapper}>
            <Text style={detailsPage.title}>E-mail</Text>
            <Text style={detailsPage.data}>{data.user.email}</Text>
          </View>
          <View style={detailsPage.dataWrapper}>
            <Text style={detailsPage.title}>Função</Text>
            <Text style={detailsPage.data}>{data.user.role === 'admin' ? 'Administrador' : 'Usuário'}</Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default UserDetails;
