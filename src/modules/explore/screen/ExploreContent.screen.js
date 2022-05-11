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
  Image,
} from 'react-native';
import {MentionInput} from 'react-native-controlled-mentions';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useDispatch, useSelector} from 'react-redux';
import {alignItems, width} from 'styled-system';
import {Cross, Join, Promote, TopLine} from '../../../assets/icon';
import CardComment from '../../../components/CardComment';
import CardContent from '../../../components/CardContent';
import CardContentNew from '../../../components/CardContentNew';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {RadioButton} from 'react-native-paper';
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
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchClick, setSearchClick] = useState('');
  //menu search
  const [searchHistory, setSearchHistory] = useState(true);
  const [mostLikedIdea, setMostLikedIdea] = useState(false);
  const [mostCommentedIdea, setMostCommentedIdea] = useState(false);
  const [mostProductiveInovator, setMostProductiveInovator] = useState(false);

  //filter
  const refRBSheet = useRef();
  const [checkedRadio, setCheckedRadio] = useState('1');
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);
  const [expand, setExpand] = useState(true);

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
  const CheckboxComponent = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
        <Text style={{fontFamily: 'Poppins-Regular', fontSize: 14}}>
          {props.name}
        </Text>
        <BouncyCheckbox
          size={20}
          fillColor="#7C4BFF"
          unfillColor="#FFFFFF"
          disableBuiltInState
          iconStyle={{
            borderColor: props.select ? '#7C4BFF' : '#D4DAE2',
            borderRadius: 6,
            marginRight: -15,
          }}
          onPress={props.onPress}
          isChecked={props.select}
          style={{
            marginRight: 0,
            alignSelf: 'flex-end',
          }}
        />
      </View>
    );
  };
  const RadioButtonComponent = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginRight: -6,
        }}>
        <Text>{props.value}</Text>
        <RadioButton
          value={props.value}
          status={props.checked === props.value ? 'checked' : 'unchecked'}
          onPress={props.onPress}
          color="#7C4BFF"
        />
      </View>
    );
  };
  const ContainerHistory = props => {
    return (
      <View style={styles.containerHistory}>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={{fontFamily: 'Poppins-Medium', fontSize: 12}}>
            {props.title}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/icon/crossnew.png')}
            style={{width: 12, height: 12}}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const SearchHistory = () => {
    return (
      <View>
        <TouchableOpacity style={{alignItems: 'flex-end', padding: 16}}>
          <Text style={styles.textClear}>Clear History</Text>
        </TouchableOpacity>
        <ContainerHistory title={'Bisnis'} />
        <ContainerHistory title={'Administrasi'} />
        <ContainerHistory title={'Politisi'} />
      </View>
    );
  };
  const ContainerLikeComment = props => {
    return (
      <View style={styles.containerMost}>
        <Image source={props.leaderboard} style={{width: 56, height: 56}} />
        <Image
          source={props.coveridea}
          style={{
            width: 80,
            height: 80,
            borderRadius: 4,
            marginHorizontal: 16,
          }}
        />
        <View style={{flex: 1}}>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14}}>
            {props.titleidea}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <Image
              source={props.imageavatar}
              style={{
                width: 26,
                height: 26,
                marginRight: 4,
                borderRadius: 26,
              }}
            />
            <Text style={{fontFamily: 'Roboto-Bold', fontSize: 12}}>
              {props.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={props.iconlikecomment}
              style={{
                width: 20.4,
                height: 18.5,
                marginRight: 8,
              }}
            />
            <Text style={{fontFamily: 'Roboto-Regular', fontSize: 12, flex: 1}}>
              {props.total} People {props.likecomment} this idea
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const MostLikedIdea = () => {
    return (
      <View style={{padding: 16}}>
        <Text
          style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 16}}>
          This Week
        </Text>
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/firstplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 1'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Vanesha Sirsilla'}
          total={133}
          iconlikecomment={require('../../../assets/icon/likebynew.png')}
          likecomment={'Liked'}
        />
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/secondplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 2'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Vanesha'}
          total={211}
          iconlikecomment={require('../../../assets/icon/likebynew.png')}
          likecomment={'Liked'}
        />
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/thirdplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 3'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Sirsilla'}
          total={331}
          iconlikecomment={require('../../../assets/icon/likebynew.png')}
          likecomment={'Liked'}
        />
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/thirdplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 3'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Sirsilla'}
          total={331}
          iconlikecomment={require('../../../assets/icon/likebynew.png')}
          likecomment={'Liked'}
        />
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/thirdplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 3'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Sirsilla'}
          total={331}
          iconlikecomment={require('../../../assets/icon/likebynew.png')}
          likecomment={'Liked'}
        />
      </View>
    );
  };
  const MostCommentedIdea = () => {
    return (
      <View style={{padding: 16}}>
        <Text
          style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 16}}>
          This Week
        </Text>
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/firstplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 1'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Vanesha Sirsilla'}
          total={133}
          iconlikecomment={require('../../../assets/icon/commentbynew.png')}
          likecomment={'Commented'}
        />
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/secondplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 2'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Vanesha'}
          total={211}
          iconlikecomment={require('../../../assets/icon/commentbynew.png')}
          likecomment={'Commented'}
        />
        <ContainerLikeComment
          leaderboard={require('../../../assets/icon/thirdplace.png')}
          coveridea={require('../../../assets/icon/dummyhistory.png')}
          titleidea={'Idea 3'}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Sirsilla'}
          total={331}
          iconlikecomment={require('../../../assets/icon/commentbynew.png')}
          likecomment={'Commented'}
        />
      </View>
    );
  };
  const ContainerProductive = props => {
    return (
      <View style={styles.containerMost}>
        <Image source={props.leaderboard} style={{width: 56, height: 56}} />
        <Image
          source={props.imageavatar}
          style={{
            width: 56,
            height: 56,
            marginHorizontal: 16,
            borderRadius: 56,
          }}
        />
        <View>
          <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 14}}>
            {props.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 4,
            }}>
            <Text style={{fontFamily: 'Poppins-Regular', fontSize: 12}}>
              {props.division}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{fontFamily: 'Poppins-Bold', fontSize: 12}}>
              Submitted {props.total} Ideas
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const MostProductive = () => {
    return (
      <View style={{padding: 16}}>
        <Text
          style={{fontFamily: 'Poppins-Bold', fontSize: 16, marginBottom: 16}}>
          This Week
        </Text>
        <ContainerProductive
          leaderboard={require('../../../assets/icon/firstplace.png')}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Rifdah Syihab'}
          division={'PT Telkom A'}
          total={30}
        />
        <ContainerProductive
          leaderboard={require('../../../assets/icon/secondplace.png')}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Rifdah'}
          division={'PT Telkom b'}
          total={22}
        />
        <ContainerProductive
          leaderboard={require('../../../assets/icon/thirdplace.png')}
          imageavatar={require('../../../assets/icon/dummyavatar.png')}
          name={'Syihab'}
          division={'PT Telkom c'}
          total={10}
        />
      </View>
    );
  };
  const MenuSearch = () => {
    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                setSearchHistory(true);
                setMostLikedIdea(false);
                setMostCommentedIdea(false);
                setMostProductiveInovator(false);
              }}
              style={[
                styles.rowSearch,
                {borderBottomColor: searchHistory ? '#7C4BFF' : '#9CA3AF'},
              ]}>
              <Text
                style={[
                  styles.textRowSearch,
                  {color: searchHistory ? 'black' : '#9CA3AF'},
                ]}>
                Search History
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSearchHistory(false);
                setMostLikedIdea(true);
                setMostCommentedIdea(false);
                setMostProductiveInovator(false);
              }}
              style={[
                styles.rowSearch,
                {borderBottomColor: mostLikedIdea ? '#7C4BFF' : '#9CA3AF'},
              ]}>
              <Text
                style={[
                  styles.textRowSearch,
                  {color: mostLikedIdea ? 'black' : '#9CA3AF'},
                ]}>
                Most Liked Idea
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSearchHistory(false);
                setMostLikedIdea(false);
                setMostCommentedIdea(true);
                setMostProductiveInovator(false);
              }}
              style={[
                styles.rowSearch,
                {
                  borderBottomColor: mostCommentedIdea ? '#7C4BFF' : '#9CA3AF',
                },
              ]}>
              <Text
                style={[
                  styles.textRowSearch,
                  {color: mostCommentedIdea ? 'black' : '#9CA3AF'},
                ]}>
                Most Commented Idea
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSearchHistory(false);
                setMostLikedIdea(false);
                setMostCommentedIdea(false);
                setMostProductiveInovator(true);
              }}
              style={[
                styles.rowSearch,
                {
                  borderBottomColor: mostProductiveInovator
                    ? '#7C4BFF'
                    : '#9CA3AF',
                },
              ]}>
              <Text
                style={[
                  styles.textRowSearch,
                  {color: mostProductiveInovator ? 'black' : '#9CA3AF'},
                ]}>
                Most Productive Inovator
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {searchHistory ? (
          <SearchHistory />
        ) : mostLikedIdea ? (
          <MostLikedIdea />
        ) : mostCommentedIdea ? (
          <MostCommentedIdea />
        ) : mostProductiveInovator ? (
          <MostProductive />
        ) : null}
      </View>
    );
  };
  const OutputSearch = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 14,
          marginBottom: 16,
          alignItems: 'center',
        }}>
        <Image
          source={require('../../../assets/icon/dummyhistory.png')}
          style={{width: 80, height: 80, borderRadius: 4, marginRight: 16}}
        />
        <View>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              marginBottom: 8,
            }}>
            Idea 1
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../../assets/icon/dummyavatar.png')}
              style={{
                width: 26,
                height: 26,
                borderRadius: 26,
                marginRight: 4,
              }}
            />
            <Text style={{fontFamily: 'Roboto-Bold', fontSize: 14}}>
              Vanesha Sirsilla
            </Text>
          </View>
        </View>
      </View>
    );
  };
  if (search === true) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View
            style={{flexDirection: 'row', alignItems: 'center', padding: 16}}>
            <TouchableOpacity onPress={() => setSearch(false)}>
              <Image
                source={require('../../../assets/icon/backnew.png')}
                style={{
                  width: 32,
                  height: 32,
                }}
              />
            </TouchableOpacity>
            <View style={[styles.searchBar, {marginHorizontal: 5, flex: 1}]}>
              <TextInput
                style={{fontSize: 12, color: 'black', padding: 0}}
                placeholder="Search..."
                onChangeText={val => setSearchInput(val)}
              />
              <TouchableOpacity
                style={styles.iconSearchContainer}
                onPress={() => setSearchClick(searchInput)}>
                <Image
                  source={require('../../../assets/icon/searchnew.png')}
                  style={styles.iconSearch}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              {/* Bottom Sheet */}
              <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                height={650}
                customStyles={{
                  container: {
                    padding: 16,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  },
                  wrapper: {
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  },
                  draggableIcon: {
                    backgroundColor: '#9CA3AF',
                  },
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', fontSize: 14}}>
                      Filter
                    </Text>
                  </View>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16}}>
                    Idea Category
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Light', fontSize: 12}}>
                    You can select multiple options
                  </Text>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#D4DAE2',
                      marginVertical: 12,
                    }}
                  />
                  <CheckboxComponent
                    onPress={() => {
                      setChecked(!checked);
                      setChecked2(!checked);
                      setChecked3(!checked);
                      setChecked4(!checked);
                      setChecked5(!checked);
                      setChecked6(!checked);
                    }}
                    select={checked}
                    name={'All'}
                  />
                  <CheckboxComponent
                    onPress={() => {
                      setChecked2(!checked2);
                    }}
                    select={checked2}
                    name={'Data Analytic'}
                  />
                  <CheckboxComponent
                    onPress={() => {
                      setChecked3(!checked3);
                    }}
                    select={checked3}
                    name={'Iot'}
                  />
                  <CheckboxComponent
                    onPress={() => {
                      setChecked4(!checked4);
                    }}
                    select={checked4}
                    name={'AI/ML'}
                  />
                  <CheckboxComponent
                    onPress={() => {
                      setChecked5(!checked5);
                    }}
                    select={checked5}
                    name={'Digital Connectivity'}
                  />
                  <CheckboxComponent
                    onPress={() => {
                      setChecked6(!checked6);
                    }}
                    select={checked6}
                    name={'Digital Services'}
                  />
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12,
                    }}>
                    <Text
                      style={{fontFamily: 'Poppin-Regular', color: '#6B7280'}}>
                      Other Category
                    </Text>
                    <Image
                      source={require('../../../assets/icon/arrowdown.png')}
                      style={{width: 10, height: 6, marginRight: 6}}
                    />
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Poppins-Bold', fontSize: 16}}>
                    Team Member
                  </Text>
                  <Text style={{fontFamily: 'Poppins-Light', fontSize: 12}}>
                    Number of members in each team
                  </Text>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#D4DAE2',
                      marginVertical: 12,
                    }}
                  />
                  <RadioButtonComponent
                    checked={checkedRadio}
                    onPress={() => setCheckedRadio('1')}
                    value="1"
                  />
                  <RadioButtonComponent
                    checked={checkedRadio}
                    onPress={() => setCheckedRadio('2')}
                    value="2"
                  />
                  <RadioButtonComponent
                    checked={checkedRadio}
                    onPress={() => setCheckedRadio('3')}
                    value="3"
                  />
                  <RadioButtonComponent
                    checked={checkedRadio}
                    onPress={() => setCheckedRadio('1-2')}
                    value="1-2"
                  />
                  <RadioButtonComponent
                    checked={checkedRadio}
                    onPress={() => setCheckedRadio('1-3')}
                    value="1-3"
                  />
                  <RadioButtonComponent
                    checked={checkedRadio}
                    onPress={() => setCheckedRadio('2-3')}
                    value="2-3"
                  />
                  <View
                    style={{
                      height: 1,
                      backgroundColor: '#D4DAE2',
                      marginVertical: 16,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setChecked(false);
                        setChecked2(false);
                        setChecked3(false);
                        setChecked4(false);
                        setChecked5(false);
                        setChecked6(false);
                        setCheckedRadio('1');
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Regular',
                          fontSize: 11,
                          color: '#FF5C1B',
                        }}>
                        Clear all filters
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        width: 84,
                        height: 31,
                        backgroundColor: '#7C4BFF',
                        borderRadius: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppin-Regular',
                          fontSize: 12,
                          color: '#FAFAFB',
                        }}>
                        Apply
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </RBSheet>
              {/* End Bottom Sheet */}
              <Image
                source={require('../../../assets/icon/filternew.png')}
                style={{
                  width: 32,
                  height: 32,
                }}
              />
            </TouchableOpacity>
          </View>
          {searchClick === '' ? <MenuSearch /> : <OutputSearch />}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* {success === 200 ? (
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
      ) : null} */}
      <>
        <View style={{padding: 16}}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => {
              setSearch(true);
              setSearchClick('');
            }}>
            <Text style={styles.inputSearch}>Search...</Text>
            <View style={styles.iconSearchContainer}>
              <Image
                source={require('../../../assets/icon/searchnew.png')}
                style={styles.iconSearch}
              />
            </View>
          </TouchableOpacity>
        </View>
        <CardContentNew />
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
            </ScrollView>
          </>
        )}
      </>
      {/* <RefreshFull
        visible={showRefreshButton}
        backgroundOpacity={0}
        message="Failed fetching data"
        onOffsetTouch={() => setShowRefreshButton(false)}
        onPress={() => {
          setShowRefreshButton(false);
          fetchIdeas(true);
        }}
      /> */}
    </SafeAreaView>
  );
};

export default ExploreContent;
