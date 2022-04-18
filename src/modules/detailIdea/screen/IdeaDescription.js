import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import DetailIdeaDesc from '../../../components/DetailIdeaDesc';

const IdeaDescription = () => {
  const stateGlobal = useSelector(state => state);

  return (
    <View style={styles.page}>
      <DetailIdeaDesc
        title={stateGlobal.detailIdea?.desc[0].value}
        desc={stateGlobal.detailIdea?.desc[2].value}
        image={stateGlobal.detailIdea?.desc[1].value}
      />
    </View>
  );
};

export default IdeaDescription;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#EBEFF5',
    borderRadius: 10,
  },
});
