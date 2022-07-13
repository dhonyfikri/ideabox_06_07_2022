import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcRemoveTag, IcVerticalDivider} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import EditActionButton from './EditActionButton';
import Gap from './Gap';
import ModalMessage from './ModalMessage';
import {useSelector} from 'react-redux';
import {EditMySkillSetAPI} from '../config/RequestAPI/UserAPI';
import LoadingProcessFull from './LoadingProcessFull';

const EditMySkills = ({
  openModalDiscardReff,
  skills = [],
  onSavePress = () => {},
  onDiscardPress,
}) => {
  const stateGlobal = useSelector(state => state);
  const [currentSkills, setCurrentSkills] = useState([...skills]);
  const [messageDiscardEditModalVisible, setMessageDiscardEditModalVisible] =
    useState(false);
  const [messageSuccessModalVisible, setMessageSuccessModalVisible] =
    useState(false);
  const [edited, setEdited] = useState(false);
  const [messageModal, setMessageModal] = useState({
    visible: false,
    message: undefined,
    title: undefined,
    type: 'smile',
    onClose: () => {},
  });
  const [loading, setLoading] = useState({
    visible: false,
    message: 'Please wait',
  });

  const saveEditSkill = () => {
    setLoading({...loading, visible: true});
    EditMySkillSetAPI(
      stateGlobal.userToken,
      currentSkills
        .filter(skill => true)
        .map(item => {
          return item.id;
        }),
    ).then(res => {
      setLoading({...loading, visible: false});
      if (res.status === 'SUCCESS') {
        setMessageSuccessModalVisible(true);
      } else {
        setMessageModal({
          ...messageModal,
          visible: true,
          title: 'Failed',
          message: 'Server Error!',
          type: 'confused',
        });
      }
    });
  };

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
      <View style={styles.container(currentSkills.length > 0)}>
        {currentSkills.length === 0 && (
          <Text style={styles.tagText}>No Skills</Text>
        )}
        {currentSkills.map((item, index) => {
          return (
            <View key={index.toString()} style={styles.tag}>
              <Text style={styles.tagText}>{item.name}</Text>
              <Gap width={2} />
              <IcVerticalDivider />
              <Gap width={2} />
              <TouchableOpacity
                onPress={() => {
                  const newSkillsSet = [...currentSkills];
                  newSkillsSet.splice(index, 1);
                  setCurrentSkills(newSkillsSet);
                  stateEdited();
                }}>
                <IcRemoveTag />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <Gap height={24} />
      <EditActionButton
        disableSaveButton={!edited}
        onDiscardPress={() => discard()}
        onSavePress={() => saveEditSkill()}
      />

      <LoadingProcessFull visible={loading.visible} message={loading.message} />

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
            skills!
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessModalVisible(false);
          onSavePress();
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          onSavePress();
        }}
      />

      {/* modal message */}
      <ModalMessage
        visible={messageModal.visible}
        withIllustration
        illustrationType={messageModal.type}
        title={messageModal.title}
        message={messageModal.message}
        withBackButton
        onBack={() => {
          setMessageModal({...messageModal, visible: false});
          messageModal.onClose();
        }}
        onRequestClose={() => {
          setMessageModal({...messageModal, visible: false});
          messageModal.onClose();
        }}
      />
    </>
  );
};

export default EditMySkills;

const styles = StyleSheet.create({
  container: dataAvailable => ({
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginRight: dataAvailable ? -8 : 0,
    marginBottom: dataAvailable ? -8 : 0,
  }),
  tag: {
    flex: -1,
    borderWidth: 1,
    borderColor: colors.border2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 32,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagText: {
    flex: -1,
    color: colors.text.tertiary2,
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
  },
  addAnotherSkillText: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.primary,
  },
  skillInputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 32,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 29,
    paddingVertical: 0,
    paddingHorizontal: 12,
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.primary,
  },
  buttonSkillInput: {
    width: 72,
    height: 29,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.success,
  },
});
