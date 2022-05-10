import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import EditActionButton from './EditActionButton';
import EditMyAchievementField from './EditMyAchievementField';
import Gap from './Gap';
import ModalMessage from './ModalMessage';

const EditMyAchievements = ({
  openModalDiscardReff,
  achievementsToEdit = {},
  onSavePress = () => {},
  onDiscardPress = () => {},
}) => {
  const [messageDiscardEditModalVisible, setMessageDiscardEditModalVisible] =
    useState(false);
  const [messageSuccessModalVisible, setMessageSuccessModalVisible] =
    useState(false);
  const [currentAchievement, setCurrentAchievement] =
    useState(achievementsToEdit);
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    const disable =
      currentAchievement.title === '' ||
      currentAchievement.desc === '' ||
      currentAchievement.date === '';
    disableSaveButton !== disable && setDisableSaveButton(disable);
  }, [currentAchievement]);

  useEffect(() => {
    if (openModalDiscardReff !== undefined) {
      openModalDiscardReff.current = () => discard();
    }
  }, [edited]);

  const discard = () => {
    if (edited) {
      setMessageDiscardEditModalVisible(true);
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
            {achievementsToEdit.title}
          </Text>
          <Gap height={6} />
          <Text
            style={{
              fontFamily: fonts.primary[400],
              fontSize: 12,
              lineHeight: 22,
              color: colors.text.tertiary2,
            }}>
            {achievementsToEdit.desc} {achievementsToEdit.date}
          </Text>
        </View>
      </View>
      <Gap height={16} />
      <EditMyAchievementField
        title={currentAchievement.title}
        issueDate={currentAchievement.date}
        desc={currentAchievement.desc}
        onTitleChange={newTitle => {
          const tempAchievements = {...currentAchievement};
          tempAchievements.title = newTitle;
          setCurrentAchievement(tempAchievements);
          stateEdited();
        }}
        onDescChange={newDesc => {
          const tempAchievements = {...currentAchievement};
          tempAchievements.desc = newDesc;
          setCurrentAchievement(tempAchievements);
          stateEdited();
        }}
        onDateChange={newDate => {
          const tempAchievements = {...currentAchievement};
          tempAchievements.date = newDate;
          setCurrentAchievement(tempAchievements);
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
        visible={messageDiscardEditModalVisible}
        withIllustration
        illustrationType="confused"
        message="Are you sure want to leave this page? You will lose all unsaved progress."
        withCancelButton
        withConfirmButton
        onCancel={() => setMessageDiscardEditModalVisible(false)}
        onConfirm={() => {
          setMessageDiscardEditModalVisible(false);
          onDiscardPress();
        }}
        onRequestClose={() => setMessageDiscardEditModalVisible(false)}
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
            achivement!
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessModalVisible(false);
          onSavePress(currentAchievement);
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          onSavePress(currentAchievement);
        }}
      />
    </>
  );
};

export default EditMyAchievements;

const styles = StyleSheet.create({
  customMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.success,
  },
});
