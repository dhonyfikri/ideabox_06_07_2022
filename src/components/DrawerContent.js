import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, Title, Caption, Drawer, Text} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {LogoutDrawer} from '../assets/icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getData from './GetData';
import LoadingScreen from './LoadingScreen';
import GetDataProfile from '../config/GetData/GetDataProfile';

const DrawerContent = props => {
  const removeData = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      return false;
    }
  };
  const LogoutHandle = () => {
    removeData('authState');
    props.navigation.replace('Login', {checked: false});
  };

  const {state, descriptors, navigation} = props;
  let lastGroupName = '';
  let newGroup = true;
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          {/* User info */}
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              {props.profileIf === '' ? (
                <Avatar.Image
                  source={require('../assets/image/profilepicture.jpg')}
                  size={50}
                />
              ) : (
                <Avatar.Image source={props.profile} size={50} />
              )}

              <View
                style={{
                  marginLeft: 15,
                  flexDirection: 'column',
                  flex: 1,
                  marginRight: 10,
                }}>
                <Title style={styles.title} numberOfLines={2}>
                  {props.nama}
                </Title>
                <Caption style={styles.caption}>{props.email}</Caption>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('RouteProfile')}>
                    <Text style={styles.caption2}>Edit Profile </Text>
                  </TouchableOpacity>
                  {/* <Caption style={styles.caption3}>Setting</Caption> */}
                </View>
              </View>
            </View>
          </View>
          <View style={styles.line} />
          {/* Drawer section */}
          {state.routes.map((route, key) => {
            const {drawerLabel, activeTintColor, groupName, drawerIcon} =
              descriptors[route.key].options;
            if (lastGroupName !== groupName) {
              newGroup = true;
              lastGroupName = groupName;
            } else newGroup = false;
            return (
              <View key={key}>
                {newGroup ? (
                  <View style={styles.sectionContainer} key={key}>
                    <Text
                      key={groupName}
                      style={{
                        marginLeft: 10,
                        marginRight: 5,
                        fontWeight: 'bold',
                      }}>
                      {groupName}
                    </Text>
                    <View style={styles.sectionLine} />
                  </View>
                ) : null}
                {groupName === 'Administrator' || groupName === 'My Idea' ? (
                  <DrawerItem
                    key={route.key}
                    label={({color}) => (
                      <Text style={[{marginLeft: 40}, {color}]}>
                        {drawerLabel}
                      </Text>
                    )}
                    focused={
                      state.routes.findIndex(e => e.name === route.name) ===
                      state.index
                    }
                    activeTintColor={activeTintColor}
                    onPress={() => navigation.navigate(route.name)}
                    icon={drawerIcon}
                  />
                ) : (
                  <DrawerItem
                    key={route.key}
                    label={({color}) => (
                      <Text style={[{marginLeft: -20}, {color}]}>
                        {drawerLabel}
                      </Text>
                    )}
                    focused={
                      state.routes.findIndex(e => e.name === route.name) ===
                      state.index
                    }
                    activeTintColor={activeTintColor}
                    onPress={() => navigation.navigate(route.name)}
                    icon={drawerIcon}
                  />
                )}
              </View>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Logout */}

      <Drawer.Section style={styles.bottomDrawerSection}>
        <View
          style={{
            height: 0.5,
            width: '90%',
            backgroundColor: 'black',
            marginHorizontal: 15,
          }}
        />
        <DrawerItem
          icon={() => <LogoutDrawer />}
          label="Sign out"
          labelStyle={styles.itemDrawer}
          onPress={() => LogoutHandle()}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  caption: {
    color: 'black',
    fontSize: 12,
  },
  caption2: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 14,
    color: '#085D7A',
  },
  caption3: {
    marginTop: 10,
    marginLeft: 8,
    fontSize: 14,
    lineHeight: 14,
    color: '#085D7A',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  itemDrawer: {
    color: 'grey',
    fontSize: 14,
    marginLeft: -20,
  },
  bottomDrawerSection: {},
  sectionLine: {
    backgroundColor: 'gray',
    flex: 1,
    height: 1,
    marginRight: 15,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
