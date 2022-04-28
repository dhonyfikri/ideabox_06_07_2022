import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import {
  Button,
  FormControl,
  Heading,
  NativeBaseProvider,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {prefetchConfiguration} from 'react-native-app-auth';
import {useSelector} from 'react-redux';
import {FontTampilan} from '../../../assets/font/Font';
import {IconGit} from '../../../assets/icon';
import {IconEmail, IconPassword} from '../../../assets/icon/Icon';
import getData from '../../../components/GetData';
import LoadingFull from '../../../components/LoadingFull';
import {
  AuthConfig,
  defaultAuthState,
  defaultAuthStateLogin,
} from '../../../config/Auth.cfg';
import {storeAsyncStorageObject} from '../../../utils/AsyncStorage/StoreAsyncStorage';
import styles from '../style/Login.style';

const Login = ({navigation, route}) => {
  const stateGlobal = useSelector(state => state);

  let _toggleCheckBox = false;
  if (route.params !== undefined && route.params.checked !== undefined) {
    _toggleCheckBox = route.params.checked;
  }

  const [data, setData] = useState(defaultAuthState);
  const [ldap, setLdap] = useState(defaultAuthStateLogin);
  const [toggleCheckBox, setToggleCheckBox] = useState(_toggleCheckBox);
  const [login, setLogin] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const expiredCheck = () => {
    // if not expired
    if (data.expireAt > moment().unix()) {
      navigation.replace('TabNavigation');
    }
  };

  const handleAuthorizeLdap = () => {
    // dummy selagi server gagal
    setShowLoading(true);
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
          setShowLoading(false);
          navigation.replace('TabNavigation');
        })
        .catch(() => {
          setShowLoading(false);
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
              disabled={!toggleCheckBox || showLoading}
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
              onPress={toggleCheckBox ? () => {} : () => {}}
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
      <LoadingFull visible={showLoading} message="Please Wait..." />
    </NativeBaseProvider>
  );
};
export default Login;
