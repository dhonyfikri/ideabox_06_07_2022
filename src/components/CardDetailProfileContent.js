import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import {colors} from '../utils/ColorsConfig/Colors';
import {IcAdd2, IcPencilEdit} from '../assets/icon';
import Gap from './Gap';
import Divider from './Divider';
import fonts from '../utils/FontsConfig/Fonts';

const CardDetailProfileContent = ({
  editable = true,
  title,
  withAddButton,
  withEditButton,
  withTextAction,
  onAddPress,
  onEditPress,
  onTextActionPress,
  textAction = 'Show More',
  children,
}) => {
  return (
    <Shadow viewStyle={{alignSelf: 'stretch'}} distance={4} offset={[0, 1]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          {editable && (
            <>
              {withAddButton && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={onAddPress}>
                  <IcAdd2 />
                </TouchableOpacity>
              )}
              {withEditButton && (
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={onEditPress}>
                  <IcPencilEdit />
                </TouchableOpacity>
              )}
            </>
          )}
          {withTextAction && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onTextActionPress}>
              <Text style={styles.textAction}>{textAction}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Gap height={4} />
        <Divider />
        <Gap height={8} />
        {children}
      </View>
    </Shadow>
  );
};

export default CardDetailProfileContent;

const styles = StyleSheet.create({
  container: {padding: 12, borderRadius: 16, backgroundColor: colors.white},
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.text.primary,
  },
  actionButton: {
    minWidth: 16,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 12,
  },
  textAction: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.primary,
  },
});
