/**
 * @format
 */

import App from './app.tsx';
import { Navigation } from 'react-native-navigation';
import UsersList from './src/pages/users-list';
import AddUser from './src/pages/add-user';

Navigation.registerComponent('Onboard', () => App);
Navigation.registerComponent('Users', () => UsersList);
Navigation.registerComponent('Add User', () => AddUser);
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
