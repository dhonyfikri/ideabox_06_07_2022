import {useBackHandler} from '@react-native-community/hooks';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Back, Cross, Edit, Notif} from '../../../assets/icon';
import CardAchievement from '../../../components/CardAchievement';
import CardTrackRecord from '../../../components/CardTrackRecord';
import FailedModal from '../../../components/FailedModal';
import getData from '../../../components/GetData';
import LoadingScreen from '../../../components/LoadingScreen';
import SuccesModal from '../../../components/SuccesModal';
import {defaultAuthState} from '../../../config/Auth.cfg';
import DeleteAchievement from '../../../config/DeleteData/DeleteAchievement';
import {UserServiceBaseUrl} from '../../../config/Environment.cfg';
import GetDataTrackRecord from '../../../config/GetData/GetDataTrackRecord';
import AddAchievement from '../../../config/PostData/AddAchievement';
import Header from '../../../components/Header';
import style from '../../../config/Style/style.cfg';
import styles from '../style/Profile.style';

const Tag = props => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{props.title}</Text>
    </View>
  );
};

const Profile = ({navigation, route}) => {
  const [data, setData] = useState(defaultAuthState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAboutVisible, setModalAboutVisible] = useState(false);
  const [dataTrackRecord, setDataTrackRecord] = useState('');
  const [successModal, setSuccessModal] = useState(null);
  const [about, setAbout] = useState('');
  const [achiev, setAchiev] = useState('');
  // dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [array, setArray] = useState(false);
  var indexSupport = 0;
  var indexJoin = 0;

  const [isProfileUpdated, setIsProfileUpdated] = useState(false);

  const backToPreviousPage = () => {
    if (isProfileUpdated) {
      navigation.navigate('DrawerNavigation', {onResume: {refresh: true}});
    } else {
      navigation.goBack();
    }
  };

  // on resume handler from other page
  useEffect(() => {
    if (route.params?.onResume.refresh) {
      console.log('refreshing in profile');
      setIsProfileUpdated(true);
    }
  }, [route.params?.onResume]);

  useEffect(() => {
    if (dataTrackRecord === '' || data === defaultAuthState) {
      if (data === defaultAuthState) {
        getData().then(jsonValue => setData(jsonValue));
        return <LoadingScreen navigation={navigation} />;
      }
      GetDataTrackRecord(data.id).then(response =>
        setDataTrackRecord(response !== undefined ? response : ''),
      );
    }
  });

  useBackHandler(() => {
    backToPreviousPage();
    return true;
  });

  if (dataTrackRecord === '' || data === defaultAuthState) {
    return <LoadingScreen navigation={navigation} />;
  }
  const handlePost = () => {
    axios({
      crossDomain: true,
      method: 'post',
      url: `${UserServiceBaseUrl}/trackrecord/editabout`,
      data: {
        userId: data.id,
        bio: about,
      },
      validateStatus: false,
    })
      .then((response, status) => {
        if (response.status === 200) {
          console.log('berhasil');
          setSuccessModal(200);
        } else {
          setSuccessModal(-1);
        }
      })
      .catch(function (error) {
        console.log(error);
        // need handling error
      });
  };
  const getDataSuccess = data => {
    setSuccessModal(data);
  };
  const handleAchiev = () => {
    AddAchievement(data.id, value, achiev).then(res => setSuccessModal(res));
  };
  const handleDelete = idAchieve => {
    DeleteAchievement(idAchieve, data.id).then(res => {
      setSuccessModal(res);
    });
  };

  if (array === false) {
    dataTrackRecord.ideas.map(val => {
      setItems(res => [...res, {label: val.desc[0].value, value: val.id}]);
    });
    setArray(true);
  }
  if (successModal === 200 || successModal === 201) {
    GetDataTrackRecord(data.id).then(response => setDataTrackRecord(response));
  }
  return (
    <SafeAreaView style={styles.container}>
      {successModal === 200 || successModal === 201 ? (
        <SuccesModal
          desc={'Congrats your track record have been updated!'}
          getData={getDataSuccess}
          navigation={navigation}
        />
      ) : successModal !== null ? (
        <FailedModal
          desc={'Your data failed to update!'}
          getData={getDataSuccess}
          navigation={navigation}
        />
      ) : null}
      <ScrollView>
        <Header
          title="Profile"
          onNotificationPress={() => navigation.navigate('Notification')}
        />
        <View style={styles.profilePicture}>
          {dataTrackRecord.user.pictures === '' ? (
            <Image
              source={require('../../../assets/image/profilepicture.jpg')}
              style={styles.image}
            />
          ) : (
            <Image
              source={{uri: dataTrackRecord.user.pictures}}
              style={styles.image}
            />
          )}
        </View>
        {/*image*/}
        <View style={styles.imageBackground}>
          {dataTrackRecord.user.background === '' ? (
            <Image
              source={require('../../../assets/image/dummyPicture2.png')}
              style={styles.backgroundImage}
            />
          ) : (
            <Image
              source={{uri: dataTrackRecord.user.background}}
              style={styles.backgroundImage}
            />
          )}
        </View>
        {/*main content */}
        <View style={styles.mainContainer}>
          <View style={styles.mainContent}>
            <Text style={styles.h1}>{data.name}</Text>
            <Text style={styles.h2}>{dataTrackRecord.user.regional}</Text>
            <Text style={styles.h3}>{dataTrackRecord.user.loker}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('InputProfile', {
                skill: dataTrackRecord.skillSet,
              })
            }>
            <View style={styles.Button}>
              <Edit />
            </View>
          </TouchableOpacity>
        </View>

        <View style={{paddingHorizontal: 15, paddingTop: 10}}>
          {/* Track Record */}
          <View style={styles.CardTrackRecord}>
            <CardTrackRecord
              number={dataTrackRecord.totalIdeas}
              text={'Ideas'}
              image={require('../../../assets/image/dummy1.png')}
              color={'#FC9C10'}
            />
            <CardTrackRecord
              number={dataTrackRecord.totalLike}
              text={'Likes'}
              image={require('../../../assets/image/dummy2.png')}
              color={'#ED1B5C'}
            />
            <CardTrackRecord
              number={dataTrackRecord.totalComment}
              text={'Comments'}
              image={require('../../../assets/image/dummy3.png')}
              color={'#177FC6'}
            />
            <CardTrackRecord
              number={dataTrackRecord.trending}
              text={'Trendings'}
              image={require('../../../assets/image/dummy4.png')}
              color={'#3ACECA'}
            />
          </View>

          {/* About */}
          <View style={styles.cardContainer}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.title}>About</Text>
              <TouchableOpacity onPress={() => setModalAboutVisible(true)}>
                <Image
                  source={require('../../../assets/icon/edit.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
            {/* Textbox using const */}
            <View style={styles.textBox}>
              <Text style={style.h5}>
                {dataTrackRecord.user.bio
                  ? dataTrackRecord.user.bio
                  : 'Belum ada biografi'}
              </Text>
            </View>
          </View>

          {/*Skill */}
          <View style={styles.cardContainer}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.title}>Skill</Text>
            </View>
            {/* Tag */}
            <View style={styles.tagContainer}>
              {Object.keys(dataTrackRecord.skillSet).length > 0 ? (
                dataTrackRecord.skillSet.map(val => <Tag title={val.name} />)
              ) : (
                <Text style={style.h5}>Belum ada keahlian</Text>
              )}
            </View>
          </View>

          {/* Achievement */}
          <View style={styles.cardContainer}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.title}>Achievement</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    source={require('../../../assets/icon/add.png')}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.achievementContainer}>
              {Object.keys(dataTrackRecord.achievement).length > 0 ? (
                dataTrackRecord.achievement.map(val => (
                  <CardAchievement
                    title={val.ideaId.title.value}
                    desc={val.pencapaian}
                    delete={() => handleDelete(val.id)}
                  />
                ))
              ) : (
                <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
                  <Text style={style.h5}>Belum ada pencapaian</Text>
                </View>
              )}
            </View>
          </View>

          {/* Inovation*/}
          <View style={styles.cardContainer}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.title}>Innovation</Text>
            </View>
            <View style={styles.textInnovation}>
              {Object.keys(dataTrackRecord.ideas).length > 0 ? (
                dataTrackRecord.ideas.map((val, index) => {
                  var numberJoin = 0;
                  var numberPromote = 0;
                  return (
                    <View>
                      {index === 0 ? null : (
                        <View
                          style={{
                            height: 1,
                            width: '100%',
                            backgroundColor: 'grey',
                            marginVertical: 15,
                          }}
                        />
                      )}

                      <View
                        style={{
                          width: '100%',
                          height: 200,
                          borderWidth: 1,
                          borderRadius: 10,
                        }}>
                        <Image
                          style={{
                            flex: 1,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                          source={{uri: val.desc[1].value}}
                        />
                      </View>
                      <View>
                        <Text style={[style.h4, {marginVertical: 10}]}>
                          {val.desc[0].value}
                        </Text>
                        <Text style={[style.h5]}>{val.desc[2].value}</Text>
                        <Text style={[style.h4, {marginVertical: 10}]}>
                          Team:
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '100%',
                            flexWrap: 'wrap',
                          }}>
                          {val.approvalTeam.map(data => {
                            if (data.request === 'join') {
                              numberJoin = numberJoin + 1;
                              return (
                                <View style={{marginRight: 10}}>
                                  <Text style={[style.h5]}>
                                    {' '}
                                    {numberJoin}. {data.approvalTo.name}
                                  </Text>
                                </View>
                              );
                            }
                            return null;
                          })}
                        </View>
                        <Text style={[style.h4, {marginVertical: 10}]}>
                          Support:
                        </Text>
                        {val.approvalTeam.map(data => {
                          if (data.request === 'support') {
                            numberPromote = numberPromote + 1;
                            return (
                              <View style={{marginRight: 10}}>
                                <Text style={[style.h5]}>
                                  {' '}
                                  {numberPromote}. {data.approvalTo.name}
                                </Text>
                              </View>
                            );
                          }
                          return null;
                        })}
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={style.h5}>Belum ada inovasi</Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Popup Edit achievment */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.centeredcontainer}>
            <View style={styles.modalView}>
              <View style={styles.titleContainer}>
                <Text style={styles.textEdit}>Achievement</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.h2}>Nama Inovasi :</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={styles.input}
                  placeholder="Pilih ide"
                  maxHeight={120}
                  listItemContainerStyle={{height: 40}}
                />
                <Text style={styles.h2}>Pencapaian :</Text>
                <TextInput
                  style={styles.input}
                  value={achiev}
                  onChangeText={val => {
                    setAchiev(val);
                  }}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(false);
                    handleAchiev();
                  }}>
                  <Text style={styles.save}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* EndPopup */}

      {/* Popup About*/}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalAboutVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalAboutVisible(!modalAboutVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.centeredcontainer}>
            <View style={styles.modalView}>
              <View style={styles.titleContainer}>
                <Text style={styles.textEdit}>About</Text>
                <TouchableOpacity onPress={() => setModalAboutVisible(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputAbout}>
                  <TextInput
                    style={styles.textInputAbout}
                    multiline={true}
                    value={about}
                    onChangeText={val => {
                      setAbout(val);
                    }}
                  />
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalAboutVisible(false);
                    handlePost();
                  }}>
                  <Text style={styles.save}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* EndPopup */}
    </SafeAreaView>
  );
};

export default Profile;
