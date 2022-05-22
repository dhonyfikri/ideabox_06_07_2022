import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import InputText from '../components/InputText';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../../utils/ColorsConfig/Colors';
import Header from '../../../components/Header';

export default function RegisterScreen({navigation, route}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [invalidName, setInvalidsetName] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(true);
  const [invalidPhone, setInvalidPhone] = useState(true);
  const [invalidProfession, setInvalidProfession] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(true);
  const [invalidConfirmPassword, setInvalidConfirmPassword] = useState(true);

  const handleSignUp = () => {
    name == '' ? setInvalidsetName(false) : setInvalidsetName(true);
    email == '' ? setInvalidEmail(false) : setInvalidEmail(true);
    phone == '' ? setInvalidPhone(false) : setInvalidPhone(true);
    profession == '' ? setInvalidProfession(false) : setInvalidProfession(true);
    password == '' ? setInvalidPassword(false) : setInvalidPassword(true);
    confirmPassword == ''
      ? setInvalidConfirmPassword(false)
      : setInvalidConfirmPassword(true);

    if (
      name != '' &&
      email != '' &&
      phone != '' &&
      profession != '' &&
      password != '' &&
      confirmPassword != '' &&
      password == confirmPassword
    ) {
      alert('Successfully registered');
    }
  };

  const handleSignIn = () => {
    navigation.goBack();
  };

  let _toggleCheckBox = false;
  if (route.params !== undefined && route.params.checked !== undefined) {
    _toggleCheckBox = route.params.checked;
  }

  const [toggleCheckBox, setToggleCheckBox] = useState(_toggleCheckBox);

  return (
    <SafeAreaView style={styles.containerSafe}>
      <Header
        backButton
        onBackPress={() => navigation.goBack()}
        backText="Back"
        withNotification={false}
      />
      <ScrollView
        style={styles.ScrollView}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{alignItems: 'center', marginBottom: 24}}>
              <Image
                source={require('../../../assets/image/logo-ideabox.png')}
                style={styles.logo}
              />
            </View>
            <Text style={styles.headerMain}>Create New Account</Text>
            <Text style={styles.subHeader}>
              We always ready anytime when you need us for build your ideas
              become reality
            </Text>
          </View>
          <InputText
            name="Full Name"
            placeholder="type your name"
            keyboardType="default"
            value={invalidName}
            secureTextEntry={false}
            onChanges={text => setName(text)}
          />
          <InputText
            name="Email"
            placeholder="type your email"
            keyboardType="email-address"
            value={invalidEmail}
            secureTextEntry={false}
            onChanges={text => setEmail(text)}
          />
          <InputText
            name="Phone Number"
            placeholder="type your phone number"
            keyboardType="phone-pad"
            value={invalidPhone}
            secureTextEntry={false}
            onChanges={text => setPhone(text)}
          />
          <InputText
            name="Profession"
            placeholder="type your profession"
            keyboardType="default"
            value={invalidProfession}
            secureTextEntry={false}
            onChanges={text => setProfession(text)}
          />
          <InputText
            name="Password"
            placeholder="type your password"
            keyboardType="default"
            value={invalidPassword}
            secureTextEntry={true}
            onChanges={text => setPassword(text)}
          />
          <InputText
            name="Re-type Password"
            placeholder="re-type your password"
            keyboardType="default"
            value={invalidConfirmPassword}
            secureTextEntry={true}
            onChanges={text => setConfirmPassword(text)}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              onCheckColor="red"
            />
            <Text style={styles.termCondition}>
              I have read & accept the{' '}
              <Text style={{color: '#5F49D2', fontFamily: 'Poppins-SemiBold'}}>
                Terms & Conditions
              </Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.getstarted}>Sing Up</Text>
          </TouchableOpacity>
          <Text style={styles.bottomText}>
            Already have an account?{' '}
            <Text
              style={{
                color: '#5F49D2',
                fontWeight: '600',
                fontFamily: 'LeagueSpartan-SemiBold',
              }}
              onPress={handleSignIn}>
              Login
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerSafe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  ScrollView: {
    marginHorizontal: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginTop: 32,
  },
  headerMain: {
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 33.6,
    color: 'black',
    fontFamily: 'Poppins-Medium',
    marginBottom: 12,
  },
  subHeader: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
    color: '#1A1A1A',
    opacity: 0.71,
  },
  termCondition: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 17,
    color: 'black',
    marginTop: 9.5,
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 52,
    borderRadius: 5,
    backgroundColor: '#5F49D2',
    marginBottom: 20,
    marginTop: 37,
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
    marginBottom: 21,
    color: '#1A1A1A',
  },
});
