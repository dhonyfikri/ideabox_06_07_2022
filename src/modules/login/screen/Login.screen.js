import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import {
  Button,
  FormControl,
  Heading,
  NativeBaseProvider,
  Text,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {authorize, prefetchConfiguration} from 'react-native-app-auth';
import {FontTampilan} from '../../../assets/font/Font';
import {IconGit} from '../../../assets/icon';
import {IconEmail, IconPassword} from '../../../assets/icon/Icon';
import getData from '../../../components/GetData';
import {
  AuthConfig,
  defaultAuthState,
  defaultAuthStateLogin,
} from '../../../config/Auth.cfg';
import {UserServiceBaseUrl} from '../../../config/Environment.cfg';
import {storeAsyncStorageObject} from '../../../utils/AsyncStorage/StoreAsyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../style/Login.style';

const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  let _toggleCheckBox = false;
  if (route.params !== undefined && route.params.checked !== undefined) {
    _toggleCheckBox = route.params.checked;
  }

  const [authState, setAuthState] = useState(defaultAuthState);
  const [data, setData] = useState(defaultAuthState);
  const [ldap, setLdap] = useState(defaultAuthStateLogin);
  const [toggleCheckBox, setToggleCheckBox] = useState(_toggleCheckBox);
  const [login, setLogin] = useState(true);

  const expiredCheck = () => {
    // if not expired
    if (data.expireAt > moment().unix()) {
      navigation.replace('DrawerNavigation');
    }
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

  const handleAuthorize = useCallback(async () => {
    try {
      const newAuthState = await authorize(AuthConfig);
      axios({
        crossDomain: true,
        method: 'post',
        url: `${UserServiceBaseUrl}/authorize/sso/mobile`,
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

  const handleAuthorizeLdap = () => {
    // loginLDAP(ldap.username, ldap.password)
    //   .then(res => {
    //     // todo something
    //     if (!res.rejectFromServer) {
    //       console.log(res.data.data);
    //       setLoading(false);
    //       storeAsyncStorageObject('authState', {
    //         hasLoggedInOnce: true,
    //         ...res.data.data,
    //       }).then(navigation.replace('DrawerNavigation'));
    //     } else {
    //       console.log('error, with code ' + res.code);
    //       setLoading(false);
    //       setLogin(false);
    //     }
    //   })
    //   .catch(err => {
    //     // todo something
    //     console.log(err);
    //     setLoading(false);
    //   });

    // dummy selagi server gagal

    dispatch({
      type: 'SET_SHOW_LOADING',
      value: {show: true, message: 'Loading...'},
    });
    setTimeout(() => {
      storeAsyncStorageObject('authState', {
        hasLoggedInOnce: true,
        token: 'cchyt23r423jr32vr',
        expireAt: 0,
        name: 'MUHAMMAD FARIZKO NURDITAMA EDIT',
        email: '930241@TELKOM.CO.ID',
        id: '1',
        provider: 'ldap',
        provider_id: '930241',
      })
        .then(() => {
          dispatch({
            type: 'SET_SHOW_LOADING',
            value: {show: true, message: 'Opening Main App...'},
          });

          navigation.replace('DrawerNavigation');
        })
        .catch(() => {
          dispatch({
            type: 'SET_SHOW_LOADING',
            value: {show: false, message: 'Loading...'},
          });
        });
    }, 500);
  };

  useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: Platform.OS === 'android',
      ...AuthConfig,
    });
    getData().then(jsonValue => {
      setData(jsonValue);
    });
  }, []);

  useEffect(() => {
    if (data !== defaultAuthState) {
      expiredCheck();
    }
  }, [data]);

  return (
    <NativeBaseProvider theme={FontTampilan}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
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
            {/* <Button
              mt="20"
              mb="2"
              style={toggleCheckBox ? styles.button : styles.buttonNonActive}
              _text={{color: '#085D7A', fontWeight: '700'}}
              onPress={toggleCheckBox ? handleAuthorizeLdap : () => {}}>
              Login
            </Button> */}
            <TouchableOpacity
              disabled={!toggleCheckBox || stateGlobal.showLoading.show}
              style={
                toggleCheckBox
                  ? styles.touchableButton
                  : styles.touchableButtonNonActive
              }
              onPress={handleAuthorizeLdap}>
              <Text
                style={{
                  width: '100%',
                  textAlign: 'center',
                  color: '#085D7A',
                  fontWeight: '700',
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={styles.center}>
              <Text style={styles.or}>-OR-</Text>
            </View>
            <Button
              style={toggleCheckBox ? styles.button : styles.buttonNonActive}
              _text={{color: '#085D7A', fontWeight: '700'}}
              onPress={toggleCheckBox ? handleAuthorize : () => {}}
              leftIcon={<IconGit />}>
              Login with GIT
            </Button>

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
      </ScrollView>
    </NativeBaseProvider>
  );
};
export default Login;
