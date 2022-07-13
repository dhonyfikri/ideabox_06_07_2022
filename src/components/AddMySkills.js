import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IcAdd2,
  IcOutlinedAdd,
  IcTickLight,
  IcVerticalDivider,
} from '../assets/icon';
import {AddMySkillSetAPI, GetSkillSetAPI} from '../config/RequestAPI/UserAPI';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import EditActionButton from './EditActionButton';
import Gap from './Gap';
import ModalMessage from './ModalMessage';
import {useSelector} from 'react-redux';
import LoadingProcessFull from './LoadingProcessFull';

const AddMySkills = ({
  openModalDiscardReff,
  mySkills = [],
  onSavePress = () => {},
  onDiscardPress,
}) => {
  const stateGlobal = useSelector(state => state);
  const [currentSkills, setCurrentSkills] = useState([]);
  const [inputText, setInputText] = useState('');
  const [skillSet, setSkillSet] = useState(null);
  const [fetchSkillSetLoading, setFetchSkillSetLoading] = useState(false);
  const [showFailedFetch, setShowFailedFetch] = useState(false);
  const [messageDiscardAddModalVisible, setMessageDiscardAddModalVisible] =
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

  useEffect(() => {
    if (openModalDiscardReff !== undefined) {
      openModalDiscardReff.current = () => discard();
    }
  }, [edited]);

  const saveNewSkill = () => {
    setLoading({...loading, visible: true});
    AddMySkillSetAPI(
      stateGlobal.userToken,
      currentSkills
        .filter(skill => skill.signed === true)
        .map(item => {
          return item.item.id;
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
    setFetchSkillSetLoading(true);
    setShowFailedFetch(false);
    GetSkillSetAPI(stateGlobal.userToken).then(res => {
      setFetchSkillSetLoading(false);
      if (res.status === 'SUCCESS') {
        const filteredRecomendationSkills = res.data
          .filter(ar => !mySkills.find(rm => rm.id === ar.id))
          .map(item => ({item: item, signed: false, isRecomendation: true}));

        setCurrentSkills(filteredRecomendationSkills);
      } else {
        setShowFailedFetch(true);
      }
    });
  }, []);

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
      {fetchSkillSetLoading && (
        <View style={{alignItems: 'center'}}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
      {showFailedFetch && (
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: fonts.secondary[400],
              fontSize: 14,
              textAlign: 'center',
            }}>
            Server Error!
          </Text>
        </View>
      )}
      <View style={styles.container(currentSkills.length > 0)}>
        {currentSkills.map((item, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={styles.tag(item.signed)}
              onPress={() => {
                const newSkillsSet = [...currentSkills];
                if (item.signed) {
                  if (item.isRecomendation) {
                    newSkillsSet[index].signed = false;
                  } else {
                    newSkillsSet.splice(index, 1);
                  }
                } else {
                  newSkillsSet[index].signed = true;
                }
                setCurrentSkills(newSkillsSet);
                stateEdited();
              }}>
              <Text style={styles.tagText(item.signed)}>{item.item.name}</Text>
              <Gap width={2} />
              <IcVerticalDivider />
              <Gap width={2} />
              <View>{item.signed ? <IcTickLight /> : <IcAdd2 />}</View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Gap height={24} />
      <View style={styles.skillInputContainer}>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder="Temporarily this feature is not used"
          value={inputText}
          onChangeText={text => {
            setInputText(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonSkillInput}
          onPress={() => {
            if (inputText.trim() !== '') {
              // bersihkan teks dari white space dan tanda titik di akhir
              let cleanInputText = inputText.trim();
              while (
                cleanInputText[cleanInputText.length - 1] === '.' ||
                cleanInputText[cleanInputText.length - 1] === ' '
              ) {
                const index = cleanInputText.lastIndexOf('.');
                cleanInputText = cleanInputText.substring(0, index);
                cleanInputText = cleanInputText.trim();
              }

              const newSkills = [...currentSkills];
              newSkills.push({
                item: cleanInputText,
                signed: true,
                isRecomendation: false,
              });
              setInputText('');
              setCurrentSkills(newSkills);
              stateEdited();
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={24} />
      <EditActionButton
        disableSaveButton={
          !edited || currentSkills.filter(item => item.signed).length <= 0
        }
        onDiscardPress={() => discard()}
        onSavePress={() => saveNewSkill()}
      />

      <LoadingProcessFull visible={loading.visible} message={loading.message} />

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
            You have <Text style={styles.customMessageStyle}>added</Text> your
            new skills!
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

export default AddMySkills;

const styles = StyleSheet.create({
  container: dataAvailable => ({
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginRight: dataAvailable ? -8 : 0,
    marginBottom: dataAvailable ? -8 : 0,
  }),
  tag: selected => ({
    flex: -1,
    borderWidth: selected ? 0 : 1,
    backgroundColor: selected ? colors.selectedTag : colors.white,
    borderColor: colors.border2,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 32,
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  tagText: selected => ({
    flex: -1,
    color: selected ? colors.white : colors.text.tertiary2,
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
  }),
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
