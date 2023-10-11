import React from 'react';
import { Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '@theme';
import { TabParamList, TabBarStatus } from './Tab.typeDefs';
import { CreateStackNavigator, ViewRecordsStackNavigator } from '@navigator/stack/Stack';
import DocumentIcon from '@assets/icons/document';
import BriefcaseIcon from '@assets/icons/briefcase';

const Tab = createBottomTabNavigator<TabParamList>();

const { height: screenHeight } = Dimensions.get('window');

const renderTabBarIcon = (tabName: keyof TabParamList) => (tabStatus: TabBarStatus) => {
  switch (tabName) {
    case 'CreateTab':
      return <DocumentIcon color={tabStatus.color} />;
    case 'ViewRecordsTab':
      return <BriefcaseIcon color={tabStatus.color} />;
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
        tabBarStyle: {
          height: Platform.OS === 'android' ? screenHeight / 12 : screenHeight / 10,
        },
        tabBarItemStyle: {
          paddingBottom: Platform.OS === 'ios' ? 0 : 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'aestetico-medium',
          lineHeight: 16,
        },
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
