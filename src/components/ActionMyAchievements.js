import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcActivePencilEdit, IcActiveTrash} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Divider from './Divider';
import EditMyAchievementField from './EditMyAchievementField';
import Gap from './Gap';
import ModalMessage from './ModalMessage';

const ActionMyAchievements = ({
  achievements = [],
  onItemEdit = () => {},
  onItemDelete = () => {},
}) => {
  const [
    messageDeleteConfirmationModalVisible,
    setMessageDeleteConfirmationModalVisible,
  ] = useState(false);
  const [messageSuccessModalVisible, setMessageSuccessModalVisible] =
    useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);

  return (
    <>
      {achievements.map((item, index) => {
        return (
          <View key={index.toString()}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                }}>
                <Text
                  style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    lineHeight: 15,
                    color: colors.text.tertiary3,
                  }}>
                  {item.title}
                </Text>
                <Gap height={6} />
                <Text
                  style={{
                    fontFamily: fonts.primary[400],
                    fontSize: 12,
                    lineHeight: 22,
                    color: colors.text.tertiary2,
                  }}>
                  {item.desc} {item.date}
                </Text>
              </View>
              <Gap width={18} />
              <TouchableOpacity
                style={{
                  height: '100%',
                  maxHeight: 30,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}
                onPress={() => {
                  onItemEdit(index);
                }}>
                <IcActivePencilEdit />
              </TouchableOpacity>
              <Gap width={18} />
              <TouchableOpacity
                style={{
                  height: '100%',
                  maxHeight: 30,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}
                onPress={() => {
                  setIndexToDelete(index);
                  setMessageDeleteConfirmationModalVisible(true);
                }}>
                <IcActiveTrash />
              </TouchableOpacity>
            </View>
            {index + 1 !== achievements.length && <Gap height={16} />}
          </View>
        );
      })}

      {/* modal delete confirmation message */}
      <ModalMessage
        visible={messageDeleteConfirmationModalVisible}
        withIllustration
        illustrationType="confused"
        message={
          <Text
            style={{...styles.customMessageStyle, color: colors.text.primary}}>
            Are you sure want to{' '}
            <Text style={styles.customMessageStyle}>delete</Text> this
            achivement? {achievements[indexToDelete]?.title}
          </Text>
        }
        withCancelButton
        withConfirmButton
        onCancel={() => setMessageDeleteConfirmationModalVisible(false)}
        onConfirm={() => {
          setMessageDeleteConfirmationModalVisible(false);
          setMessageSuccessModalVisible(true);
        }}
        onRequestClose={() => setMessageDeleteConfirmationModalVisible(false)}
      />

      {/* modal success message */}
      <ModalMessage
        visible={messageSuccessModalVisible}
        withIllustration
        illustrationType="confused"
        title="Success"
        message={
          <Text
            style={{...styles.customMessageStyle, color: colors.text.primary}}>
            You have <Text style={styles.customMessageStyle}>deleted</Text> your
            achivement!
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessModalVisible(false);
          onItemDelete(indexToDelete);
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          onItemDelete(indexToDelete);
        }}
      />
    </>
  );
};

export default ActionMyAchievements;

const styles = StyleSheet.create({
  customMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.alert,
  },
});
