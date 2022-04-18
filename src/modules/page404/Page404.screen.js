import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Page404 = () => {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>404 - Page not found</Text>
    </View>
  );
};

export default Page404;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
