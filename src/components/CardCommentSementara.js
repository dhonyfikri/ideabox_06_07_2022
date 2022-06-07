import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CardCommentItemSementara from './CardCommentItemSementara';
import Gap from './Gap';

const CardComment = ({
  userList = [],
  commentsData,
  onMainRepplyPress = () => {},
}) => {
  return (
    <View>
      <CardCommentItemSementara
        userList={userList}
        commentId={commentsData.id}
        creaorId={commentsData.createdBy}
        comment={commentsData.comment}
        onReplyPress={(commentId, creatorName) =>
          onMainRepplyPress(commentId, creatorName)
        }
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
                      <CardCommentItemSementara
                        userList={userList}
                        commentId={item.id}
                        creaorId={item.createdBy}
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
