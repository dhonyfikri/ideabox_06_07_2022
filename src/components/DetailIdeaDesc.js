import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {windowHeight} from './WindowDimensions';

const DetailIdeaDesc = props => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrap}>
        <Image source={{uri: props.image}} style={styles.imageContent} />
      </View>
      <Text style={styles.h2}>Idea Description</Text>
      <Text style={styles.text(false)}>{props.title}</Text>
      <Text style={styles.h2}>Deskrispsi Ide</Text>
      <Text style={styles.text(true)}>{props.desc}</Text>
    </ScrollView>
  );
};

export default DetailIdeaDesc;
const styles = StyleSheet.create({
  text: isLast => ({
    color: 'black',
    fontSize: 12,
    marginBottom: isLast ? 0 : 10,
    textAlign: 'justify',
  }),
  textnoedit: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#DBDBDB',
    borderColor: '#085D7A',
    marginBottom: 10,
    color: 'black',
    height: 20,
    fontSize: 12,
    paddingLeft: 7,
    paddingTop: 2,
  },
  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#085D7A',
  },
  imageWrap: {
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
  },
  imageContent: {
    width: '100%',
    height: windowHeight / 3,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});
