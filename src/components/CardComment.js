import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CardCommentItem from './CardCommentItem';
import Gap from './Gap';

const CardComment = ({commentsData, onMainRepplyPress = () => {}}) => {
  return (
    <View>
      <CardCommentItem
        imageThumb={commentsData.createdBy.pictures}
        commentId={commentsData.id}
        name={commentsData.createdBy.name}
        comment={commentsData.comment}
        onReplyPress={(commentId, name) => onMainRepplyPress(commentId, name)}
      />
      {commentsData.replyComment.length > 0 && (
        <>
          <Gap height={12} />
          {
            <View style={{paddingLeft: 40}}>
              <FlatList
                data={commentsData.replyComment}
                keyExtractor={(_, index) => index.toString()}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                inverted={false}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <CardCommentItem
                        imageThumb={item.createdBy.pictures}
                        name={item.createdBy.name}
                        comment={item.comment}
                        withReplyButton={false}
                      />
                      {index !== commentsData.replyComment.length - 1 && (
                        <Gap height={12} />
                      )}
                    </>
                  );
                }}
              />
            </View>
          }
        </>
      )}
    </View>
  );
};

export default CardComment;

const styles = StyleSheet.create({});
