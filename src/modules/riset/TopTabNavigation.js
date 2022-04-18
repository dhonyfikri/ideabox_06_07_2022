import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import PageFive from './PageFive';
import PageFour from './PageFour';
import PageOne from './PageOne';
import PageSeven from './PageSeven';
import PageSix from './PageSix';
import PageThree from './PageThree';
import PageTwo from './PageTwo';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="PageTwo"
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: 'green',
          borderRadius: 10,
          overflow: 'hidden',
          margin: 20,
          // position: 'absolute',
          // top: 20,
          // left: 20,
          // right: 20,
        },
        tabBarLabelStyle: {color: 'white'},
        tabBarItemStyle: {
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 0,
          borderRadius: 10,
          minHeight: 0,
          width: 100,
          // alignSelf: 'flex-start',
          backgroundColor: '#888888',
        },
        tabBarIndicatorStyle: {width: 0},
      }}>
      <Tab.Screen
        component={PageOne}
        name="PageOne"
        options={{
          title: ({focused}) => (
            <View
              style={{
                width: 100,
                height: 40,
                borderRadius: 10,
                backgroundColor: focused ? 'orange' : 'red',
              }}></View>
          ),
        }}
      />
      <Tab.Screen component={PageTwo} name="PageTwo" />
      <Tab.Screen component={PageThree} name="PageThree" />
      <Tab.Screen component={PageFour} name="PageFour" />
      <Tab.Screen component={PageFive} name="PageFive" />
      <Tab.Screen component={PageSix} name="PageSix" />
      <Tab.Screen component={PageSeven} name="PageSeven" />
    </Tab.Navigator>
  );
};

export default TopTabNavigation;

const styles = StyleSheet.create({});
