import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PageFour = () => {
  return (
    <View style={styles.page}>
      <Text>PageFour</Text>
    </View>
  );
};

export default PageFour;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
