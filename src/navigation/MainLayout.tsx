import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Chat from '../screens/Chat';
import History from '../screens/History';
import User from '../screens/User';

export type MainTabParamList = {
  Chat: undefined;
  History: undefined;
  User: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainLayout = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MainLayout;
