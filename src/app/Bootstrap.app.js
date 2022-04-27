/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './../config/Routes/Routes.cfg';
import links from '../components/Links';
import {LogBox} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import store from '../utils/Redux/Store';
import LoadingFull from '../components/LoadingFull';
import RefreshFull from '../components/RefreshFull';

const App = () => {
  const stateGlobal = useSelector(state => state);

  const config = {
    screens: {
      Main: 'main',
      Login: {
        path: 'login/:message?',
        parse: {
          message: val => `${val}`,
        },
      },
      MyProfile: 'my_profile',
      DrawerNavigation: {
        screens: {
          TabNavigation: {
            screens: {
              Home: {
                screens: {
                  HomeContent: 'home',
                },
              },
              Explore: {
                initialRouteName: 'ExploreContent',
                screens: {
                  ExploreContent: 'list-idea',
                  DetailIdeaUser: {
                    path: 'detail-idea/:ideaId',
                    parse: {
                      ideaId: val => `${val}`,
                    },
                  },
                },
              },
            },
          },
        },
      },
      Page404: '*',
    },
  };

  return (
    <>
      <NavigationContainer
        linking={{
          prefixes: [
            'm-ideabox://app',
            'https://ideabox.id',
            'http://ideabox.id',
          ],
          config,
        }}>
        <Routes />
      </NavigationContainer>
      {stateGlobal.showLoading.show && (
        <LoadingFull message={stateGlobal.showLoading.message} />
      )}
      {stateGlobal.showRefreshButton.show && (
        <RefreshFull
          message={stateGlobal.showRefreshButton.message}
          onPress={stateGlobal.showRefreshButton.onPress}
          disabled={stateGlobal.showRefreshButton.disabled}
        />
      )}
    </>
  );
};

const Bootstrap = () => {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default Bootstrap;
