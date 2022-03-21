import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

const DetailLeanCanvasDesc = props => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h2}>
          CUSTOMER, siapa yang ingin kamu solusikan?*
        </Text>
        <View style={styles.inputContainer}>
          {props.data.map(res => {
            if (res.field === 'customer') {
              return (
                <View>
                  <Text style={styles.textnoedit}>{res.value}</Text>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.h2}>
          PROBLEM, apa problem mereka yang ingin disolusikan?*
        </Text>
        <View style={styles.inputContainer}>
          {props.data.map(res => {
            if (res.field === 'problem') {
              return (
                <View>
                  <Text style={styles.textnoedit}>{res.value}</Text>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.h2}>
          EARLY ADOPTER, siapa saja dari target di atas yg bisa kamu gapai
          duluan dalam 3 bln ke depan?*
        </Text>
        <View style={styles.inputContainer}>
          {props.data.map(res => {
            if (res.field === 'earlyAdopter') {
              return (
                <View>
                  <Text style={styles.textnoedit}>{res.value}</Text>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.h2}>
          EXISTING SOLUTION, per hari ini, bagaimana biasanya mereka
          mensolusikan probem-problem itu?*
        </Text>
        <View style={styles.inputContainer}>
          {props.data.map(res => {
            if (res.field === 'existingSolution') {
              return (
                <View>
                  <Text style={styles.textnoedit}>{res.value}</Text>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.h2}>
          UNIQUE VALUE, apa yang bikin kamu berbeda dan keren, jadi mereka mau
          pindah ke kamu?*
        </Text>
        <View style={styles.inputContainer}>
          {props.data.map(res => {
            if (res.field === 'uniqueValue') {
              return (
                <View>
                  <Text style={styles.textnoedit}>{res.value}</Text>
                </View>
              );
            }
          })}
        </View>
        <Text style={styles.h2}>
          PROPOSED SOLUTION, so, jadi apa yang akan/sedang kamu buat agar mereka
          bisa cinta banget sama kamu?*
        </Text>
        <View style={styles.inputContainer}>
          {props.data.map(res => {
            if (res.field === 'proposedSolution') {
              return (
                <View>
                  <Text style={styles.textnoedit}>{res.value}</Text>
                </View>
              );
            }
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailLeanCanvasDesc;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  text: {
    color: 'black',
    fontSize: 12,
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#DBDBDB',
    borderColor: '#085D7A',
    marginVertical: 10,
    padding: 5,
  },
  textnoedit: {
    color: 'black',

    fontSize: 12,
  },
  h2: {
    fontSize: 14,
    color: '#085D7A',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
});
