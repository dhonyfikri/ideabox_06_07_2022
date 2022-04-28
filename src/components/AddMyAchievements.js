import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import {dateToText} from '../utils/DateConfig/DateConvert';
import fonts from '../utils/FontsConfig/Fonts';
import EditActionButton from './EditActionButton';
import EditMyAchievementField from './EditMyAchievementField';
import Gap from './Gap';
import ModalMessage from './ModalMessage';

const AddMyAchievements = ({
  openModalDiscardReff,
  onSavePress = () => {},
  onDiscardPress = () => {},
}) => {
  const [messageDiscardAddModalVisible, setMessageDiscardAddModalVisible] =
    useState(false);
  const [messageSuccessModalVisible, setMessageSuccessModalVisible] =
    useState(false);
  const [achievement, setAchievement] = useState({
    title: '',
    desc: '',
    date: dateToText(new Date()),
  });
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const disable =
      achievement.title === '' ||
      achievement.desc === '' ||
      achievement.date === '';
    disableSaveButton !== disable && setDisableSaveButton(disable);
  }, [achievement]);

  useEffect(() => {
    if (openModalDiscardReff !== undefined) {
      openModalDiscardReff.current = () => discard();
    }
  }, [edited]);

  const discard = () => {
    if (edited) {
      setMessageDiscardAddModalVisible(true);
    } else {
      onDiscardPress();
    }
  };

  const stateEdited = () => {
    if (!edited) {
      setEdited(true);
    }
  };

  return (
    <>
      <EditMyAchievementField
        title={achievement.title}
        issueDate={achievement.date}
        desc={achievement.desc}
        onTitleChange={newTitle => {
          const tempAchievements = {...achievement};
          tempAchievements.title = newTitle;
          setAchievement(tempAchievements);
          stateEdited();
        }}
        onDescChange={newDesc => {
          const tempAchievements = {...achievement};
          tempAchievements.desc = newDesc;
          setAchievement(tempAchievements);
          stateEdited();
        }}
        onDateChange={newDate => {
          const tempAchievements = {...achievement};
          tempAchievements.date = newDate;
          setAchievement(tempAchievements);
          stateEdited();
        }}
      />
      <Gap height={24} />
      <EditActionButton
        disableSaveButton={disableSaveButton || !edited}
        onDiscardPress={() => discard()}
        onSavePress={() => setMessageSuccessModalVisible(true)}
      />

      {/* modal discard confirmation message */}
      <ModalMessage
        visible={messageDiscardAddModalVisible}
        withIllustration
        illustrationType="confused"
        message="Are you sure want to leave this page? You will lose all unsaved progress."
        withCancelButton
        withConfirmButton
        onCancel={() => setMessageDiscardAddModalVisible(false)}
        onConfirm={() => {
          setMessageDiscardAddModalVisible(false);
          onDiscardPress();
        }}
        onRequestClose={() => setMessageDiscardAddModalVisible(false)}
      />

      {/* modal success message */}
      <ModalMessage
        visible={messageSuccessModalVisible}
        withIllustration
        illustrationType="smile"
        title="Success"
        message={
          <Text
            style={{...styles.customMessageStyle, color: colors.text.primary}}>
            You have <Text style={styles.customMessageStyle}>updated</Text> your
            skills!
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessModalVisible(false);
          onSavePress(achievement);
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          onSavePress(achievement);
        }}
      />
    </>
  );
};

export default AddMyAchievements;

const styles = StyleSheet.create({
  customMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.success,
  },
});
