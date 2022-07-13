import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {RadioButton} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import CardContentNew from '../../../components/CardContentNew';
import Gap from '../../../components/Gap';
import ModalMessage from '../../../components/ModalMessage';
import {GetIdeasAPI} from '../../../config/RequestAPI/IdeaAPI';
import {GetUserById} from '../../../config/RequestAPI/UserAPI';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';
import styles from '../style/Explore.style';

const ExploreContent = ({navigation, route}) => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);
  const [data, setData] = useState({isSet: false, data: []});
  const [listUserData, setListUserData] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchClick, setSearchClick] = useState('');
  //menu search
  const [searchHistory, setSearchHistory] = useState(true);
  const [mostLikedIdea, setMostLikedIdea] = useState(false);
  const [mostCommentedIdea, setMostCommentedIdea] = useState(false);
  const [mostProductiveInovator, setMostProductiveInovator] = useState(false);
  const [showIdeaLimit, setShowIdeaLimit] = useState(10);
  const [getMoreIdeaLoading, setGetMoreIdeaLoading] = useState(false);

  const [messageModal, setMessageModal] = useState({
    visible: false,
    message: undefined,
    title: undefined,
    type: 'smile',
    onClose: () => {},
  });

  //filter
  const refRBSheet = useRef();
  const [checkedRadio, setCheckedRadio] = useState('1');
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [checked5, setChecked5] = useState(false);
  const [checked6, setChecked6] = useState(false);

  const fetchIdeas = (withIndicator, showLimit = 10) => {
    if (withIndicator) {
      setFetchLoading(true);
    }
    GetIdeasAPI(stateGlobal.userToken?.authToken, showLimit).then(res => {
      setFetchLoading(false);
      if (res.status === 'SUCCESS') {
        setData({isSet: true, data: res.data});
      }
    });
  };

  const getMoreIdeas = () => {
    if (
      !getMoreIdeaLoading &&
      !fetchLoading &&
      data.data?.length <= showIdeaLimit
    ) {
      setGetMoreIdeaLoading(true);
      const tempShowIdeaLimit = showIdeaLimit + 10;
      GetIdeasAPI(stateGlobal.userToken?.authToken, tempShowIdeaLimit).then(
        res => {
          setGetMoreIdeaLoading(false);
          if (res.status === 'SUCCESS') {
            setShowIdeaLimit(tempShowIdeaLimit);
            setData({isSet: true, data: res.data});
          }
        },
      );
    }
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (stateGlobal.userToken !== null) {
      fetchIdeas(true);
    }
  }, []);

  // ini cara untuk memicu refresh ketika dibutuhkan.
  useEffect(() => {
    if (route.params?.refresh?.status) {
      fetchIdeas(true);
    }
    if (route.params?.refresh?.status) {
      navigation.setParams({
        ...route.params,
        refresh: {status: false},
      });
    }
  }, [route.params?.refresh]);

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
      <View style={{padding: 16}}>
        <TouchableOpacity
          activeOpacity={1}
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

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: data.isSet && data.data.length === 0 ? 20 : 0,
          paddingBottom: 20,
        }}>
        {data.isSet && data.data.length === 0 ? (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 15,
              color: colors.text.secondary,
              fontFamily: fonts.secondary[400],
            }}>
            List of ideas not yet available
          </Text>
        ) : (
          <>
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={fetchLoading}
                  onRefresh={() => fetchIdeas(true)}
                  colors={['#085D7A']} // add more array value to switching colors while progressing
                />
              }
              onEndReached={({distanceFromEnd}) => {
                console.log(distanceFromEnd);
                if (distanceFromEnd >= 0) {
                  getMoreIdeas();
                }
              }}
              onEndReachedThreshold={0.1}
              data={data.data.concat([{isAdditionalLoading: true}])}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
              inverted={false}
              renderItem={({item, index}) =>
                !item.isAdditionalLoading ? (
                  <CardContentNew
                    ideaId={item.id}
                    creatorId={item.user?.id}
                    creatorName={item.user?.name?.replace(
                      /(?:^|\s)\S/g,
                      function (a) {
                        return a.toUpperCase();
                      },
                    )}
                    creatorPicture={item.user?.pictures}
                    // listUser={listUserData}
                    title={item.desc[0].value}
                    description={item.desc[1].value}
                    cover={item.desc[2]?.value}
                    likes={item.like}
                    comments={item.comment}
                    onIdeaPress={ideaId =>
                      navigation.navigate('DetailIdea', {
                        ideaId: ideaId,
                        userToken: stateGlobal.userToken,
                        // creatorData: item.user,
                        // listUser: listUserData,
                        ideaDataList: data.data,
                      })
                    }
                    onCreatorPress={creatorId =>
                      navigation.navigate('MyProfile', {
                        editable: false,
                        userId: creatorId,
                        userToken: stateGlobal.userToken,
                        ideaData: data.data,
                      })
                    }
                    onCommentChange={() => {
                      fetchIdeas(true);
                    }}
                  />
                ) : (
                  getMoreIdeaLoading && (
                    <>
                      <View style={{alignItems: 'center'}}>
                        <ActivityIndicator
                          color={colors.primary}
                          size="large"
                        />
                      </View>
                      <Gap height={16} />
                    </>
                  )
                )
              }
            />
          </>
        )}
      </View>
      {/* modal message */}
      <ModalMessage
        visible={messageModal.visible && isFocused}
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
    </SafeAreaView>
  );
};

export default ExploreContent;
