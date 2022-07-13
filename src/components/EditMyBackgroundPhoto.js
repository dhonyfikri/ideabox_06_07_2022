import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {IcCamera} from '../assets/icon';
import EditActionButton from '../components/EditActionButton';
import {EditBackgroundAPI} from '../config/RequestAPI/UserAPI';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import ModalMessage from './ModalMessage';
import {useSelector} from 'react-redux';
import LoadingProcessFull from './LoadingProcessFull';

const EditMyBackgroundPhoto = ({
  openModalDiscardReff,
  backgroundPhoto,
  onSavePress = () => {},
  onDiscardPress = () => {},
}) => {
  const stateGlobal = useSelector(state => state);
  const [currentBackgroundPhoto, setCurrentBackgroundPhoto] = useState(
    backgroundPhoto === '' ? null : backgroundPhoto,
  );
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
    message: 'Please Wait',
  });

  useEffect(() => {
    if (openModalDiscardReff !== undefined) {
      openModalDiscardReff.current = () => discard();
    }
  }, [edited]);

  const saveEditBackground = () => {
    setLoading({...loading, visible: true});
    EditBackgroundAPI(stateGlobal.userToken, currentBackgroundPhoto).then(
      res => {
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
      },
    );
  };

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

  const takeBackgroundPhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      // width: 358 * 2,
      // height: 126 * 2,
      freeStyleCropEnabled: true,
      mediaType: 'photo',
      cropping: true,
    }).then(image => {
      if (image.size <= 1000000000) {
        setCurrentBackgroundPhoto({
          uri: image.path,
          mime: image.mime,
          name: image.path?.split('/')?.slice(-1)[0],
        });
        stateEdited();
      }
    });
  };

  return (
    <>
      <View
        style={{
          height: 126,
          borderRadius: 8,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          source={require('../assets/image/img_default_photo_background.png')}
        />
        <Image
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
          source={currentBackgroundPhoto}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              padding: 10,
              borderRadius: 50,
              backgroundColor: '#00000044',
            }}
            onPress={() => takeBackgroundPhotoFromLibrary()}>
            <IcCamera />
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={24} />
      <EditActionButton
        disableSaveButton={!edited}
        onDiscardPress={() => discard()}
        onSavePress={() => saveEditBackground()}
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
            background photo!
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessModalVisible(false);
          onSavePress(currentBackgroundPhoto);
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          onSavePress(currentBackgroundPhoto);
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

export default EditMyBackgroundPhoto;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
    color: colors.text.primary,
  },
  board: {
    height: 175,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 12,
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: colors.text.tertiary,
  },
  customMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.success,
  },
});
