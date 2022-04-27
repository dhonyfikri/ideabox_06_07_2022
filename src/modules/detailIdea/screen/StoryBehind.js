import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import DetailStoryBehindDesc from '../../../components/DetailStoryBehind';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';
import Gap from '../../../components/Gap';
import MultilineTextView from '../../../components/MultilineTextView';

const StoryBehind = () => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  const isFocus = useIsFocused();
  console.log('story behind ', isFocus);

  if (
    isFocus &&
    stateGlobal.detailIdeaPageHeight !== stateGlobal.storyBehindHeight + 262
  ) {
    dispatch({
      type: 'SET_DETAIL_IDEA_PAGE_HEIGHT',
      value: stateGlobal.storyBehindHeight + 262,
    });
  }

  return (
    <View style={styles.page}>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, height) => {
          dispatch({
            type: 'SET_STORY_BEHIND_HIGHT',
            value: height,
          });
        }}>
        <Gap height={4} />
        <Text style={styles.title}>Why</Text>
        <Gap height={4} />
        <MultilineTextView
          text={stateGlobal.detailIdea?.gc[0].value}
          height={150}
        />
        <Gap height={21} />
        <Text style={styles.title}>How</Text>
        <Gap height={4} />
        <MultilineTextView
          text={stateGlobal.detailIdea?.gc[1].value}
          height={150}
        />
        <Gap height={21} />
        <Text style={styles.title}>What</Text>
        <Gap height={4} />
        <MultilineTextView
          text={stateGlobal.detailIdea?.gc[2].value}
          height={150}
        />
      </ScrollView>
    </View>
  );
};

export default StoryBehind;

const styles = StyleSheet.create({
  page: {
    padding: 12,
    backgroundColor: colors.tertiary,
    borderRadius: 16,
  },
  title: {
    fontFamily: fonts.secondary[500],
    color: colors.text.primary,
    fontSize: 16,
    lineHeight: 25.6,
  },
});
