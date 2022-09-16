import { useQuery } from '@apollo/client';
import React from 'react';
import { Image, SafeAreaView, Text } from 'react-native';
import { client } from '../services/apollo-client';
import { userDetailsQueryGQL } from '../services/graph-ql';
import { detailsPageStyles, loadingGifStyle, usersPageStyles } from '../styles';
import { loadingGif } from '../utils/get-media';
import { NavigationComponentProps } from 'react-native-navigation';
import { UserInfo } from '../components/user-info';

interface UserDetailsProps extends NavigationComponentProps {
  id: string;
}

const UserDetails = (props: UserDetailsProps) => {
  const { data, loading, error } = useQuery(userDetailsQueryGQL, { client, variables: { id: props.id } });
  return (
    <SafeAreaView style={usersPageStyles.wrapper}>
      {loading && !data && <Image source={loadingGif.src} style={loadingGifStyle} />}
      {error && <Text style={usersPageStyles.error}>{error.message}</Text>}
      {data && (
        <>
          <Text style={detailsPageStyles.h1}>{data.user.name}</Text>
          <UserInfo title='Telefone' info={data.user.phone} />
          <UserInfo title='Data de Nascimento' info={data.user.birthDate} />
          <UserInfo title='E-mail' info={data.user.email} />
          <UserInfo title='Função' info={data.user.role === 'admin' ? 'Administrador' : 'Usuário'} />
        </>
      )}
    </SafeAreaView>
  );
};

export default UserDetails;
