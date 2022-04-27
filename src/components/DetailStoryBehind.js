import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const DetailStoryBehindDesc = props => {
  return (
    <View>
      <Text style={styles.h2(true)}>Why</Text>
      <View style={styles.box}>
        <ScrollView>
          <Text style={styles.text}>{props.why}</Text>
        </ScrollView>
      </View>
      <Text style={styles.h2(false)}>How</Text>
      <View style={styles.box}>
        <ScrollView>
          <Text style={styles.text}>{props.how}</Text>
        </ScrollView>
      </View>
      <Text style={styles.h2(false)}>What</Text>
      <View style={styles.box}>
        <ScrollView>
          <Text style={styles.text}>{props.what}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailStoryBehindDesc;
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify',
  },
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
  h2: isFirst => ({
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#085D7A',
    marginTop: isFirst ? 0 : 10,
  }),
  box: {
    height: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
});
