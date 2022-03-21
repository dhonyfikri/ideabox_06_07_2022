import React, {useEffect, useState} from 'react';
import {prefetchConfiguration} from 'react-native-app-auth';
import styles from '../style/ProfileUser.style';
import getData from '../../../components/GetData';
import {AuthConfig, defaultAuthState} from '../../../config/Auth.cfg';
import {Back, BackBlue, Cross, Edit, Notif} from '../../../assets/icon';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import CardTrackRecord from '../../../components/CardTrackRecord';
import CardAchievement from '../../../components/CardAchievement';
import CardContent from '../../../components/CardContent';
import style from '../../../config/Style/style.cfg';
import LoadingScreen from '../../../components/LoadingScreen';
import GetDataTrackRecord from '../../../config/GetData/GetDataTrackRecord';

const Tag = props => {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{props.title}</Text>
    </View>
  );
};

const ProfileUserMyIdea = ({navigation, route}) => {
  const dataProfile = route.params.data;
  const [data, setData] = useState(defaultAuthState);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAboutVisible, setModalAboutVisible] = useState(false);
  const [dataTrackRecord, setDataTrackRecord] = useState('');
  var indexSupport = 0;
  var indexJoin = 0;
  useEffect(() => {
    if (dataProfile === null) {
      return <LoadingScreen />;
    }
    GetDataTrackRecord(dataProfile.createdBy.id).then(response =>
      setDataTrackRecord(response),
    );
  }, [dataProfile]);
  if (dataTrackRecord === '') {
    return <LoadingScreen />;
  }
  console.log(dataProfile);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* header */}
        <View style={styles.head}>
          <View style={styles.Button}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Back />
            </TouchableOpacity>
          </View>
          <View style={styles.Button}>
            <Notif />
          </View>
        </View>
        <View style={styles.profilePicture}>
          <Image
            source={
              dataTrackRecord.user.pictures === ''
                ? require('../../../assets/icon/profilepicture.png')
                : {uri: dataTrackRecord.user.pictures}
            }
            style={styles.image}
          />
        </View>
        {/*image*/}
        <View style={styles.imageBackground}>
          <Image
            source={
              dataTrackRecord.user.background === ''
                ? require('../../../assets/image/coverProfile.png')
                : {uri: dataTrackRecord.user.background}
            }
            style={styles.backgroundImage}
          />
        </View>
        {/*main content */}
        <View style={styles.mainContainer}>
          <View style={styles.mainContent}>
            <Text style={styles.h1}>{dataTrackRecord.user.name}</Text>
            <Text style={styles.h2}>{dataTrackRecord.user.regional}</Text>
            <Text style={styles.h2}>{dataTrackRecord.user.loker}</Text>
          </View>
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
            </View>
            {/* Textbox using const */}
            <View style={styles.textBox}>
              <Text style={style.h5}>{dataTrackRecord.user.bio}</Text>
            </View>
          </View>

          {/*Skill */}
          <View style={styles.cardContainer}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.title}>Skill</Text>
            </View>
            {/* Tag */}
            <View style={styles.textBox}>
              {dataTrackRecord.skillSet.map(val => (
                <Tag title={val.name} />
              ))}
            </View>
          </View>

          {/* Achievement */}
          {/* <View style={styles.cardContainer}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.title}>Achievement</Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../../assets/icon/add.png')}
                  style={{width: 20, height: 20, marginRight: 10}}
                />
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Image
                    source={require('../../../assets/icon/edit.png')}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.achievementContainer}>
              <CardAchievement
                title={'Sistem keuangan berbasis web untuk KUKM'}
                desc={'Top 25 Ideahack'}
              />
              <CardAchievement
                title={'Indonesia Menerapkan IoT'}
                desc={'Juara Harapan 2'}
              />
            </View>
          </View> */}
          {/* Inovation*/}
          <View style={styles.cardContainer}>
            <View style={styles.aboutTitleContainer}>
              <Text style={styles.title}>Innovation</Text>
            </View>
            <View style={styles.textInnovation}>
              {dataTrackRecord.ideas.map((val, index) => {
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
                        style={{flex: 1, resizeMode: 'cover', borderRadius: 10}}
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
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileUserMyIdea;
