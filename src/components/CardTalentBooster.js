import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from './WindowDimensions';

const CardTalentBooster = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContentContainer}>
        <Image
          source={props.image}
          style={{
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            width: '100%',
          }}
        />
      </View>
      <View style={styles.titleContentContainer}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardTalentBooster;

const styles = StyleSheet.create({
  container: {
    width: (175 / 414) * windowWidth,
    height: (200 / 896) * windowHeight,
    borderRadius: 5,
    marginRight: 15,
  },
  imageContentContainer: {
    flex: 1.4,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
  },
  titleContentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
    color: '#000000',
  },
  button: {
    backgroundColor: '#34A68A',
    height: 25,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
  },
});
