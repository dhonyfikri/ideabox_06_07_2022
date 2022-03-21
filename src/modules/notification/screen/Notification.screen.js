import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Back} from '../../../assets/icon';
import CardNotification from '../../../components/CardNotification';
import style from '../../../config/Style/style.cfg';

const Notification = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.back}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>
        </View>
        <Text style={styles.notif}>Notification</Text>
      </View>
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
