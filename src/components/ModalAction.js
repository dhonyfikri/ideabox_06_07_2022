import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import {IcOutlinedClose} from '../assets/icon';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import Divider from './Divider';

const ModalAction = ({
  children,
  title = 'Modal',
  animationType = 'fade',
  visible = false,
  withTitleDivider = true,
  contentBackground = colors.white,
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
          <View style={{marginHorizontal: 12}}>
            <View style={styles.header}>
              <Text numberOfLines={1} style={styles.title}>
                {title}
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
            {withTitleDivider && <Divider />}
          </View>
          <View style={{padding: 12, backgroundColor: contentBackground}}>
            {children}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalAction;

const styles = StyleSheet.create({
  wrapper: {flex: 1, backgroundColor: '#00000088'},
  card: {
    backgroundColor: colors.white,
    paddingTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    paddingHorizontal: 6,
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.text.primary,
  },
});
