import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const CardAchievement = props => {
  return (
    <View style={styles.container}>
      <View style={styles.pictureContainer}>
        <Image
          source={require('../assets/image/achievment.png')}
          style={{height: '100%', aspectRatio: 1}}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {props.title}
        </Text>
        <Text style={styles.desc}>{props.desc}</Text>
      </View>
      <TouchableOpacity
        onPress={props.delete}
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image
          source={require('../assets/icon/trashblue.png')}
          style={{flex: 1, width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CardAchievement;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: 60,
    flexDirection: 'row',
    marginBottom: 10,
    marginHorizontal: 5,
    flexWrap: 'wrap',
  },
  pictureContainer: {
    flex: 0.5,
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    flex: 2,
    paddingHorizontal: 10,
  },
  title: {
    color: '#085D7A',
    fontSize: 14,
    fontWeight: '700',
  },
  desc: {
    color: '#085D7A',
    fontSize: 9,
    fontWeight: '500',
  },
});
