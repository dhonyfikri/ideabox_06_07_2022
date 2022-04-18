import {StyleSheet, View} from 'react-native';
import DetailLeanCanvasDesc from '../../../components/DetailLeanCanvasDesc';
import {useSelector} from 'react-redux';
import React from 'react';

const LeanCanvas = () => {
  const stateGlobal = useSelector(state => state);

  return (
    <View style={styles.page}>
      <DetailLeanCanvasDesc data={stateGlobal.detailIdea?.lc} />
    </View>
  );
};

export default LeanCanvas;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#EBEFF5',
    borderRadius: 10,
  },
});
