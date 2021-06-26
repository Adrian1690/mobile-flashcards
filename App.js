import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native';
import Constants from 'expo-constants';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import ListDecks from './components/ListDecks';
import DeckView from './components/DeckView';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { purple, white } from './utils/colors';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import * as Notifications from 'expo-notifications';
import {
  registerForPushNotificationsAsync,
  setNotification,
} from './utils/tools';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Tab =
  Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let icon;
        icon = <Ionicons name="ios-speedometer" size={size} color={color} />;

        return icon;
      },
    })}
    tabBarOptions={{
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        backgroundColor: Platform.OS === 'ios' ? white : purple,
      },
      indicatorStyle: {
        // Android tab indicator (line at the bottom of the tab)
        backgroundColor: 'yellow',
      },
    }}>
    <Tab.Screen name="Deck" component={ListDecks} />
    <Tab.Screen name="AddDeck" component={AddDeck} />
  </Tab.Navigator>
);

const Stack = createStackNavigator();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DeckView"
        component={DeckView}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }}
      />
      <Stack.Screen
        name="AddCard"
        component={AddCard}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App = () => {
  useEffect(() => {
    // Set notification
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        setNotification();
      }
    });
  }, []);
  return (
    <Provider store={createStore(reducer)}>
      <View style={styles.container}>
        <MainNavigator />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
