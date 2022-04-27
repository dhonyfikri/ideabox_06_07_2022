import {StyleSheet, View, ScrollView} from 'react-native';
import DetailLeanCanvasDesc from '../../../components/DetailLeanCanvasDesc';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {colors} from '../../../utils/ColorsConfig/Colors';
import LeanCanvasItem from '../../../components/LeanCanvasItem';

const LeanCanvas = () => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  const isFocus = useIsFocused();
  console.log('lean canvas ', isFocus);

  if (
    isFocus &&
    stateGlobal.detailIdeaPageHeight !== stateGlobal.leanCanvasHeight + 246
  ) {
    dispatch({
      type: 'SET_DETAIL_IDEA_PAGE_HEIGHT',
      value: stateGlobal.leanCanvasHeight + 246,
    });
  }

  const customerLC = [];
  const problemLC = [];
  const earlyAdopterLC = [];
  const existingSolutionLC = [];
  const uniqueValueLC = [];
  const proposedSolutionLC = [];

  stateGlobal.detailIdea?.lc.map(res => {
    if (res.field === 'customer') {
      customerLC.push(res.value);
    }
    if (res.field === 'problem') problemLC.push(res.value);
    if (res.field === 'earlyAdopter') earlyAdopterLC.push(res.value);
    if (res.field === 'existingSolution') existingSolutionLC.push(res.value);
    if (res.field === 'uniqueValue') uniqueValueLC.push(res.value);
    if (res.field === 'proposedSolution') proposedSolutionLC.push(res.value);
  });

  return (
    <View style={styles.page}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, height) => {
          dispatch({
            type: 'SET_LEAN_CANVAS_HEIGHT',
            value: height,
          });
        }}>
        <LeanCanvasItem
          title="CUSTOMER, siapa yang ingin kamu solusikan?"
          mandatory
          content={customerLC}
        />
        <LeanCanvasItem
          title="PROBLEM, apa problem mereka yang ingin disolusikan?"
          mandatory
          content={problemLC}
        />
        <LeanCanvasItem
          title="EARLY ADOPTER, siapa saja dari target di atas yg bisa kamu gapai duluan
        dalam 3 bln ke depan?"
          mandatory
          content={earlyAdopterLC}
        />
        <LeanCanvasItem
          title="EXISTING SOLUTION, per hari ini, bagaimana biasanya mereka mensolusikan
        probem-problem itu?"
          mandatory
          content={existingSolutionLC}
        />
        <LeanCanvasItem
          title="UNIQUE VALUE, apa yang bikin kamu berbeda dan keren, jadi mereka mau
        pindah ke kamu?"
          mandatory
          content={uniqueValueLC}
        />
        <LeanCanvasItem
          title="PROPOSED SOLUTION, so, jadi apa yang akan/sedang kamu buat agar mereka
        bisa cinta banget sama kamu?"
          mandatory
          content={proposedSolutionLC}
        />
      </ScrollView>
    </View>
  );
};

export default LeanCanvas;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: colors.tertiary,
    borderRadius: 16,
  },
});
