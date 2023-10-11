import {
    StyleProp,
    ViewStyle,
    TextStyle,
  } from 'react-native';

  export interface TextFieldHandle {
    onFocus: () => void;
    onBlur: () => void;
}

  export interface ITextField {
    name: string;
    label?: string;
    type?: string;
    zIndex?: number;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    errorMsgStyle?: StyleProp<TextStyle>;
  }
  