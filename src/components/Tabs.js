import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../modules/home/screen/Home.route';
import Explore from '../modules/explore/screen/Explore.route';
import Event from '../modules/event/screen/Event.route';
import {NativeBaseProvider} from 'native-base';
import {windowHeight} from './WindowDimensions';
import Trending from '../modules/trending/screen/Trending.route';
const Tab = createBottomTabNavigator();
const TabNavigation = () => {
  return (
    <NativeBaseProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            height: windowHeight / 12.34,
            backgroundColor: '#FFFFFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.41,
            shadowRadius: 9.11,

            elevation: 14,
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.wrapIcon}>
                <Image
                  source={require('../assets/icon/home.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#085D7A' : '#B4B4B4',
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{color: focused ? '#085D7A' : '#B4B4B4'}}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.wrapIcon}>
                <Image
                  source={require('../assets/icon/explore.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#085D7A' : '#B4B4B4',
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{color: focused ? '#085D7A' : '#B4B4B4'}}>
                  Explore
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Event"
          component={Event}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.wrapIcon}>
                <Image
                  source={require('../assets/icon/event.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#085D7A' : '#B4B4B4',
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{color: focused ? '#085D7A' : '#B4B4B4'}}>
                  Event
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Trending"
          component={Trending}
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <View style={styles.wrapIcon}>
                <Image
                  source={require('../assets/icon/trend.png')}
                  resizeMode="contain"
                  style={{
                    tintColor: focused ? '#085D7A' : '#B4B4B4',
                    width: 20,
                    height: 20,
                  }}
                />
                <Text style={{color: focused ? '#085D7A' : '#B4B4B4'}}>
                  Trending
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NativeBaseProvider>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  wrapIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
