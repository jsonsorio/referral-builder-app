import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '@theme';
import { TabParamList, TabBarStatus } from './Tab.typeDefs';
import { CreateStackNavigator, ViewRecordsStackNavigator } from '@navigator/stack/Stack';

const Tab = createBottomTabNavigator<TabParamList>();

const renderTabBarIcon = (tabName: keyof TabParamList) => (tabStatus: TabBarStatus) => {
  switch (tabName) {
    case 'CreateTab':
      return <AntDesign name="home" size={24} color={tabStatus.color} />;
    case 'ViewRecordsTab':
      return <AntDesign name="profile" size={24} color={tabStatus.color} />;
    // add more...
  }
};

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: renderTabBarIcon(route.name),
        headerShown: false,
        tabBarInactiveTintColor: colors.gray,
        tabBarInactiveBackgroundColor: colors.white,
        tabBarActiveTintColor: colors.primary,
        tabBarActiveBackgroundColor: colors.white,
      })}>
      <Tab.Screen name="CreateTab" component={CreateStackNavigator} options={{ title: 'Create' }} />
      <Tab.Screen
        name="ViewRecordsTab"
        component={ViewRecordsStackNavigator}
        options={{ title: 'View' }}
      />
    </Tab.Navigator>
  );
}
