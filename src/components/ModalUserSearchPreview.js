import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import {IcOutlinedClose} from '../assets/icon';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import Divider from './Divider';
import {MediaAddress} from '../config/Environment.cfg';
import {InitialIcon} from './InitialIcon';

const ModalUserSearchPreview = ({
  picture,
  name,
  unit,
  location,
  animationType = 'fade',
  visible = false,
  onCancel,
  onConfirm,
  onRequestClose,
  onCloseButtonPress,
}) => {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <ScrollView
        style={styles.wrapper}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 16,
        }}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text numberOfLines={1} style={styles.title}>
              User Preview
            </Text>
            <TouchableOpacity
              style={{
                paddingHorizontal: 6,
              }}
              onPress={onCloseButtonPress}>
              <IcOutlinedClose />
            </TouchableOpacity>
          </View>
          <Gap height={8} />
          <Divider />
          <Gap height={16} />
          <View style={{flexDirection: 'row'}}>
            <View style={{width: 100, height: 100}}>
              <View style={{position: 'absolute', top: 0, left: 0}}>
                <InitialIcon
                  width={100}
                  height={100}
                  name={name}
                  fontSize={28}
                />
              </View>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                  borderRadius: 8,
                }}
                source={{
                  uri: `${MediaAddress}/${picture}`,
                }}
              />
            </View>
            <Gap width={8} />
            <View
              style={{
                flex: 1,
                backgroundColor: colors.secondary,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
              }}>
              <Text
                numberOfLines={1}
                style={{fontFamily: fonts.secondary[600], fontSize: 16}}>
                {name
                  ? name?.replace(/(?:^|\s)\S/g, function (a) {
                      return a.toUpperCase();
                    })
                  : '-'}
              </Text>
              <Divider />
              <Text
                numberOfLines={1}
                style={{fontFamily: fonts.secondary[400], fontSize: 12}}>
                Unit : {unit ? unit : '-'}
              </Text>
              <Text
                numberOfLines={1}
                style={{fontFamily: fonts.secondary[400], fontSize: 12}}>
                Location : {location ? location : '-'}
              </Text>
            </View>
          </View>
          <Gap height={16} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.border,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
              }}
              onPress={onCancel}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fonts.secondary[400],
                  fontSize: 12,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <Gap width={8} />
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
              }}
              onPress={onConfirm}>
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fonts.secondary[400],
                  fontSize: 12,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalUserSearchPreview;

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#00000088'},
  card: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 16,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    paddingHorizontal: 6,
    fontFamily: fonts.secondary[500],
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.text.primary,
  },
});
