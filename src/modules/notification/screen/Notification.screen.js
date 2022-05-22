import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header';
import style from '../../../config/Style/style.cfg';

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header
        backButton
        onBackPress={() => navigation.goBack()}
        backText="Back"
        title="Notification"
        withNotification={false}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../../assets/image/notification.png')}
          style={{width: 200, height: 300}}
        />
        <Text style={[style.h4, {color: '#085D7A'}]}>
          We are ready Soon! See you!
        </Text>
      </View>
      {/* <CardNotification /> */}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 65,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  back: {
    marginHorizontal: 10,
  },
  notif: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
