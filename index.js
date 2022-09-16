/**
 * @format
 */

import App from './app.tsx';
import { Navigation } from 'react-native-navigation';
import UsersList from './src/pages/users-list';
import UserDetails from './src/pages/user-details';

Navigation.registerComponent('Onboard', () => App);
Navigation.registerComponent('Users', () => UsersList);
Navigation.registerComponent('Details', () => UserDetails);
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
