import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const ModalMessage = ({
  visible = false,
  animationType = 'fade',
  withIllustration,
  illustrationType = 'smile',
  title,
  message,
  withBackButton,
  withCancelButton,
  withConfirmButton,
  onBack,
  onCancel,
  onConfirm,
  onRequestClose,
}) => {
  const Illustration = () => {
    if (illustrationType === 'smile') {
      return (
        <Image
          style={{width: 83, height: 83, resizeMode: 'contain'}}
          source={require('../assets/image/il_big_smile.png')}
        />
      );
    } else if (illustrationType === 'confused') {
      return (
        <Image
          style={{width: 83, height: 83, resizeMode: 'contain'}}
          source={require('../assets/image/il_confused.png')}
        />
      );
    }
  };

  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#00000044',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 225,
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 8,
            alignItems: 'center',
            backgroundColor: colors.white,
            borderRadius: 16,
          }}>
          {withIllustration && (
            <>
              <Illustration />
              <Gap height={8} />
            </>
          )}
          {title && (
            <>
              <Text style={styles.title}>{title}</Text>
              <Gap height={8} />
            </>
          )}
          {message && (
            <>
              <Text style={styles.message}>{message}</Text>
              <Gap height={8} />
            </>
          )}
          {withBackButton || withCancelButton || withConfirmButton ? (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {withBackButton && (
                  <TouchableOpacity
                    style={styles.filledButton}
                    onPress={onBack}>
                    <Text style={styles.filledButtonText}>Back</Text>
                  </TouchableOpacity>
                )}
                {withCancelButton && (
                  <TouchableOpacity
                    style={styles.outlinedButton}
                    onPress={onCancel}>
                    <Text style={styles.outlinedButtonText}>Cancel</Text>
                  </TouchableOpacity>
                )}
                {withConfirmButton && (
                  <TouchableOpacity
                    style={styles.filledButton}
                    onPress={onConfirm}>
                    <Text style={styles.filledButtonText}>Yes</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Gap height={8} />
            </>
          ) : (
            <></>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalMessage;

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontFamily: fonts.primary[900],
    fontSize: 12,
    lineHeight: 22,
    color: colors.text.primary,
    textAlign: 'center',
  },
  message: {
    width: '100%',
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.text.primary,
    textAlign: 'center',
  },
  outlinedButton: {
    width: 68,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 8,
    alignItems: 'center',
  },
  filledButton: {
    width: 68,
    marginHorizontal: 5,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 8,
    alignItems: 'center',
  },
  outlinedButtonText: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.primary,
  },
  filledButtonText: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.white,
  },
});
