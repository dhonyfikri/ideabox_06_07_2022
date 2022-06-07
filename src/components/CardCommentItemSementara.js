import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IcReply} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import {InitialIcon} from './InitialIcon';

const CardCommentItem = ({
  userList = [],
  commentId,
  creaorId,
  withReplyButton = true,
  onReplyPress = () => {},
  // imageThumb = require('../assets/image/img_default_user_thumb_comment.png'),
  imageThumb,
  name = 'name',
  comment = 'comment',
}) => {
  const creatorName = userList
    .map(userItem => userItem.id === creaorId && userItem.name)
    .filter(item => item !== false)[0]
    .replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });

  return (
    <View style={styles.container}>
      <View style={{minHeight: 20}}>
        <View style={{width: 20, height: 20, position: 'absolute'}}>
          <InitialIcon
            width={20}
            height={20}
            fontSize={10}
            name={creatorName}
          />
        </View>
        <Image style={styles.image} source={imageThumb} />
      </View>
      <Gap width={10} />
      <View style={{flex: 1}}>
        <Text numberOfLines={1} style={styles.nameText}>
          {creatorName}
        </Text>
        <Gap height={4} />
        <Text style={styles.commentText}>{comment}</Text>
      </View>
      {withReplyButton && (
        <>
          <Gap width={10} />
          <View>
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => onReplyPress(commentId, creatorName)}>
              <IcReply />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CardCommentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: colors.comment,
    borderRadius: 8,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    resizeMode: 'contain',
  },
  nameText: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.primary,
  },
  commentText: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.text.secondary,
  },
});
