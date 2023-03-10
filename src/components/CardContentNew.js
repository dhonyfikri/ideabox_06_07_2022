import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useSelector} from 'react-redux';
import {IcLikeActive, IcLikeInactive, IcSmileEmote} from '../assets/icon';
import {AddCommentAPI} from '../config/RequestAPI/CommentAPI';
import {AddLikeAPI} from '../config/RequestAPI/LikeAPI';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import CardComment from './CardComment';
import CardReply from './CardReply';
import Divider from './Divider';
import Gap from './Gap';
import {InitialIcon, InitialNumberIcon} from './InitialIcon';
import LoadingProcessFull from './LoadingProcessFull';
import ModalMessage from './ModalMessage';
import {MediaAddress} from '../config/Environment.cfg';
import {JoinIdeaRequestAPI} from '../config/RequestAPI/IdeaAPI';

const CardContentNew = ({
  ideaId,
  creatorId,
  creatorName,
  creatorPicture,
  title,
  description,
  cover,
  likes,
  comments,
  // listUser,
  onCreatorPress = () => {},
  onIdeaPress = () => {},
  onCommentChange,
}) => {
  const stateGlobal = useSelector(state => state);
  const refRBSheetComment = useRef();
  const decodedJwt = stateGlobal.decodedToken;
  const [likeList, setLikeList] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [classicCommentText, setClassicCommentText] = useState('');
  const [advanceCommentText, setAdvanceCommentText] = useState('');
  const [loading, setLoading] = useState({visible: false, message: undefined});
  const [messageModal, setMessageModal] = useState({
    visible: false,
    message: undefined,
    title: undefined,
    type: 'smile',
    onClose: () => {},
  });
  const [replyData, setReplyData] = useState({
    replying: false,
    nameToReply: '',
    commentIdToReply: '',
  });
  const [disableLikeButton, setDisableLikeButton] = useState(false);

  const likeStatus =
    likeList.filter(
      item => item.createdBy.id === stateGlobal.decodedToken?.data.id,
    ).length > 0;

  const lastLikeUser = likeList
    .slice(-1)[0]
    ?.createdBy.name.replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    });

  useEffect(() => {
    setClassicCommentText('');
    setCommentList(comments ? comments : []);
    setLikeList(likes ? likes : []);
  }, [
    ideaId,
    creatorId,
    creatorName,
    creatorPicture,
    title,
    description,
    likes,
    comments,
  ]);

  const handleLike = () => {
    setDisableLikeButton(true);
    AddLikeAPI(stateGlobal.userToken?.authToken, parseInt(ideaId)).then(res => {
      setDisableLikeButton(false);
      console.log(res);
      if (res.status === 'SUCCESS') {
        let temptLikeList = [...likeList];
        if (likeStatus) {
          temptLikeList = [];
          temptLikeList = likeList.filter(
            item => item.createdBy.id !== stateGlobal.decodedToken?.data.id,
          );
        } else {
          temptLikeList.push({
            // id: '12',
            createdBy: {
              id: stateGlobal.decodedToken?.data.id,
              name: stateGlobal.decodedToken?.data.name,
              teamStructure: stateGlobal.userData?.teamStructure,
              roleId: stateGlobal.decodedToken?.data.roleId,
              pictures: stateGlobal.userData?.pictures,
            },
            createdDate: '2022-07-06 03:18:29',
          });
        }
        setLikeList(temptLikeList);
      } else if (
        res.status === 'SOMETHING_WRONG' ||
        res.status === 'NOT_FOUND' ||
        res.status === 'UNAUTHORIZED' ||
        res.status === 'UNDEFINED_HEADER' ||
        res.status === 'SERVER_ERROR'
      ) {
        setMessageModal({
          ...messageModal,
          visible: true,
          title: 'Failed',
          message: res.message,
          type: 'confused',
          // onClose: () => {},
        });
      }
    });
  };

  const handleComment = (type = 'CLASSIC') => {
    if (type) {
      setLoading({...loading, visible: true, message: 'Adding your comment'});
      AddCommentAPI(
        stateGlobal.userToken?.authToken,
        parseInt(ideaId),
        type === 'CLASSIC' ? classicCommentText : advanceCommentText,
      ).then(res => {
        setLoading({...loading, visible: false});
        // console.log(res);
        if (res.status === 'SUCCESS') {
          const tempCommentList = [...commentList];
          onCommentChange();
          setClassicCommentText('');
          setAdvanceCommentText('');
        } else if (
          res.status === 'SOMETHING_WRONG' ||
          res.status === 'NOT_FOUND' ||
          res.status === 'UNDEFINED_HEADER' ||
          res.status === 'UNAUTHORIZED' ||
          res.status === 'SERVER_ERROR'
        ) {
          setMessageModal({
            ...messageModal,
            visible: true,
            title: 'Failed',
            message: res.message,
            type: 'confused',
            // onClose: () => {},
          });
        }
      });
    }
  };

  const handleJoinRequest = () => {
    setLoading({...loading, visible: true, message: 'Sending join request'});
    JoinIdeaRequestAPI(stateGlobal.userToken?.authToken, parseInt(ideaId)).then(
      res => {
        setLoading({...loading, visible: false});
        if (res.status === 'SUCCESS') {
          setMessageModal({
            ...messageModal,
            visible: true,
            title: 'Success',
            message: res.message,
            type: 'smile',
            // onClose: () => {},
          });
        } else {
          setMessageModal({
            ...messageModal,
            visible: true,
            title: 'Failed',
            message: res.message,
            type: 'confused',
            // onClose: () => {},
          });
        }
      },
    );
  };

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#D4DAE2',
        borderRadius: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: 8,
          }}
          onPress={() => onCreatorPress(creatorId)}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 36 / 2,
              overflow: 'hidden',
            }}>
            <View style={{position: 'absolute', left: 0, top: 0}}>
              <InitialIcon width={36} height={36} name={creatorName} />
            </View>
            <Image
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
              source={{uri: `${MediaAddress}/${creatorPicture}`}}
            />
          </View>
          <Gap width={8} />
          <Text
            numberOfLines={1}
            style={{fontFamily: 'Poppins-SemiBold', fontSize: 12, flex: 1}}>
            {creatorName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 6.5,
            paddingHorizontal: 8,
            backgroundColor:
              creatorId === stateGlobal.decodedToken?.data.id
                ? colors.success
                : colors.primary,
            borderRadius: 32,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            handleJoinRequest();
          }}
          disabled={
            creatorId === stateGlobal.decodedToken?.data.id ? true : false
          }>
          {creatorId !== stateGlobal.decodedToken?.data.id ? (
            <Image
              source={require('../assets/icon/joinidea.png')}
              style={{width: 20, height: 20}}
            />
          ) : (
            <Gap height={20} />
          )}
          <Text
            style={{
              fontSize: 12,
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontFamily: 'Poppins-Regular',
              lineHeight: 14,
              marginHorizontal: 8,
            }}>
            {creatorId === stateGlobal.decodedToken?.data.id
              ? 'Joined'
              : 'Join Idea'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{marginVertical: 17, flexDirection: 'row'}}
        onPress={() => onIdeaPress(ideaId)}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 8,
            marginRight: 16,
            overflow: 'hidden',
            backgroundColor: colors.divider,
          }}>
          <Image
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            source={{uri: `${MediaAddress}/${cover}`}}
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            numberOfLines={2}
            style={{fontFamily: 'Poppins-Bold', fontSize: 16}}>
            {title}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 12,
              color: '#6B7280',
              lineHeight: 22,
            }}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{height: 1, backgroundColor: '#D3D2D2'}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 21,
        }}>
        <TouchableOpacity
          style={{width: 26, height: 26, justifyContent: 'center'}}
          onPress={() => {
            if (!disableLikeButton) {
              handleLike();
            }
          }}>
          {likeStatus ? <IcLikeActive /> : <IcLikeInactive />}
        </TouchableOpacity>
        {likeList.length > 0 ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 8,
              }}>
              {likeList.slice(-3).map((likeItem, index) => {
                return (
                  <View
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 26 / 2,
                      overflow: 'hidden',
                      marginLeft: index === 0 ? 0 : -5,
                    }}>
                    <View style={{position: 'absolute', left: 0, top: 0}}>
                      <InitialIcon
                        key={index.toString()}
                        width={26}
                        height={26}
                        name={likeItem.createdBy?.name}
                      />
                    </View>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                      source={{
                        uri: `${MediaAddress}/${likeItem.createdBy?.pictures}`,
                      }}
                    />
                  </View>
                );
              })}
              {likeList.length > 3 && (
                <InitialNumberIcon
                  height={26}
                  width={26}
                  number={likeList.length - 3}
                />
              )}
            </View>
            <View
            // style={{
            //   minWidth: 100,
            // }}
            >
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                }}>
                Liked by{' '}
                <Text style={{fontWeight: 'bold'}}>
                  {lastLikeUser
                    ? lastLikeUser.length === 0
                      ? '-'
                      : lastLikeUser.length < 9
                      ? lastLikeUser
                      : lastLikeUser.slice(0, 9 - 3) + '...'
                    : '-'}
                </Text>
              </Text>
            </View>
            <View style={{flex: 1, minWidth: 95}}>
              {likeList.length > 1 && (
                <Text
                  numberOfLines={1}
                  style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
                  {' and '}
                  {likeList.length - 1 <= 999
                    ? likeList.length - 1
                    : '+999'}{' '}
                  <Text style={{fontWeight: 'bold'}}>Others</Text>
                </Text>
              )}
            </View>
          </>
        ) : (
          <View numberOfLines={1} style={{flex: 1, marginLeft: 8}}>
            <Text
              numberOfLines={1}
              style={{fontFamily: 'Roboto-Regular', fontSize: 12}}>
              {' '}
              No likes yet
            </Text>
          </View>
        )}
      </View>
      {commentList.length > 0 && (
        <>
          <TouchableOpacity onPress={() => refRBSheetComment.current.open()}>
            <Text
              style={{
                fontFamily: 'Roboto-Regular',
                fontSize: 12,
                color: '#9CA3AF',
              }}>
              View all {commentList ? commentList.length : 0} comment
            </Text>
          </TouchableOpacity>
          <View style={{marginVertical: 16}}>
            {commentList.slice(-2).map((itemComment, index) => (
              <Text
                key={index.toString()}
                numberOfLines={2}
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 12,
                  marginBottom: 8,
                }}>
                <Text style={{fontWeight: 'bold'}}>
                  {itemComment.createdBy.name?.replace(
                    /(?:^|\s)\S/g,
                    function (a) {
                      return a.toUpperCase();
                    },
                  )}{' '}
                </Text>
                {itemComment.comment}
              </Text>
            ))}
          </View>
        </>
      )}
      <View
        style={{
          borderWidth: 1,
          borderColor: '#D4DAE2',
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 6,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            flex: 1,
          }}>
          <View
            style={{
              width: 26,
              height: 26,
              borderRadius: 26 / 2,
              overflow: 'hidden',
            }}>
            <View style={{position: 'absolute', left: 0, top: 0}}>
              <InitialIcon
                width={26}
                height={26}
                name={stateGlobal.decodedToken?.data.name}
              />
            </View>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
              source={{
                uri: `${MediaAddress}/${stateGlobal.userData?.pictures}`,
              }}
            />
          </View>

          <Gap width={8} />
          <TextInput
            placeholder="Add Comment..."
            multiline={true}
            autoCorrect={false}
            style={{
              maxHeight: 80,
              fontSize: 12,
              fontFamily: 'Roboto-Regular',
              flex: 1,
              paddingVertical: 0,
            }}
            value={classicCommentText}
            onChangeText={text => setClassicCommentText(text)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (classicCommentText.trim().length > 0) {
              handleComment('CLASSIC');
            }
          }}>
          <Text
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 12,
              color: '#7C4BFF',
              marginHorizontal: 10,
            }}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
      {/* Bottom sheet comment */}
      <RBSheet
        ref={refRBSheetComment}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="fade"
        height={550}
        dragFromTopOnly={true}
        customStyles={{
          container: {
            paddingTop: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          draggableIcon: {
            backgroundColor: '#9CA3AF',
            margin: 0,
          },
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          style={{flex: 1}}>
          <View style={styles.bottomSheetContentContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.bottomSheetTitle}>
                {commentList.length > 100 ? '100+' : commentList.length}
                {' Comment'}
                {commentList.length > 1 && 's'}
              </Text>
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={() => refRBSheetComment.current.close()}>
                <Text style={styles.bottomSheetCancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <Gap height={32} />
            <View style={{flex: 1}}>
              {/* <ScrollView showsVerticalScrollIndicator={false}> */}
              <FlatList
                data={[...commentList]?.reverse()}
                keyExtractor={(_, index) => index.toString()}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                inverted={true}
                renderItem={({item, index}) => {
                  return (
                    <>
                      {index !== 0 && <Gap height={16} />}
                      <CardComment
                        // userList={listUser}
                        commentsData={item}
                        onMainRepplyPress={(commentId, creatorName) => {
                          setReplyData({
                            status: true,
                            commentIdToReply: commentId,
                            nameToReply: creatorName?.replace(
                              /(?:^|\s)\S/g,
                              function (a) {
                                return a.toUpperCase();
                              },
                            ),
                          });
                        }}
                      />
                    </>
                  );
                }}
              />
              {/* </ScrollView> */}
              <Divider />
              <Gap height={18} />
              {replyData.status === true && (
                <>
                  <CardReply
                    name={replyData.nameToReply}
                    onClosePress={() =>
                      setReplyData({...replyData, status: false})
                    }
                  />
                  <Gap height={12} />
                </>
              )}
              <View
                style={{
                  flexDirection: 'row',
                  // marginHorizontal: 16,
                  padding: 8,
                  paddingLeft: 16,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: colors.text.primary,
                  overflow: 'hidden',
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <TextInput
                    autoCorrect={false}
                    placeholder="Leave a comment"
                    multiline
                    onChangeText={text => setAdvanceCommentText(text)}
                    style={{
                      maxHeight: 100,
                      fontFamily: fonts.primary[400],
                      fontSize: 12,
                      color: colors.text.primary,
                      padding: 0,
                    }}>
                    <Text style={{lineHeight: 22}}>{advanceCommentText}</Text>
                  </TextInput>
                </View>
                <Gap width={16} />
                <View style={{justifyContent: 'flex-end'}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                      <IcSmileEmote />
                    </TouchableOpacity>
                    <Gap width={16} />
                    <TouchableOpacity
                      style={{
                        paddingVertical: 8,
                        paddingHorizontal: 24,
                        borderRadius: 16,
                        backgroundColor: colors.primary,
                      }}
                      onPress={() => {
                        if (advanceCommentText.trim().length > 0) {
                          handleComment('ADVANCE');
                        }
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.secondary[600],
                          fontSize: 12,
                          lineHeight: 15,
                          color: colors.white,
                        }}>
                        Post
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Gap height={10} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </RBSheet>
      <LoadingProcessFull visible={loading.visible} message={loading.message} />
      {/* modal message */}
      <ModalMessage
        visible={messageModal.visible}
        withIllustration
        illustrationType={messageModal.type}
        title={messageModal.title}
        message={messageModal.message}
        withBackButton
        onBack={() => {
          setMessageModal({...messageModal, visible: false});
          messageModal.onClose();
        }}
        onRequestClose={() => {
          setMessageModal({...messageModal, visible: false});
          messageModal.onClose();
        }}
      />
    </View>
  );
};

export default CardContentNew;

const styles = StyleSheet.create({
  bottomSheetContentContainer: {
    height: '100%',
    padding: 16,
  },
  bottomSheetTitle: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
    color: colors.text.primary,
  },
  bottomSheetCancelButtonText: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.tertiary,
  },
  cancelContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
