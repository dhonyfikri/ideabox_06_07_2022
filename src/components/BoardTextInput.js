import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';

const BoardTextInput = ({
  height = 155,
  borderWidth = 1,
  text,
  placeholder,
  maxLength = 9999999999,
  onChangeText = () => {},
}) => {
  return (
    <View
      style={{
        height: height,
        borderWidth: borderWidth,
        borderColor: colors.border,
        borderRadius: 16,
        overflow: 'hidden',
      }}>
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <TextInput
          multiline
          placeholder={placeholder}
          maxLength={maxLength}
          textAlignVertical="top"
          autoComplete="off"
          autoCorrect={false}
          style={{
            minHeight: height,
            backgroundColor: colors.white,
            padding: 12,
            fontFamily: fonts.primary[400],
            fontSize: 16,
            color: colors.text.secondary,
          }}
          onChangeText={text => {
            onChangeText(text);
          }}>
          <Text style={{lineHeight: 20}}>{text}</Text>
        </TextInput>
      </ScrollView>
    </View>
  );
};

export default BoardTextInput;

const styles = StyleSheet.create({});
