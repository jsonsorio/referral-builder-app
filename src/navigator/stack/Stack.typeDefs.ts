import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  CreateStack: undefined;
  ViewRecordsStack: undefined;
  // add more screen params...
};

export type StackProps = NativeStackScreenProps<StackParamList, keyof StackParamList>;
