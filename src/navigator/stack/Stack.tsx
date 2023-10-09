import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackParamList } from './Stack.typeDefs';
import { TabProps } from '../tab/Tab.typeDefs';
import { StackHeaderTitle } from './components';
import { colors } from '@theme';

// views
import Create from '@views/Create';
import ViewRecords from '@views/ViewRecords';

const Stack = createNativeStackNavigator<StackParamList>();

const navigationProps = {
  headerTintColor: colors.white,
  headerStyle: { backgroundColor: colors.white },
  headerTitleStyle: { fontSize: 18 },
};

export function CreateStackNavigator({ navigation }: TabProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={Create}
        name="CreateStack"
        options={{
          title: 'Create',
          headerTitle: () => <StackHeaderTitle />,
          headerTitleAlign: 'center',
        }}
      />
      {/* add more screens here later on... */}
    </Stack.Navigator>
  );
}

export function ViewRecordsStackNavigator({ navigation }: TabProps) {
  return (
    <Stack.Navigator screenOptions={navigationProps}>
      <Stack.Screen
        component={ViewRecords}
        name="ViewRecordsStack"
        options={{
          title: 'View',
          headerTitle: () => <StackHeaderTitle />,
          headerTitleAlign: 'center',
        }}
      />
      {/* add more screens here later on... */}
    </Stack.Navigator>
  );
}
