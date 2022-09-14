import { NavigationComponentProps } from 'react-native-navigation';

export interface PropsWithId extends NavigationComponentProps {
  id: string;
}

export interface userItemInterface {
  name: string;
  email: string;
  id: string;
}
