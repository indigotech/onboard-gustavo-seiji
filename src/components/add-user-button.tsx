import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Navigation, NavigationComponentProps } from 'react-native-navigation';
import { addUserButton } from '../styles';
import { addIcon } from '../utils/get-media';

const AddUserButton = (props: NavigationComponentProps) => {
  const handlePress = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Add User',
        options: {
          topBar: {
            title: {
              text: 'Adicionar Usuário',
              alignment: 'center',
            },
          },
        },
      },
    });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={addUserButton.wrapper}>
      <Image source={addIcon.src} style={addUserButton.img} />
    </TouchableOpacity>
  );
};

export default AddUserButton;
