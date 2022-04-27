import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import CardDetailTeamDesc from '../../../components/CardDetailTeamsDesc';
import React from 'react';
import {colors} from '../../../utils/ColorsConfig/Colors';
import {useIsFocused} from '@react-navigation/native';
import fonts from '../../../utils/FontsConfig/Fonts';

const Teams = () => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  const isFocus = useIsFocused();
  console.log('lean canvas ', isFocus);

  if (
    isFocus &&
    stateGlobal.detailIdeaPageHeight !== stateGlobal.teamsHeight + 246
  ) {
    dispatch({
      type: 'SET_DETAIL_IDEA_PAGE_HEIGHT',
      value: stateGlobal.teamsHeight + 246,
    });
  }

  return (
    <View style={styles.page}>
      <ScrollView
        contentContainerStyle={{minHeight: 250}}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(_, height) => {
          dispatch({
            type: 'SET_TEAMS_HEIGHT',
            value: height,
          });
        }}>
        {stateGlobal.detailIdea !== null &&
          (stateGlobal.detailIdea?.approval.length > 0 ? (
            stateGlobal.detailIdea?.approval.map((item, index) => {
              return (
                <CardDetailTeamDesc
                  no={index + 1}
                  nama={item.approvalTo.name}
                  nip={item.approvalTo.nik}
                  unit={item.approvalTo.unitName}
                />
              );
            })
          ) : (
            <View
              style={{
                flex: 1,
                marginBottom: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: fonts.secondary[500],
                  fontSize: 12,
                }}>
                Not Available
              </Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Teams;

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: colors.tertiary,
    borderRadius: 16,
  },
});
