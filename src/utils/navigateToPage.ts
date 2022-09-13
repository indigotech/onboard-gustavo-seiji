import { Navigation } from 'react-native-navigation';

export const navigateToPage = (name: string, componentId: string, backButtonVisible = true) => {
  Navigation.push(componentId, {
    component: {
      name: name,
      options: {
        topBar: {
          title: {
            text: name,
          },
          backButton: {
            visible: backButtonVisible,
          },
        },
      },
    },
  });
};
