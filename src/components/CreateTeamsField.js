import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useSelector} from 'react-redux';
import {
  IcActiveTrash,
  IcChevronDown,
  IcOutlinedClose,
  IcTickGreen,
} from '../assets/icon';
import {GetUserByEmail} from '../config/RequestAPI/UserAPI';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Divider from './Divider';
import Gap from './Gap';
import LoadingProcessFull from './LoadingProcessFull';
import ModalMessage from './ModalMessage';
import ModalUserSearchPreview from './ModalUserSearchPreview';

const CreateTeamsField = ({
  disableEmailField = false,
  title,
  withSelfDelete,
  onSelfDelete,
  allUserData,
  emailValue,
  onVerifiedEmail = () => {},
  onEmailChange = () => {},
  nameValue,
  onNameChange = () => {},
  teamStructureItem,
  selectedTeamStructure = null,
  onTeamStructureChange = () => {},
  workingLocationValue,
  onWorkingLocationChange = () => {},
  unitValue,
  onUnitChange = () => {},
}) => {
  const stateGlobal = useSelector(state => state);
  const [userSearchResult, setUserSearchResult] = useState(null);
  const [modalUserPreview, setModalUserPreview] = useState(false);
  const [showEmailSugestion, setShowEmailSugestion] = useState(false);
  const [loading, setLoading] = useState({
    visible: false,
    message: 'Please Wait',
  });
  const [messageModal, setMessageModal] = useState({
    visible: false,
    message: undefined,
    title: undefined,
    type: 'smile',
    onClose: () => {},
  });
  const [openDropdownTeamStructure, setOpenDropdownTeamStructure] =
    useState(false);
  const [valueDropdownTeamStructure, setValueDropdownTeamStructure] = useState(
    selectedTeamStructure,
  );
  const [itemsDropdownTeamStructure, setItemsDropdownTeamStructure] =
    useState(teamStructureItem);

  const emailCheck = () => {
    setLoading({...loading, visible: true});
    GetUserByEmail(stateGlobal.userToken, emailValue).then(res => {
      setLoading({...loading, visible: false});
      if (res.status === 'SUCCESS') {
        setUserSearchResult(res.data);
        setModalUserPreview(true);
      } else if (
        res.status === 'SOMETHING_WRONG' ||
        res.status === 'FAILED' ||
        res.status === 'SERVER_ERROR'
      ) {
        setMessageModal({
          ...messageModal,
          visible: true,
          title: 'Failed',
          message: res.message,
          type: 'confused',
        });
      }
    });
  };

  useEffect(() => {
    onTeamStructureChange(valueDropdownTeamStructure);
  }, [valueDropdownTeamStructure]);

  useEffect(() => {
    setValueDropdownTeamStructure(selectedTeamStructure);
  }, [selectedTeamStructure]);

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text>{title}</Text>
        {withSelfDelete && (
          <TouchableOpacity
            style={{
              paddingLeft: 20,
            }}
            onPress={onSelfDelete}>
            <IcActiveTrash />
          </TouchableOpacity>
        )}
      </View>
      <Gap height={10} />
      <Divider />
      <Gap height={16} />
      <Text style={styles.fieldTitle}>Email</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={styles.field(disableEmailField)}>
          <TextInput
            style={styles.titleInput}
            editable={!disableEmailField}
            keyboardType="email-address"
            maxLength={100}
            placeholder="Email"
            onChangeText={text => {
              onEmailChange(text);
            }}
            onFocus={() => setShowEmailSugestion(true)}>
            <Text style={{...styles.titleInput, lineHeight: 20}}>
              {emailValue}
            </Text>
          </TextInput>
        </View>
        <Gap width={8} />
        {(!nameValue || !nameValue?.length > 0) && (
          <TouchableOpacity
            disabled={emailValue.trim().length === 0}
            style={{
              backgroundColor:
                emailValue.trim().length > 0 ? colors.primary : colors.divider,
              paddingHorizontal: 12,
              justifyContent: 'center',
              borderRadius: 8,
            }}
            onPress={emailCheck}>
            <Text
              style={{
                color: colors.white,
                fontFamily: fonts.secondary[600],
                fontSize: 12,
              }}>
              Check
            </Text>
          </TouchableOpacity>
        )}
        {nameValue && nameValue?.length > 0 ? (
          <View
            style={{
              justifyContent: 'center',
            }}>
            <IcTickGreen />
          </View>
        ) : (
          <></>
        )}
      </View>
      <Gap height={16} />
      {showEmailSugestion && (
        <>
          <View
            style={{
              height: 200,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: colors.border,
            }}>
            <FlatList
              data={
                emailValue.trim().length === 0
                  ? allUserData
                  : allUserData.filter(item =>
                      item.email.includes(emailValue.trim()),
                    )
              }
              contentContainerStyle={{padding: 8}}
              nestedScrollEnabled={true}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              inverted={false}
              renderItem={({item, index}) => {
                return (
                  <>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.dot,
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 8,
                      }}
                      onPress={() => {
                        onEmailChange(item.email);
                        setShowEmailSugestion(false);
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: fonts.secondary[400],
                          fontSize: 12,
                        }}>
                        {item.email}
                      </Text>
                    </TouchableOpacity>
                    {index !== allUserData.length - 1 && <Gap height={8} />}
                  </>
                );
              }}
            />
          </View>
          <Gap height={16} />
        </>
      )}

      <Text style={styles.fieldTitle}>Name</Text>
      <View style={styles.field(true)}>
        <TextInput
          style={styles.titleInput}
          editable={false}
          placeholder="Nama"
          onChangeText={text => {
            onNameChange(text);
          }}>
          <Text style={{...styles.titleInput, lineHeight: 20}}>
            {nameValue}
          </Text>
        </TextInput>
      </View>
      <Gap height={16} />
      {/* dropdown team structure */}
      <Text style={styles.fieldTitle}>Team Structure</Text>
      <DropDownPicker
        open={openDropdownTeamStructure}
        value={valueDropdownTeamStructure}
        items={itemsDropdownTeamStructure}
        setOpen={setOpenDropdownTeamStructure}
        setValue={setValueDropdownTeamStructure}
        setItems={setItemsDropdownTeamStructure}
        placeholder="Choose"
        ArrowUpIconComponent={({style}) => (
          <IcChevronDown style={{...style, marginRight: 8}} />
        )}
        ArrowDownIconComponent={({style}) => (
          <IcChevronDown style={{...style, marginRight: 8}} />
        )}
        CloseIconComponent={({style}) => (
          <IcOutlinedClose style={{...style, marginRight: -10}} />
        )}
        closeAfterSelecting={true}
        containerStyle={styles.dropdownWrapper}
        style={styles.dropdownCore}
        listMode="MODAL"
        modalProps={{
          animationType: 'fade',
          transparent: true,
          presentationStyle: 'overFullScreen',
        }}
        modalTitle="Team Structure"
        modalTitleStyle={styles.dropdownModalTitle}
        listItemLabelStyle={styles.dropdownListItemLabel}
        modalContentContainerStyle={styles.dropdownModalContentContainer}
        labelStyle={styles.dropdownLabel}
        placeholderStyle={styles.dropdownPlaceholder}
      />
      <Gap height={16} />
      <Text style={styles.fieldTitle}>Working Location</Text>
      <View style={styles.field(true)}>
        <TextInput
          style={styles.titleInput}
          editable={false}
          placeholder="Alamat"
          onChangeText={text => {
            onWorkingLocationChange(text);
          }}>
          <Text style={{...styles.titleInput, lineHeight: 20}}>
            {workingLocationValue}
          </Text>
        </TextInput>
      </View>
      <Gap height={16} />
      <Text style={styles.fieldTitle}>Unit</Text>
      <View style={styles.field(true)}>
        <TextInput
          style={styles.titleInput}
          editable={false}
          placeholder="Unit"
          onChangeText={text => {
            onUnitChange(text);
          }}>
          <Text style={{...styles.titleInput, lineHeight: 20}}>
            {unitValue}
          </Text>
        </TextInput>
      </View>
      <LoadingProcessFull visible={loading.visible} message={loading.message} />
      {/* modal user search preview */}
      <ModalUserSearchPreview
        visible={modalUserPreview}
        picture={userSearchResult?.pictures}
        unit={userSearchResult?.unit}
        name={userSearchResult?.name}
        onCloseButtonPress={() => setModalUserPreview(false)}
        onRequestClose={() => setModalUserPreview(false)}
        onCancel={() => setModalUserPreview(false)}
        onConfirm={() => {
          setModalUserPreview(false);
          setShowEmailSugestion(false);
          onVerifiedEmail(userSearchResult);
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

export default CreateTeamsField;

const styles = StyleSheet.create({
  fieldTitle: {
    marginBottom: 8,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
  },
  field: (disabled = false) => ({
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 1.5,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 32,
    backgroundColor: disabled ? colors.divider : colors.white,
  }),
  titleInput: {
    padding: 0,
    fontFamily: fonts.secondary[400],
    fontSize: 16,
    color: colors.text.primary,
  },
  dropdownWrapper: {
    borderWidth: 1,
    borderRadius: 32,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  dropdownCore: {borderWidth: 0, minHeight: 0, height: 32},
  dropdownModalTitle: {
    fontFamily: fonts.secondary[500],
    fontSize: 16,
    lineHeight: 20,
    color: colors.text.primary,
    marginLeft: -10,
  },
  dropdownListItemLabel: {
    fontFamily: fonts.secondary[400],
    fontSize: 16,
    lineHeight: 20,
    color: colors.text.primary,
  },
  dropdownModalContentContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 60,
    marginVertical: 200,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 50,
  },
  dropdownLabel: {
    color: colors.text.primary,
    fontFamily: fonts.secondary[400],
    fontSize: 16,
    lineHeight: 20,
  },
  dropdownPlaceholder: {
    color: colors.text.tertiary,
    fontFamily: fonts.secondary[400],
    fontSize: 16,
    lineHeight: 20,
  },
});
