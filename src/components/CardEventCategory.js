import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
const CardEventCategory = props => {
  return (
    <TouchableOpacity onPress={props.getId}>
      <View style={[styles.box, {borderColor: props.borderColor}]}>
        <Image source={props.image} style={styles.image} />
        <View style={styles.text}>
          <Text style={{color: props.textColor}}>{props.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardEventCategory;

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    marginVertical: 15,
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    fontFamily: 'Roboto-Regular',
  },
});
