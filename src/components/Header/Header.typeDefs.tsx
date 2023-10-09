import {
    StyleProp,
    ViewStyle,
    TextStyle,
  } from 'react-native';
  
  export interface IHeader {
    title?: string;
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
  }
  