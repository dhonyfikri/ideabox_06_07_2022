import {useIsFocused} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Gap from '../../../components/Gap';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';

const MainCreateIdea = ({navigation, route}) => {
  const isFocused = useIsFocused();
  if (isFocused) {
    navigation.reset({
      index: 1,
      routes: [{name: 'TabNavigation'}, {name: 'CreateIdeaStep'}],
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Create Idea</Text>
      <Gap height={24} />
      <TouchableOpacity
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 12,
        }}
        onPress={() => navigation.navigate('CreateIdeaStep')}>
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            fontSize: 14,
            lineHeight: 16,
            color: colors.white,
          }}>
          Lets Create Idea
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainCreateIdea;

const styles = StyleSheet.create({});
