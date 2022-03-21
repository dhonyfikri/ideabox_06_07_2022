import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import style from '../config/Style/style.cfg';

const CardDashboard = props => {
  return (
    <View style={[styles.card, {marginRight: props.marginRight}]}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Image source={props.icon} style={styles.icon} />
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[style.h4, styles.textTotal]}>{props.total}</Text>
          <Text style={[style.h4medium, styles.textItem]}>
            Total {props.item}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardDashboard;

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    width: 65,
    height: 65,
  },
  textTotal: {
    color: '#085D7A',
  },
  textItem: {
    fontSize: 13,
  },
});
