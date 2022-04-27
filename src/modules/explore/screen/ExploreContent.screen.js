import {useScrollToTop} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {MentionInput} from 'react-native-controlled-mentions';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useDispatch, useSelector} from 'react-redux';
import {Cross, Join, Promote, TopLine} from '../../../assets/icon';
import CardComment from '../../../components/CardComment';
import CardContent from '../../../components/CardContent';
import CardReplyComment from '../../../components/CardReplyComment';
import FailedModal from '../../../components/FailedModal';
import getData from '../../../components/GetData';
import RefreshFull from '../../../components/RefreshFull';
import SearchHeader from '../../../components/SearchHeader';
import SuccesModal from '../../../components/SuccesModal';
import WarningModal from '../../../components/WarningModal';
import {defaultAuthState} from '../../../config/Auth.cfg';
import {GetDataIdea} from '../../../config/GetData/GetDataIdea';
import CommentIdea from '../../../config/PostData/Comment';
import JoinIdea from '../../../config/PostData/JoinIdea';
import PromoteIdea from '../../../config/PostData/PromoteIdea';
import style from '../../../config/Style/style.cfg';
import styles from '../style/Explore.style';

const ExploreContent = ({navigation, route}) => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  const [isLoading, setLoading] = useState(true);
  const [idLike, setIdLike] = useState(null);
  const [idCommentReply, setIdCommentReply] = useState(null);
  const [nameReply, setNameReply] = useState(null);
  const [data, setData] = useState({isSet: false, data: []});
  const [data2, setData2] = useState(null);
  const [modalComment, setModalComment] = useState(false);
  const [modalJoinVisible, setModalJoinVisible] = useState(false);
  const [modalPromoteVisible, setModalPromoteVisible] = useState(false);
  const [modalBottom, setModalBottom] = useState(false);
  const [hasil, setHasil] = useState('');
  const [value, setValue] = useState('');
  const [idIdea, setIdIdea] = useState(0);
  const [idIdeaJoin, setIdIdeaJoin] = useState(0);
  const [idComment, setIdComment] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [join, setJoin] = useState(null);
  const [promote, setPromote] = useState(null);
  const [textJoin, setTextJoin] = useState('');
  const [textPromote, setTextPromote] = useState('');
  const [like, setLike] = useState(false);
  const [success, setSuccess] = useState(null);
  const [dataAsync, setDataAsync] = useState(defaultAuthState);
  const [imageLike, setImageLike] = useState(
    require('../../../assets/icon/loveFalse.png'),
  );
  const [comment, setComment] = useState('');
  const [replyComment, setReplyComment] = useState('');
  const getDataIdea = dataSearch => {
    setHasil(dataSearch);
  };
  const [change, setChange] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [showRefreshButton, setShowRefreshButton] = useState(false);

  const fetchIdeas = withIndicator => {
    if (withIndicator) {
      setFetchLoading(true);
      setHasil('');
    }
    GetDataIdea().then(res => {
      setFetchLoading(false);
      if (res) {
        setData({isSet: true, data: res});
      } else {
        setShowRefreshButton(true);
      }
    });
  };

  // ambil data authstate sekali
  useEffect(() => {
    getData().then(jsonValue => {
      setDataAsync(jsonValue);
      fetchIdeas(true);
    });
  }, []);

  useEffect(() => {
    fetchIdeas(false);
  }, [like]);

  useEffect(() => {
    fetchIdeas(false);
    setComment('');
    setReplyComment('');
  }, [success]);

  const ref = useRef(null);
  useScrollToTop(ref);

  const suggestions = [
    {id: '1', name: 'David Tabaka'},
    {id: '2', name: 'Mary'},
    {id: '3', name: 'Tony'},
    {id: '4', name: 'Mike'},
    {id: '5', name: 'Grey'},
  ];

  // const handleLike = id => {
  //   LikeIdea(id, dataAsync.id).then(val => setLike(val));
  //   setIdLike(id);
  //   setChange(false);
  // };
  const handleComment = text => {
    CommentIdea(idComment, text, 0, dataAsync.id).then(val => setSuccess(val));
  };
  const handleReplyComment = text => {
    CommentIdea(idComment, text, idCommentReply, dataAsync.id).then(val =>
      setSuccess(val),
    );
  };
  const handleJoin = () => {
    JoinIdea(idIdeaJoin, idUser, textJoin).then(val => setJoin(val));
  };
  const handlePromote = () => {
    PromoteIdea(idIdeaJoin, textPromote).then(val => setPromote(val));
  };
  // Sugesstion
  // const renderSuggestions = ({keyword, onSuggestionPress}) => {
  //   if (keyword == null) {
  //     return null;
  //   }
  //   return (
  //     <View style={{position: 'relative', flex: 1}}>
  //       <ScrollView
  //         showsVerticalScrollIndicator={false}
  //         style={{
  //           height: 200,
  //           backgroundColor: '#FFFFFF',
  //           width: windowWidth - 22,
  //           borderColor: '#085D7A',
  //           top: -1,
  //           borderBottomWidth: 0.5,
  //         }}>
  //         {suggestions
  //           .filter(one =>
  //             one.name
  //               .toLocaleLowerCase()
  //               .includes(keyword.toLocaleLowerCase()),
  //           )
  //           .map(one => (
  //             <Pressable
  //               key={one.id}
  //               onPress={() => onSuggestionPress(one)}
  //               style={{padding: 12}}>
  //               <Text>{one.name}</Text>
  //             </Pressable>
  //           ))}
  //       </ScrollView>
  //     </View>
  //   );
  // };
  // End Sugesstion

  const getDataSuccess = data => {
    setSuccess(data);
  };
  const getDataJoin = data => {
    setJoin(data);
  };
  const getDataPromote = data => {
    setPromote(data);
  };
  const getDataChange = data => {
    setChange(data);
  };
  if (change === true) {
    fetchIdeas(false);
    setChange(false);
  }
  // const onShare = async id => {
  //   try {
  //     const result = await Share.share({
  //       message: 'https://dev-ideabox.digitalamoeba.id/ideabox/ideas/' + {id},
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      {success === 200 ? (
        <SuccesModal
          desc={'Your comment have been added!'}
          getData={getDataSuccess}
        />
      ) : success !== null ? (
        <FailedModal
          desc={'Your comment not added!'}
          getData={getDataSuccess}
        />
      ) : null}
      {join === 200 ? (
        <SuccesModal desc={'Your have join the idea'} getData={getDataJoin} />
      ) : join === 406 ? (
        <WarningModal
          desc={'You already join for this idea'}
          getData={getDataJoin}
        />
      ) : promote === 201 ? (
        <SuccesModal
          desc={'Your have Promote the idea'}
          getData={getDataPromote}
        />
      ) : promote === 400 ? (
        <WarningModal
          desc={'You already requested for this idea'}
          getData={getDataPromote}
        />
      ) : null}
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        searchText={hasil}
        getData={getDataIdea}
        placeholder={'Search an Idea ...'}
      />
      <>
        {data.isSet && data.data.length === 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              padding: 20,
            }}
            refreshControl={
              <RefreshControl
                refreshing={fetchLoading}
                onRefresh={() => fetchIdeas(true)}
                colors={['#085D7A']} // add more array value to switching colors while progressing
              />
            }>
            <Text
              style={{textAlign: 'center', fontSize: 18, fontWeight: 'bold'}}>
              List of ideas not yet available
            </Text>
          </ScrollView>
        ) : (
          <>
            <ScrollView
              ref={ref}
              refreshControl={
                <RefreshControl
                  refreshing={fetchLoading}
                  onRefresh={() => fetchIdeas(true)}
                  colors={['#085D7A']} // add more array value to switching colors while progressing
                />
              }>
              {data.data
                .filter((val, key) => {
                  if (hasil === '') {
                    return val;
                  } else if (
                    val.desc[0].value
                      .toLowerCase()
                      .includes(hasil.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((val, index) => {
                  return (
                    <View key={index}>
                      <CardContent
                        changeData={getDataChange}
                        createdId={val.user.userId}
                        id={val.id}
                        dataAsync={dataAsync}
                        profileUser={
                          val.user.pictures === ''
                            ? require('../../../assets/icon/profilepicture.png')
                            : {uri: val.user.pictures}
                        }
                        liked={imageLike}
                        name={val.user.name}
                        // title={
                        //   Object.keys(val.desc).length > 0
                        //     ? val.desc[0].value
                        //     : 'null'
                        // }
                        // desc={
                        //   Object.keys(val.desc).length > 0
                        //     ? val.desc[2].value
                        //     : 'null'
                        // }
                        // like={val.like}
                        // likedBy={val.totalLike}
                        // cover={
                        //   Object.keys(val.desc).length > 0
                        //     ? {uri: val.desc[1].value}
                        //     : 'null'
                        // }
                        title={val.desc[0].value}
                        desc={val.desc[2].value}
                        like={val.like}
                        likedBy={val.totalLike}
                        cover={{uri: val.desc[1].value}}
                        more={() => {
                          if (stateGlobal.detailIdea !== null) {
                            dispatch({
                              type: 'SET_DETAIL_IDEA',
                              value: null,
                            });
                          }
                          navigation.navigate('DetailIdeaUser', {
                            ideaId: val.id,
                          });
                        }}
                        comment={() => {
                          setModalComment(true);
                          setIdIdea(index);
                          setIdComment(val.id);
                          setIdUser(dataAsync.id);
                        }}
                        join={() => setModalJoinVisible(true)}
                        promote={() => setModalPromoteVisible(true)}
                        morePromote={() => {
                          setIdUser(dataAsync.id);
                          setIdIdeaJoin(val.id);
                          setModalBottom(true);
                        }}
                        onProfile={() =>
                          navigation.navigate('ProfileUser', {data: val})
                        }
                      />
                    </View>
                  );
                })}

              <View style={styles.bottomWrap} />

              {/* Modal comment */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalComment}
                onRequestClose={() => {
                  setModalComment(false);
                }}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.totalComment}>
                      Total Comment (
                      {data.data.length > 0
                        ? data.data[idIdea].totalComment
                        : 0}
                      )
                    </Text>
                    <TouchableOpacity onPress={() => setModalComment(false)}>
                      <Cross />
                    </TouchableOpacity>
                  </View>
                  <ScrollView style={styles.contentModal}>
                    {data.data.length > 0 &&
                      data.data[idIdea].comment.map(val => {
                        return (
                          <View>
                            <CardComment
                              image={
                                val.createdBy.pictures === ''
                                  ? require('../../../assets/icon/profilepicture.png')
                                  : {uri: val.createdBy.pictures}
                              }
                              desc={val.comment}
                              name={val.createdBy.name}
                              reply={() => {
                                setIdCommentReply(val.id);
                                setNameReply(val.createdBy.name);
                              }}
                            />
                            {val.replyComment.map(val => {
                              return (
                                <View style={{marginVertical: 10}}>
                                  <CardReplyComment
                                    desc={val.comment}
                                    name={val.createdBy.name}
                                    image={
                                      val.createdBy.pictures === ''
                                        ? require('../../../assets/icon/profilepicture.png')
                                        : {uri: val.createdBy.pictures}
                                    }
                                  />
                                </View>
                              );
                            })}
                            <View
                              style={{
                                height: 1,
                                width: '100%',
                                backgroundColor: '#E5E5E5',
                                marginVertical: 10,
                              }}
                            />
                          </View>
                        );
                      })}
                  </ScrollView>
                  <View style={{height: 100}} />
                </View>

                <View style={styles.textInputContainer}>
                  {idCommentReply !== null ? (
                    <View
                      style={{
                        padding: 15,
                        backgroundColor: '#e5e5e5',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={style.h5}>Replying to {nameReply}</Text>
                      <TouchableOpacity onPress={() => setIdCommentReply(null)}>
                        <Cross />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <View style={styles.textInputWrap}>
                    {idCommentReply === null ? (
                      <View style={styles.textInputRow}>
                        <View style={{flex: 7}}>
                          <MentionInput
                            value={comment}
                            onChange={setComment}
                            // partTypes={[
                            //   {
                            //     trigger: '@', // Should be a single character like '@' or '#'
                            //     renderSuggestions: renderSuggestions,
                            //     textStyle: {fontWeight: 'bold', color: 'blue'}, // The mention style in the input
                            //   },
                            // ]}
                            style={styles.textInput}
                            multiline={true}
                            placeholder="Masukkan Komentar..."
                          />
                        </View>

                        <TouchableOpacity
                          onPress={() => handleComment(comment)}
                          style={styles.buttonSend}>
                          <Text style={styles.textSend}>Send</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View style={styles.textInputRow}>
                        <View style={{flex: 7}}>
                          <MentionInput
                            value={replyComment}
                            onChange={setReplyComment}
                            // partTypes={[
                            //   {
                            //     trigger: '@', // Should be a single character like '@' or '#'
                            //     renderSuggestions: renderSuggestions,
                            //     textStyle: {fontWeight: 'bold', color: 'blue'}, // The mention style in the input
                            //   },
                            // ]}
                            style={styles.textInput}
                            multiline={true}
                            placeholder="Masukkan Komentar..."
                          />
                        </View>

                        <TouchableOpacity
                          onPress={() => handleReplyComment(replyComment)}
                          style={styles.buttonSend}>
                          <Text style={styles.textSend}>Send</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </Modal>
              {/* end Modal */}

              {/* Popup join  */}
              <GestureRecognizer
                style={styles.gesture}
                onSwipeDown={() => {
                  setModalJoinVisible(false);
                }}>
                <Modal
                  animationType="none"
                  transparent={true}
                  visible={modalJoinVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalJoinVisible(!modalPromoteVisible);
                  }}>
                  <ScrollView>
                    <View style={styles.modalPromoteContainer}>
                      <View style={styles.titleWrap}>
                        <View style={styles.topLine}>
                          <TouchableOpacity
                            onPress={() => setModalJoinVisible(false)}>
                            <TopLine />
                            <View style={styles.lineSpace} />
                            <TopLine />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.textTitle}>Join Idea</Text>
                      </View>
                      <Text style={style.h5}>
                        Apakah Kamu yakin untuk join idea ini?
                      </Text>
                      <Text style={[style.h4, {marginVertical: 10}]}>
                        Alasan:
                      </Text>
                      <View style={styles.inputAbout}>
                        <TextInput
                          multiline={true}
                          value={textJoin}
                          onChangeText={val => {
                            setTextJoin(val);
                          }}
                          style={{color: 'black'}}
                        />
                      </View>
                    </View>
                    <View style={styles.buttonWrap}>
                      <TouchableOpacity
                        style={styles.buttonYakin}
                        onPress={() => {
                          setModalJoinVisible(false);
                          handleJoin();
                        }}>
                        <View>
                          <Text style={styles.textYakin}>Yakin</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonBatal}
                        onPress={() => setModalJoinVisible(false)}>
                        <View>
                          <Text style={styles.textBatal}>Batal</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </Modal>
              </GestureRecognizer>
              {/* EndPopup */}

              {/* Popup Promote Idea*/}
              <GestureRecognizer
                style={styles.gesture}
                onSwipeDown={() => {
                  setModalPromoteVisible(false);
                }}>
                <Modal
                  animationType="none"
                  transparent={true}
                  visible={modalPromoteVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalPromoteVisible(!modalPromoteVisible);
                  }}>
                  <ScrollView>
                    <View style={{flex: 1}}>
                      <View style={styles.modalPromoteContainer}>
                        <View style={styles.titleWrap}>
                          <View style={styles.topLine}>
                            <TouchableOpacity
                              onPress={() => setModalPromoteVisible(false)}>
                              <TopLine />
                              <View style={styles.lineSpace} />
                              <TopLine />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.textTitle}>Promote Idea</Text>
                        </View>
                        <Text style={style.h5}>
                          Sebelum kamu memutuskan untuk mempromosikan inovasi
                          kamu harus melengkapi beberapa informasi dibawah agar
                          komunikasi diluar website ideabox berjalan dengan
                          lancar, good luck !
                        </Text>
                        {/* <Text style={[style.h4, {marginVertical: 10}]}>
                    Nomor Telepon :
                  </Text>
                  <TextInput
                    style={styles.input}
                    // value={''}
                    // onChangeText={() => { }}
                  /> */}
                        <Text style={[style.h4, {marginVertical: 10}]}>
                          Alasan :
                        </Text>
                        <View style={styles.inputAbout}>
                          <TextInput
                            multiline={true}
                            value={textPromote}
                            onChangeText={val => {
                              setTextPromote(val);
                            }}
                            style={{color: 'black'}}
                          />
                        </View>
                      </View>

                      <View style={styles.buttonWrap}>
                        <TouchableOpacity
                          style={styles.buttonYakin}
                          onPress={() => {
                            setModalPromoteVisible(false);
                            handlePromote();
                          }}>
                          <View>
                            <Text style={styles.textYakin}>Yakin</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.buttonBatal}
                          onPress={() => setModalPromoteVisible(false)}>
                          <View>
                            <Text style={styles.textBatal}>Batal</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ScrollView>
                </Modal>
              </GestureRecognizer>
            </ScrollView>
            {/* Modal promet&join idea */}
            <GestureRecognizer
              style={styles.gesture}
              onSwipeDown={() => {
                setModalBottom(false);
              }}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalBottom}
                onRequestClose={() => {
                  setModalBottom(false);
                }}>
                <ScrollView>
                  <View style={styles.modalPromoteContainer}>
                    <View style={styles.topLine}>
                      <TouchableOpacity onPress={() => setModalBottom(false)}>
                        <TopLine />
                        <View style={styles.lineSpace} />
                        <TopLine />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.contentModal}>
                      <View style={styles.rowPromote}>
                        {dataAsync.role === 'Senior Leader' ? (
                          <TouchableOpacity
                            onPress={() => {
                              setModalBottom(false);
                              setModalPromoteVisible(true);
                            }}>
                            <View style={styles.wrapPromote}>
                              <Promote />
                              <Text style={styles.textPromote}>Promote</Text>
                            </View>
                          </TouchableOpacity>
                        ) : null}

                        <TouchableOpacity
                          onPress={() => {
                            setModalBottom(false);
                            setModalJoinVisible(true);
                          }}>
                          <View style={styles.wrapPromote}>
                            <Join />
                            <Text style={styles.textPromote}>Join</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </Modal>
            </GestureRecognizer>
            {/* end Modal */}
          </>
        )}
      </>
      <RefreshFull
        visible={showRefreshButton}
        backgroundOpacity={0}
        message="Failed fetching data"
        onOffsetTouch={() => setShowRefreshButton(false)}
        onPress={() => {
          setShowRefreshButton(false);
          fetchIdeas(true);
        }}
      />
    </SafeAreaView>
  );
};

export default ExploreContent;
