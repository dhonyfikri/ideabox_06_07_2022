import React, {useRef, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import {IcChevronRightPrimary} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const CardTalentApproval = ({
  stateListLength,
  personName,
  ideaName,
  activity,
  status,
  requestDate,
  onViewPress,
  raiseDelay,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;
  const handleFadeIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
        delay: raiseDelay * 150,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        delay: raiseDelay * 150,
      }),
    ]).start();
  };
  const handleTranslate = () => {
    Animated.sequence([
      Animated.timing(translateAnim, {
        toValue: 30,
        duration: 0,
        useNativeDriver: true,
        delay: raiseDelay * 150,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        delay: raiseDelay * 150,
      }),
    ]).start();
  };

  useEffect(() => {
    handleFadeIn();
    handleTranslate();
  }, [
    stateListLength,
    raiseDelay,
    personName,
    ideaName,
    activity,
    status,
    requestDate,
  ]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: fadeAnim,
        transform: [{translateY: translateAnim}, {translateX: translateAnim}],
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.personName}>{personName}</Text>
        <Gap width={8} />
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={onViewPress}>
          <Text style={styles.viewButtonText}>View</Text>
          <Gap width={4} />
          <IcChevronRightPrimary />
        </TouchableOpacity>
      </View>
      <Gap height={12} />
      <View style={styles.fieldDataContent}>
        <Text style={styles.fieldDataContentMainText}>Idea</Text>
        <Gap width={16} />
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.fieldDataContentMainText}>{ideaName}</Text>
        </View>
      </View>
      <Gap height={10} />
      <View style={styles.fieldDataContent}>
        <Text style={styles.fieldDataContentMainText}>Activity</Text>
        <Gap width={16} />
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.fieldDataContentMainText}>{activity}</Text>
        </View>
      </View>
      <Gap height={10} />
      <View style={styles.fieldDataContent}>
        <Text style={styles.fieldDataContentMainText}>Status</Text>
        <Gap width={16} />
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <View style={styles.statusContainer(status.toLowerCase())}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        </View>
      </View>
      <Gap height={10} />
      <View style={styles.fieldDataContent}>
        <Text style={styles.fieldDataContentMainText}>Request Date</Text>
        <Gap width={16} />
        <View
          style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={styles.fieldDataContentMainText}>{requestDate}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default CardTalentApproval;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.dot,
    borderRadius: 16,
  },
  personName: {
    flex: 1,
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.text.primary,
  },
  viewButtonText: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.primary,
  },
  fieldDataContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  fieldDataContentMainText: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.primary,
  },
  statusContainer: type => ({
    backgroundColor:
      type === 'approved'
        ? colors.success
        : type === 'pending'
        ? colors.pending
        : type === 'rejected'
        ? colors.reject
        : colors.success,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
  }),
  statusText: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.white,
  },
});
