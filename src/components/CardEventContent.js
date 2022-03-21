import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {windowHeight} from './WindowDimensions';
import style from '../config/Style/style.cfg';
const CardEventContent = props => {
  return (
    <View style={styles.box}>
      <Image source={{uri: props.image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, style.h4]}>{props.title}</Text>
        <Text style={[styles.desc, style.h5]} numberOfLines={5}>
          {props.desc}
        </Text>
        <View style={styles.row}>
          <TouchableOpacity onPress={props.detail}>
            <Text style={styles.detail}>Detail Event</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: props.background}]}>
            <Text style={styles.textButton}>{props.status}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {props.buttonStatus === true ? (
        <TouchableOpacity onPress={props.join} style={styles.buttonJoin}>
          <Text style={styles.textJoin}>{props.textButton}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CardEventContent;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 550,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    marginVertical: 5,
  },
  desc: {
    textAlign: 'justify',
    fontFamily: 'Roboto-Regular',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  detail: {
    color: '#085D7A',
    fontFamily: 'Roboto-Regular',
    fontWeight: '600',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  button: {
    width: 70,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  textButton: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
  },
  buttonJoin: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#34A68A',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textJoin: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Regular',
  },
});
