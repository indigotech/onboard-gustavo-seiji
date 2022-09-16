import { KeyboardType, TextInputProps, TextProps } from 'react-native';

export interface userItemInterface {
  name: string;
  email: string;
  id: string;
}

export interface TextInputComponentProps {
  name: string;
  error: boolean;
  password?: boolean;
  handleChange: (value: string, extracted?: string) => void;
  mask?: string;
  value?: string;
  keyboardType?: KeyboardType;
}

export interface TextInputStyledProps extends TextInputProps {
  color: 'red' | '#777';
  password?: boolean;
  mask?: string;
  value?: string;
  keyboardType?: KeyboardType;
}

export interface LabelProps extends TextProps {
  color: 'red' | '#777';
}
