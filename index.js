/**
 * @format
 */

import App from './app.tsx';
import BlankPage from './src/blankPage';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('Onboard', () => App);
Navigation.registerComponent('Page 2', () => BlankPage);
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
