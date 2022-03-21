import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const CardNotification = () => {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Image
          source={require('../assets/image/mail.jpg')}
          style={styles.image}
        />
        <Text style={styles.title}>
          Inovasi kamu yang berjudul{' '}
          <Text style={{color: '#34A68A'}}>Sistem keuangan</Text> telah
          tersubmit.
        </Text>
        <Text style={styles.time}>Baru, 10 detik yang lalu.</Text>
      </View>
      <View style={styles.line} />
    </View>
  );
};

export default CardNotification;

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    maxWidth: '30%',
    height: 50,
    width: 50,
    borderRadius: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 12,
    maxWidth: '70%',
  },
  time: {
    marginLeft: 15,
    marginRight: 10,
    fontSize: 10,
    maxWidth: '15%',
    color: 'grey',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#808080',
    marginTop: 10,
  },
});
