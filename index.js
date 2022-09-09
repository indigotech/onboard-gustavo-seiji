/**
 * @format
 */

import App from './app.tsx';
import BlankPage from './src/users-list';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('Onboard', () => App);
Navigation.registerComponent('Users', () => BlankPage);
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
