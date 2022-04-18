import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import IdeaDescription from '../modules/detailIdea/screen/IdeaDescription';
import StoryBehind from '../modules/detailIdea/screen/StoryBehind';
import LeanCanvas from '../modules/detailIdea/screen/LeanCanvas';
import Teams from '../modules/detailIdea/screen/Teams';

const Tab = createMaterialTopTabNavigator();

const tabItemWidth = (Dimensions.get('window').width - 10 * 2 - 5 * 2) / 3;

const TabItem = ({focused, title}) => {
  return (
    <View
      style={{
        width: tabItemWidth,
        height: 40,
        borderRadius: 25,
        backgroundColor: focused ? '#085D7A' : '#085D7A00',
        paddingVertical: 6,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: focused ? 'white' : '#085D7A',
          fontWeight: 'bold',
          fontSize: 12,
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
};

const TopTabDetailIdeaNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="PageOne"
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarBounces: false,
        tabBarStyle: {
          backgroundColor: '#EBEFF5',
          borderRadius: 25,
          overflow: 'hidden',
          marginHorizontal: 10,
          marginTop: 5,
          padding: 5,
          minHeight: 0,
        },
        tabBarPressColor: '#ffffff00',
        tabBarLabelStyle: {color: 'white'},
        tabBarItemStyle: {
          padding: 0,
          minHeight: 0,
          width: tabItemWidth,
        },
        tabBarIndicatorStyle: {width: 0},
      }}>
      <Tab.Screen
        component={IdeaDescription}
        name="IdeaDescription"
        options={{
          title: ({focused}) => (
            <TabItem focused={focused} title="Idea Description" />
          ),
        }}
      />
      <Tab.Screen
        component={StoryBehind}
        name="StoryBehind"
        options={{
          title: ({focused}) => (
            <TabItem focused={focused} title="Story Behind" />
          ),
        }}
      />
      <Tab.Screen
        component={LeanCanvas}
        name="LeanCanvas"
        options={{
          title: ({focused}) => (
            <TabItem focused={focused} title="Lean Canvas" />
          ),
        }}
      />
      <Tab.Screen
        component={Teams}
        name="Teams"
        options={{
          title: ({focused}) => <TabItem focused={focused} title="Teams" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TopTabDetailIdeaNavigation;

const styles = StyleSheet.create({});
