import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CardDetailTeamDesc = props => {
  return (
    <View style={styles.cardContent}>
      <View style={styles.title}>
        <Text>{props.number}</Text>
      </View>
      <View style={styles.email}>
        <Text>{props.name}</Text>
      </View>
      <View style={styles.email}>
        <Text>{props.nip}</Text>
      </View>
      <View style={styles.email}>
        <Text>{props.cfu}</Text>
      </View>
    </View>
  );
};

export default CardDetailTeamDesc;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Roboto-Regular',
  },
  email: {
    flex: 2,
    paddingLeft: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: 'Roboto-Regular',
  },
  cardContent: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
});
