import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {IcEmailContact, IcPhoneContact} from '../assets/icon';
import Gap from './Gap';
import fonts from '../utils/FontsConfig/Fonts';
import {colors} from '../utils/ColorsConfig/Colors';

const ContactDetail = ({email, phone}) => {
  return (
    <>
      <View style={styles.itemWrapper}>
        <IcEmailContact />
        <Gap width={16} />
        <View style={{flex: 1}}>
          <Text style={styles.title}>Email</Text>
          <Gap height={4} />
          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={() => {}}>
            <Text numberOfLines={1} style={styles.contactValue}>
              {email}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Gap height={24} />
      <View style={styles.itemWrapper}>
        <IcPhoneContact />
        <Gap width={16} />
        <View style={{flex: 1}}>
          <Text style={styles.title}>Phone Number</Text>
          <Gap height={4} />
          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={() => {}}>
            <Text numberOfLines={1} style={styles.contactValue}>
              {phone}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ContactDetail;

const styles = StyleSheet.create({
  itemWrapper: {flexDirection: 'row', alignItems: 'center'},
  title: {
    fontFamily: fonts.secondary[300],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.primary,
  },
  contactValue: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.primary,
  },
});
