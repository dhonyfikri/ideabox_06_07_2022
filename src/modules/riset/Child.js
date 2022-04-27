import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Child = ({childFunc, name}) => {
  // useEffect(() => {
  //   childFunc.current = () => print(name);
  // }, []);

  const print = params => {
    console.log(params, 'print from child');
  };

  return (
    <View style={{backgroundColor: 'yellow', padding: 20}}>
      <Text>Child</Text>
    </View>
  );
};

export default Child;

const styles = StyleSheet.create({});
