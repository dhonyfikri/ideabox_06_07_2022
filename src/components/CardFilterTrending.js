import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import style from '../config/Style/style.cfg';

const CardFilterTrending = (props, {navigation}) => {
  return (
    <View style={styles.topBarContainer}>
      <TouchableOpacity onPress={props.getId}>
        <View
          style={[
            styles.barItem,
            {
              backgroundColor: props.backgroundColor,
              borderWidth: 1,
              borderColor: '#095E7B',
            },
          ]}>
          <Text style={[style.h4medium, {color: props.fontColor}]}>
            {props.title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CardFilterTrending;

const styles = StyleSheet.create({
  topBarContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  barItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    marginRight: 5,
    marginLeft: 5,
  },
});
