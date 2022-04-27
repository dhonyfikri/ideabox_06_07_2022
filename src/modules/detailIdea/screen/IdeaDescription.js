import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../utils/ColorsConfig/Colors';
import DetailIdeaDesc from '../../../components/DetailIdeaDesc';
import Gap from '../../../components/Gap';

const IdeaDescription = () => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  const isFocus = useIsFocused();
  console.log('idea desc ', isFocus);
  if (
    isFocus &&
    stateGlobal.detailIdeaPageHeight !== stateGlobal.ideaDescHeight + 262
  ) {
    dispatch({
      type: 'SET_DETAIL_IDEA_PAGE_HEIGHT',
      value: stateGlobal.ideaDescHeight + 262,
    });
  }
  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, height) => {
          dispatch({
            type: 'SET_IDEA_DESC_HEIGHT',
            value: height,
          });
        }}>
        <DetailIdeaDesc
          title={stateGlobal.detailIdea?.desc[0].value}
          desc={stateGlobal.detailIdea?.desc[2].value}
          image={stateGlobal.detailIdea?.desc[1].value}
        />
        {/* <Gap height={10} /> */}
      </ScrollView>
    </View>
  );
};

export default IdeaDescription;

const styles = StyleSheet.create({
  page: {
    paddingVertical: 12,
    paddingHorizontal: 13,
    backgroundColor: colors.tertiary,
    borderRadius: 16,
  },
});
