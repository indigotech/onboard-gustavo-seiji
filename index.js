/**
 * @format
 */

import App from './app.tsx';
import { Navigation } from 'react-native-navigation';
import UsersList from './src/users-list';

Navigation.registerComponent('Onboard', () => App);
Navigation.registerComponent('Users', () => UsersList);
Navigation.events().registerAppLaunchedListener(() => {
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
});
