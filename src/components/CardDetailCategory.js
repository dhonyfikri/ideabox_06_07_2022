import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const CardDetailCategory = ({
  categoryName = '-',
  type,
  required,
  status,
  createdDate,
  createdBy,
  updatedDate,
  updatedBy,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <Text style={styles.ideaName}>{categoryName}</Text>
        </ScrollView>
      </View>
      <Gap height={12} />
      <View style={styles.detailContainer}>
        <View style={styles.detailTextWrapper}>
          <Text style={styles.titleDetail}>Type</Text>
          <Gap width={16} />
          <View style={styles.valueWrapper}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.valueDetail}>
              {type === '1' ? 'MAIN' : 'SUB'}
            </Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.detailTextWrapper}>
          <Text style={styles.titleDetail}>Required</Text>
          <Gap width={16} />
          <View style={styles.valueWrapper}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.valueDetail}>
              {required ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.detailTextWrapper}>
          <Text style={styles.titleDetail}>Status</Text>
          <Gap width={16} />
          <View style={styles.valueWrapper}>
            <View
              style={styles.statusContainer(
                (status === '1' ? 'Active' : 'Deactive').toLowerCase(),
              )}>
              <Text style={styles.statusText}>
                {status === '1' ? 'Active' : 'Deactive'}
              </Text>
            </View>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.detailTextWrapper}>
          <Text style={styles.titleDetail}>Created Date</Text>
          <Gap width={16} />
          <View style={styles.valueWrapper}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.valueDetail}>
              {createdDate}
            </Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.detailTextWrapper}>
          <Text style={styles.titleDetail}>Created By</Text>
          <Gap width={16} />
          <View style={styles.valueWrapper}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.valueDetail}>
              {createdBy}
            </Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.detailTextWrapper}>
          <Text style={styles.titleDetail}>Updated Date</Text>
          <Gap width={16} />
          <View style={styles.valueWrapper}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.valueDetail}>
              {updatedDate}
            </Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.detailTextWrapper}>
          <Text style={styles.titleDetail}>Updated By</Text>
          <Gap width={16} />
          <View style={styles.valueWrapper}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.valueDetail}>
              {updatedBy}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardDetailCategory;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.dot,
    borderRadius: 16,
  },
  ideaName: {
    flex: 1,
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.text.primary,
  },
  detailContainer: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  detailTextWrapper: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  titleDetail: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.primary,
  },
  valueWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  valueDetail: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.primary,
  },
  statusContainer: type => ({
    backgroundColor:
      type === 'active'
        ? colors.success
        : type === 'deactive'
        ? colors.reject
        : colors.reject,
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
