import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import style from '../config/Style/style.cfg';

const CardCategoryHome = props => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.pictureCard}>
        <Image source={props.image} style={styles.imageCard} />
      </View>
      <View style={styles.titleCard}>
        <Text style={[style.h6, styles.textCard]}>
          The Hustler Guy (Marketing & Business) Sell & Communicate the product.
        </Text>
      </View>
    </View>
  );
};

export default CardCategoryHome;

const styles = StyleSheet.create({
  cardContainer: {
    width: 110,
    height: 175,
  },
  pictureCard: {
    flex: 1,
  },
  titleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageCard: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
  },
  textCard: {
    color: 'black',
    textAlign: 'center',
  },
});
