import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from 'react-native-navigation';

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Onboard',
            },
          },
        ],
      },
    },
  });
};
