import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import DetailStoryBehindDesc from '../../../components/DetailStoryBehind';
import React from 'react';

const StoryBehind = () => {
  const stateGlobal = useSelector(state => state);

  return (
    <View style={styles.page}>
      <DetailStoryBehindDesc
        why={stateGlobal.detailIdea?.gc[0].value}
        how={stateGlobal.detailIdea?.gc[1].value}
        what={stateGlobal.detailIdea?.gc[2].value}
      />
    </View>
  );
};

export default StoryBehind;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#EBEFF5',
    borderRadius: 10,
  },
});
