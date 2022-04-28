import React, {useEffect, useState} from 'react';
import {
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
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import EditActionButton from './EditActionButton';
import Gap from './Gap';
import ModalMessage from './ModalMessage';

const AddMySkills = ({
  openModalDiscardReff,
  recomendationSkills = [],
  mySkills = [],
  onSavePress = () => {},
  onDiscardPress,
}) => {
  const [currentSkills, setCurrentSkills] = useState([]);
  const [inputText, setInputText] = useState('');
  const [messageDiscardAddModalVisible, setMessageDiscardAddModalVisible] =
    useState(false);
  const [messageSuccessModalVisible, setMessageSuccessModalVisible] =
    useState(false);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    if (openModalDiscardReff !== undefined) {
      openModalDiscardReff.current = () => discard();
    }
  }, [edited]);

  useEffect(() => {
    const filteredRecomendationSkills = recomendationSkills
      .filter(ar => !mySkills.find(rm => rm.toLowerCase() === ar.toLowerCase()))
      .map(item => ({item: item, signed: false, isRecomendation: true}));

    setCurrentSkills(filteredRecomendationSkills);
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
              <Text style={styles.tagText(item.signed)}>{item.item}</Text>
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
          style={styles.input}
          placeholder="Add another skills"
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
            You have <Text style={styles.customMessageStyle}>added</Text> your
            new skills!
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessModalVisible(false);
          const newSkillsToAdd = currentSkills
            .filter(item => item.signed)
            .map(item => item.item);
          onSavePress(newSkillsToAdd);
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          const newSkillsToAdd = currentSkills
            .filter(item => item.signed)
            .map(item => item.item);
          onSavePress(newSkillsToAdd);
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
