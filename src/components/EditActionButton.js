import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Gap from './Gap';
import fonts from '../utils/FontsConfig/Fonts';
import {colors} from '../utils/ColorsConfig/Colors';

const EditActionButton = ({disableSaveButton, onDiscardPress, onSavePress}) => {
  return (
    <View style={styles.actionWrapper}>
      <TouchableOpacity style={styles.discardButton} onPress={onDiscardPress}>
        <Text numberOfLines={1} style={styles.discardButtonText}>
          Discard
        </Text>
      </TouchableOpacity>
      <Gap width={16} />
      <TouchableOpacity
        disabled={disableSaveButton}
        style={styles.saveButton(disableSaveButton)}
        onPress={onSavePress}>
        <Text numberOfLines={1} style={styles.saveButtonText}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditActionButton;

const styles = StyleSheet.create({
  actionWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  discardButton: {
    width: 105,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButton: disbled => ({
    width: 105,
    backgroundColor: disbled ? colors.border : colors.primary,
    borderWidth: 1,
    borderColor: disbled ? colors.border : colors.primary,
    borderRadius: 100,
    paddingVertical: 12,
    alignItems: 'center',
  }),
  discardButtonText: {
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color: colors.primary,
  },
  saveButtonText: {
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color: colors.white,
  },
});
