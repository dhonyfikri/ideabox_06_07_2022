import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {IcReply} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const CardCommentItem = ({
  withReplyButton = true,
  onReplyPress = () => {},
  imageThumb = require('../assets/image/img_default_user_thumb_comment.png'),
  name = 'name',
  comment = 'comment',
}) => {
  return (
    <View style={styles.container}>
      <View style={{minHeight: 20}}>
        <Image
          style={{width: 20, height: 20, position: 'absolute'}}
          source={require('../assets/image/img_default_user_thumb_comment.png')}
        />
        <Image style={styles.image} source={imageThumb} />
      </View>
      <Gap width={10} />
      <View style={{flex: 1}}>
        <Text numberOfLines={1} style={styles.nameText}>
          {name}
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
              onPress={() => onReplyPress(name)}>
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
