import React, {useState, useEffect, useCallback} from 'react';
import {
  NativeBaseProvider,
  Text,
  Heading,
  VStack,
  FormControl,
  Button,
} from 'native-base';
import {authorize, prefetchConfiguration} from 'react-native-app-auth';
import {View, Alert, Platform, TextInput, Modal} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {IconEmail, IconPassword} from '../../../assets/icon/Icon';
import {IconGit} from '../../../assets/icon';
import {FontTampilan} from '../../../assets/font/Font';
import styles from '../style/Login.style';
import {
  AuthConfig,
  defaultAuthState,
  defaultAuthStateLogin,
} from '../../../config/Auth.cfg';
import getData from '../../../components/GetData';
import CheckBox from '@react-native-community/checkbox';
import LoadingScreen from '../../../components/LoadingScreen';

const Login = ({navigation, route}) => {
  // route.params.data = null;
  const checked = route.params.checked;
  // useEffect(() => {
  //   const checked = route.params.checked;
  //   console.log(checked);
  //   setToggleCheckBox(checked);
  // }, []);

  const [authState, setAuthState] = useState(defaultAuthState);
  const [authStateLdap, setAuthStateLdap] = useState();
  const [data, setData] = useState(defaultAuthState);
  const [ldap, setLdap] = useState(defaultAuthStateLogin);
  const [toggleCheckBox, setToggleCheckBox] = useState(checked);
  const [login, setLogin] = useState(true);
  const expiredCheck = () => {
    if (data.expireAt > moment().unix()) {
      navigation.replace('DrawerNavigation');
      return <LoadingScreen />;
    }
    //expired
  };

  const storeData = async () => {
    try {
      if (authState.name !== '') {
        const jsonValue = JSON.stringify(authState);
        await AsyncStorage.setItem('authState', jsonValue);
        setData(authState);
      }
    } catch (e) {
      console.log('failed to store data');
    }
  };
  const storeDataLdap = async () => {
    try {
      if (authStateLdap.name !== '') {
        const jsonValue = JSON.stringify(authStateLdap);
        await AsyncStorage.setItem('authState', jsonValue);
        setData(authStateLdap);
      }
    } catch (e) {
      console.log('failed to store data');
    }
  };

  const handleAuthorize = useCallback(async () => {
    try {
      const newAuthState = await authorize(AuthConfig);
      axios({
        crossDomain: true,
        method: 'post',
        url: 'https://dev-users.digitalamoeba.id/authorize/sso/mobile',
        data: {
          access_token: newAuthState.accessToken,
        },
        validateStatus: false,
      })
        .then(function ({status, data}) {
          if (status === 200) {
            setAuthState({
              hasLoggedInOnce: true,
              ...data.data,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          // need handling error
        });
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }, [storeData()]);

  const handleAuthorizeLdap = useCallback(async () => {
    try {
      axios({
        crossDomain: true,
        method: 'post',
        url: 'https://dev-users.digitalamoeba.id/authorize/ldap',
        data: {
          ldap: {
            username: ldap.username,
            password: ldap.password,
          },
        },
        validateStatus: false,
      })
        .then(function ({status, data}) {
          if (status === 200) {
            setAuthStateLdap({
              hasLoggedInOnce: true,
              ...data.data,
            });
          } else {
            setLogin(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          // need handling error
        });
    } catch (error) {
      Alert.alert('Failed to log in', error.message);
    }
  }, [storeDataLdap()]);
  useEffect(() => {
    let isSubscribed = true;
    getData().then(jsonValue => {
      if (isSubscribed) {
        setData(jsonValue);
      }
    });
    prefetchConfiguration({
      warmAndPrefetchChrome: Platform.OS === 'android',
      ...AuthConfig,
    });
    return () => (isSubscribed = false);
  }, []);

  useEffect(() => {
    expiredCheck();
  }, [data]);
  return (
    <NativeBaseProvider theme={FontTampilan}>
      <View style={styles.container}>
        <Heading style={styles.headLogin}>Login</Heading>
        <Heading style={styles.headWelcome} mt="3">
          Welcome, please login to your account
        </Heading>
        <VStack mt="30" width="80%">
          <FormControl>
            <IconEmail />
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              placeholderTextColor="#FFFFFF"
              onChangeText={value => setLdap({...ldap, username: value})}
              value={ldap.username}
            />
          </FormControl>
          <FormControl>
            <IconPassword />
            <TextInput
              style={styles.inputText}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor="#FFFFFF"
              onChangeText={value => setLdap({...ldap, password: value})}
              value={ldap.password}
            />
            {login === false ? (
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#FF2E2E',
                    marginTop: 10,
                    fontWeight: 'bold',
                  }}>
                  *) Please check your username & password correctly!
                </Text>
              </View>
            ) : (
              <View style={{height: 52}} />
            )}
          </FormControl>
          {toggleCheckBox === true ? (
            <Button
              mt="20"
              style={styles.button}
              _text={{color: '#085D7A', fontWeight: '700'}}
              onPress={() => handleAuthorizeLdap()}>
              Login
            </Button>
          ) : (
            <Button
              mt="20"
              style={styles.buttonNonActive}
              _text={{color: '#085D7A', fontWeight: '700'}}>
              Login
            </Button>
          )}
          <View style={styles.center}>
            <Text style={styles.or}>-OR-</Text>
          </View>
          {toggleCheckBox === true ? (
            <Button
              style={styles.button}
              _text={{color: '#085D7A', fontWeight: '700'}}
              onPress={() => handleAuthorize()}
              leftIcon={<IconGit />}>
              Login with GIT
            </Button>
          ) : (
            <Button
              style={styles.buttonNonActive}
              _text={{color: '#085D7A', fontWeight: '700'}}
              leftIcon={<IconGit />}>
              Login with GIT
            </Button>
          )}

          <View style={styles.rowterm}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              onCheckColor="red"
            />

            <Text style={styles.term}>
              Please read the{' '}
              <Text
                style={{color: '#F9CC2C', textDecorationLine: 'underline'}}
                onPress={() => {
                  navigation.navigate('TermCondi');
                }}>
                Terms of Conditions
              </Text>{' '}
              and{' '}
              <Text
                onPress={() => {
                  navigation.navigate('TermCondi');
                }}
                style={{color: '#F9CC2C', textDecorationLine: 'underline'}}>
                Privacy Policy.
              </Text>
            </Text>
          </View>
        </VStack>
      </View>
    </NativeBaseProvider>
  );
};
export default Login;
