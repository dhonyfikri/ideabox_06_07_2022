import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {BackBlue} from '../assets/icon';
import {windowHeight, windowWidth} from './WindowDimensions';

const CardProfile = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <TouchableOpacity onPress={props.profile} style={{width: '100%'}}>
          <View style={styles.profile}>
            <Image source={props.image} style={styles.imageProfileProductive} />
            <View style={styles.content}>
              <Text style={styles.textProfileProductive}>{props.name}</Text>
              <Text style={styles.textLikeProductive}>{props.nik} </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.iconBack}>
          <TouchableOpacity onPress={props.onPress}>
            <BackBlue />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: windowWidth / 42.3,
    marginVertical: windowHeight / 86.4,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  profile: {
    flexDirection: 'row',
  },
  imageProfileProductive: {
    width: windowWidth / 7,
    height: windowHeight / 14,
    borderRadius: 1000 / 2,
  },
  textProfile: {
    fontWeight: '700',
    fontSize: 10,
    fontFamily: 'Roboto',
    marginTop: windowWidth / 100,
    marginLeft: windowHeight / 84.6,
  },
  textProfileProductive: {
    fontWeight: '700',
    fontSize: 14,
    fontFamily: 'Roboto',
    marginTop: windowWidth / 100,
    marginLeft: windowHeight / 84.6,
  },
  content: {
    flexDirection: 'column',
    width: '100%',
    marginLeft: windowWidth / 42.3,
  },
  titleContent: {
    fontWeight: 'bold',
    fontSize: windowHeight > 800 ? 20 : 14,
    fontFamily: 'Roboto',
    marginTop: windowWidth / 100,
    marginLeft: windowHeight / 84.6,
  },
  textLike: {
    fontSize: windowHeight > 800 ? 10 : 8,
    fontFamily: 'Roboto',
    marginTop: windowWidth / 100,
    marginLeft: windowHeight / 84.6,
  },
  textLikeProductive: {
    fontSize: windowHeight > 800 ? 16 : 12,
    fontFamily: 'Roboto',
    marginTop: windowWidth / 300,
    marginLeft: windowHeight / 84.6,
  },
  iconBack: {
    justifyContent: 'center',
  },
});
