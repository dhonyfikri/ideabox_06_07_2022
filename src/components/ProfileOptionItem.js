import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import {IcChevronRight} from '../assets/icon';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import Divider from './Divider';

const SingleLine = ({title, itemTitle, onPress}) => {
  return (
    <>
      {title !== undefined && (
        <>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Gap height={6} />
        </>
      )}
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            ...styles.itemContainer,
            marginHorizontal: 24,
            paddingVertical: 12,
          }}>
          <Text numberOfLines={1} style={styles.itemTitle}>
            {itemTitle}
          </Text>
          <IcChevronRight />
        </TouchableOpacity>
      </View>
    </>
  );
};

const MultiLine = ({title, multiData}) => {
  return (
    <>
      {title !== undefined && (
        <>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Gap height={6} />
        </>
      )}
      <View style={{...styles.container, paddingVertical: 6}}>
        {multiData.map((item, index) => {
          return (
            <View key={index.toString()}>
              <TouchableOpacity
                onPress={item.onPress}
                style={{
                  ...styles.itemContainer,
                  marginHorizontal: 24,
                  paddingVertical: 18,
                }}>
                <Text numberOfLines={1} style={styles.itemTitle}>
                  {item.itemTitle}
                </Text>
                <IcChevronRight />
              </TouchableOpacity>
              {index + 1 !== multiData.length && (
                <>
                  <Divider />
                </>
              )}
            </View>
          );
        })}
      </View>
    </>
  );
};

const ProfileOptionItem = ({
  multiItems = false,
  title,
  singleData = {itemTitle: 'item', onPress: () => {}},
  multiData = [{itemTitle: 'item1', onPress: () => {}}],
}) => {
  if (!multiItems) {
    return (
      <SingleLine
        title={title}
        itemTitle={singleData.itemTitle}
        onPress={singleData.onPress}
      />
    );
  } else {
    return <MultiLine title={title} multiData={multiData} />;
  }
};

export default ProfileOptionItem;

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.tertiary,
  },
  itemTitle: {
    flex: 1,
    fontFamily: fonts.secondary[600],
    color: colors.text.primary,
    fontSize: 12,
    lineHeight: 15,
  },
});
