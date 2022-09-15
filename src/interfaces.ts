import { KeyboardType } from 'react-native';

export interface userItemInterface {
  name: string;
  email: string;
  id: string;
}

export interface TextInputComponentProps {
  name: string;
  password?: boolean;
  handleChange: (value: string, extracted?: string) => void;
  mask?: string;
  value?: string;
  keyboardType?: KeyboardType;
}
