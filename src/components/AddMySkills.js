import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import {
  IcAdd,
  IcOutlinedAdd,
  IcRemoveTag,
  IcVerticalDivider,
} from '../assets/icon';
import ModalMessage from './ModalMessage';

const EditMySkills = ({
  openModalDiscardReff,
  skills = [],
  onSavePress = () => {},
  onDiscardPress,
}) => {
  const [currentSkills, setCurrentSkills] = useState([...skills]);
  const [openInput, setOpenInput] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messageDiscardEditModalVisible, setMessageDiscardEditModalVisible] =
    useState(false);
  const [messageSuccessModalVisible, setMessageSuccessModalVisible] =
    useState(false);

  useEffect(() => {
    if (openModalDiscardReff !== undefined) {
      openModalDiscardReff.current = () =>
        setMessageDiscardEditModalVisible(true);
    }
  }, []);

  return (
    <>
      <View style={styles.container(currentSkills.length > 0)}>
        {currentSkills.map((item, index) => {
          return (
            <View key={index.toString()} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
              <Gap width={2} />
              <IcVerticalDivider />
              <Gap width={2} />
              <TouchableOpacity
                onPress={() => {
                  const newSkillsSet = [...currentSkills];
                  newSkillsSet.splice(index, 1);
                  setCurrentSkills(newSkillsSet);
                }}>
                <IcRemoveTag />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <Gap height={24} />
      {/* {!openInput && ( */}
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
          }}
          onPress={() => {
            if (!openInput) {
              setOpenInput(true);
            }
          }}>
          <IcAdd />
          <Gap width={8} />
          <Text numberOfLines={1} style={styles.addAnotherSkillText}>
            Add another skills
          </Text>
        </TouchableOpacity>
      </View>
      {/* )} */}
      {openInput && (
        <>
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
                  newSkills.push(cleanInputText);
                  setInputText('');
                  setCurrentSkills(newSkills);
                }
              }}>
              <IcOutlinedAdd />
            </TouchableOpacity>
          </View>
        </>
      )}
      <Gap height={24} />
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          style={styles.discardButton}
          onPress={() => setMessageDiscardEditModalVisible(true)}>
          <Text numberOfLines={1} style={styles.discardButtonText}>
            Discard
          </Text>
        </TouchableOpacity>
        <Gap width={16} />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setMessageSuccessModalVisible(true)}>
          <Text numberOfLines={1} style={styles.saveButtonText}>
            Save
          </Text>
        </TouchableOpacity>
      </View>
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
          onSavePress(currentSkills);
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          onSavePress(currentSkills);
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
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  discardButton: {
    width: 105,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButton: {
    width: 105,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
  },
  discardButtonText: {
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color: colors.primary,
  },
  saveButtonText: {
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
  },
  customMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.success,
  },
});
