import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import {IcCloseLight, IcTickLight} from '../assets/icon';

const TalentApprovalAcceptOrReject = ({
  name,
  isPending,
  onRejectPress,
  onAcceptPress,
}) => {
  return (
    <>
      <Text style={styles.descText}>{name} request to join your team</Text>
      <Gap height={16} />
      <View style={styles.actionWrapper}>
        <TouchableOpacity
          disabled={!isPending}
          style={styles.actionButton(isPending ? 'reject' : 'disable')}
          onPress={onRejectPress}>
          <IcCloseLight />
          <Gap width={6} />
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
        <Gap width={12} />
        <TouchableOpacity
          disabled={!isPending}
          style={styles.actionButton(isPending ? 'approve' : 'disable')}
          onPress={onAcceptPress}>
          <IcTickLight />
          <Gap width={6} />
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TalentApprovalAcceptOrReject;

const styles = StyleSheet.create({
  descText: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
  },
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButton: type => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      type === 'reject'
        ? colors.reject
        : type === 'approve'
        ? colors.success
        : type === 'disable'
        ? colors.border
        : colors.reject,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  }),
  buttonText: {
    fontFamily: fonts.secondary[400],
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
  },
});
