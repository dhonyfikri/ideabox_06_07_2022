import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Platform,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import {prefetchConfiguration} from 'react-native-app-auth';
import {useSelector} from 'react-redux';
import getData from '../../../components/GetData';
import LoadingFull from '../../../components/LoadingFull';
import {
  AuthConfig,
  defaultAuthState,
  defaultAuthStateLogin,
} from '../../../config/Auth.cfg';
import {storeAsyncStorageObject} from '../../../utils/AsyncStorage/StoreAsyncStorage';
import {colors} from '../../../utils/ColorsConfig/Colors';
// import styles from '../style/Login.style';

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(true);

  const handleSignIn = () => {
    email === '' ? setInvalidEmail(false) : setInvalidEmail(true);
    password === '' ? setInvalidPassword(false) : setInvalidPassword(true);
    if (email !== '' && password !== '') {
      handleAuthorizeLdap();
    }
  };
  const handleSignUp = () => {
    navigation.push('Register');
  };
  const handleForgotPassword = () => {
    navigation.push('ForgotPassword');
  };
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/image/logo-ideabox.png')}
          style={styles.logo}
        />
        <Text style={styles.header}>
          Welcome back to {`\n`}
          <Text style={{color: '#5F49D2'}}>Ideabox</Text> Family
        </Text>
        <Text style={styles.subHeader}>Please login to your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.titleInput}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="type your email"
          keyboardType="email-address"
          onChangeText={text => {
            setEmail(text);
            setLdap({...ldap, username: text});
          }}
        />
        <Text style={[styles.invalid, {opacity: invalidEmail ? 0 : 1}]}>
          Incorrect email
        </Text>
        <Text style={styles.titleInput}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="type your password"
          secureTextEntry={true}
          onChangeText={text => {
            setPassword(text);
            setLdap({...ldap, password: text});
          }}
        />
        <Text style={[styles.invalid, {opacity: invalidPassword ? 0 : 1}]}>
          Incorrect Password{' '}
        </Text>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              onCheckColor="red"
            />
            <Text
              style={[
                styles.sideButtonContainer,
                {
                  color: '#1A1A1A',
                  fontFamily: 'Poppins-Regular',
                },
              ]}>
              Remember Me
            </Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={[
                styles.sideButtonContainer,
                {color: '#7C4BFF', fontFamily: 'Poppins-SemiBold'},
              ]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.getstarted}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}>
          Dont't have an account?
          <Text
            style={{fontFamily: 'LeagueSpartan-SemiBold', color: '#7C4BFF'}}
            onPress={handleSignUp}>
            {' '}
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    lineHeight: 33.6,
    color: 'black',
    marginTop: 24.03,
  },
  subHeader: {
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '400',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: '#1A1A1A',
    opacity: 0.71,
    marginTop: 4,
  },
  inputContainer: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  titleInput: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    lineHeight: 20,
    color: 'black',
    marginTop: 12,
  },
  input: {
    height: 47,
    marginTop: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderColor: '#BDBDBD',
    marginHorizontal: 0,
    borderRadius: 8,
    fontFamily: 'Poppins-Regular',
  },
  invalid: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 15,
    color: '#EE4443',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 9,
    marginBottom: 0,
  },
  sideButtonContainer: {
    fontSize: 14,
    lineHeight: 17,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    height: 52,
    width: 358,
    borderRadius: 5,
    backgroundColor: '#5F49D2',
    marginTop: 39,
    marginHorizontal: 0,
  },
  getstarted: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  bottomText: {
    fontFamily: 'LeagueSpartan-Regular',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 32,
    color: '#1A1A1A',
  },
});

export default Login;
