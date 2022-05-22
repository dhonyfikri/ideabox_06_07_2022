import React from 'react';
import {StyleSheet, Text, TextInput, ScrollView, View} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import BoardTextInput from './BoardTextInput';
import CardCreateIdeaSession from './CardCreateIdeaSession';
import Gap from './Gap';

const EditStoryBehind = ({
  why,
  how,
  what,
  onWhyChange = () => {},
  onHowChange = () => {},
  onWhatChange = () => {},
}) => {
  return (
    <CardCreateIdeaSession>
      <Text style={styles.fieldTitle}>
        Why “What is your case? What do you believe?”
      </Text>
      <BoardTextInput
        text={why}
        placeholder="(Max. 1000 Characters)"
        maxLength={1000}
        height={155}
        onChangeText={text => {
          onWhyChange(text);
        }}
      />
      <Gap height={16} />
      <Text style={styles.fieldTitle}>
        How “Specific actions taken to realise your Why. How do you achieve your
        Why?”
      </Text>
      <BoardTextInput
        text={how}
        placeholder="(Max. 1000 Characters)"
        maxLength={1000}
        height={155}
        onChangeText={text => {
          onHowChange(text);
        }}
      />
      <Gap height={16} />
      <Text style={styles.fieldTitle}>
        What “What do you offer to achieve your Why?”
      </Text>
      <BoardTextInput
        text={what}
        placeholder="(Max. 1000 Characters)"
        maxLength={1000}
        height={155}
        onChangeText={text => {
          onWhatChange(text);
        }}
      />
    </CardCreateIdeaSession>
  );
};

export default EditStoryBehind;

const styles = StyleSheet.create({
  fieldTitle: {
    marginBottom: 8,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
  },
});
