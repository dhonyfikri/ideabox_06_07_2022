import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import IdeaDescription from '../modules/detailIdea/screen/IdeaDescription';
import StoryBehind from '../modules/detailIdea/screen/StoryBehind';
import LeanCanvas from '../modules/detailIdea/screen/LeanCanvas';
import Teams from '../modules/detailIdea/screen/Teams';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';

const Tab = createMaterialTopTabNavigator();

const tabItemWidth = (Dimensions.get('window').width - 10 * 2 - 5 * 2) / 3.2;
const tabItemWidthWithoutScroll =
  (Dimensions.get('window').width - 16 * 2 - 4 * 2) / 4;

const TabItem = ({focused, title}) => {
  return (
    <View
      style={{
        // width: tabItemWidth - 8,
        width: tabItemWidthWithoutScroll,
        height: 40,
        borderRadius: 25,
        backgroundColor: focused ? colors.primary : '#085D7A00',
        paddingVertical: 6,
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: focused ? 'white' : colors.text.primary,
          fontFamily: fonts.secondary[600],
          fontSize: 11,
          lineHeight: 14,
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
      backBehavior="none"
      initialRouteName="IdeaDescription"
      sceneContainerStyle={{backgroundColor: 'white'}}
      screenOptions={{
        tabBarScrollEnabled: false,
        swipeEnabled: true,
        tabBarBounces: false,
        tabBarStyle: {
          backgroundColor: '#EBEFF5',
          borderRadius: 25,
          overflow: 'hidden',
          marginBottom: 10,
          // paddingVertical: 4,
          padding: 4,
          minHeight: 0,
          height: 47,
          elevation: 0,
        },
        tabBarPressColor: '#ffffff00',
        tabBarLabelStyle: {color: 'white'},
        tabBarItemStyle: {
          padding: 0,
          minHeight: 0,
          // width: tabItemWidth,
          borderRadius: 10,
        },
        tabBarIndicatorStyle: {width: 0},
      }}>
      <Tab.Screen
        component={IdeaDescription}
        name="IdeaDescription"
        options={{
          title: ({focused}) => <TabItem focused={focused} title="Idea Desc" />,
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
