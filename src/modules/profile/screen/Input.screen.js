import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {prefetchConfiguration} from 'react-native-app-auth';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {Camera, Cross, Notif} from '../../../assets/icon';
import FailedModal from '../../../components/FailedModal';
import getData from '../../../components/GetData';
import LoadingScreen from '../../../components/LoadingScreen';
import SuccesModal from '../../../components/SuccesModal';
import Header from '../../../components/Header';
import {
  AuthConfig,
  defaultAuthState,
  defaulthAuthData,
} from '../../../config/Auth.cfg';
import {UserServiceBaseUrl} from '../../../config/Environment.cfg';
import GetDataProfile from '../../../config/GetData/GetDataProfile';
import GetDataSkill from '../../../config/GetData/GetDataSkill';
import styles from '../style/Input.style';
import {useBackHandler} from '@react-native-community/hooks';

const InputProfile = ({navigation, route}) => {
  const [data, setData] = useState(defaultAuthState);
  const [success, setSuccess] = useState(false);
  const [successModal, setSuccessModal] = useState(null);
  const [update, setUpdate] = useState(defaulthAuthData);
  const [pickedDate, setPickedDate] = useState(null);
  const [imageUri, setImageUri] = useState(
    require('../../../assets/image/dummyPicture2.png'),
  );
  const [profile, setProfile] = useState(null);
  const [imageCover, setImageCover] = useState(null);
  const [imageProfile, setImageProfile] = useState(null);
  const [dataProfile, setDataProfile] = useState({success: false, data: {}});
  // const [dataCfu, setDataCfu] = useState(null);
  const [dataSkill, setDataSkill] = useState({success: false, data: []});
  const [dataJenisKelamin, setDataJenisKelamin] = useState({
    success: false,
    data: [],
  });
  const [dataGender, setDataGender] = useState(null);
  // const [dataCategoryUnit, setDataCategoryUnit] = useState(null);
  // const [dataUnit, setDataUnit] = useState(null);
  // const [array, setArray] = useState(false);
  // const [array3, setArray3] = useState(false);
  // const [array2, setArray2] = useState(false);
  const [array4, setArray4] = useState(false);
  const [arrayDdJenisKelamin, setArrayDdJenisKelamin] = useState(false);
  // const [change, setChange] = useState(false);
  // const [change2, setChange2] = useState(false);
  // dropdown 1
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Hustler', value: 'HUSTLER'},
    {label: 'Hipster', value: 'HIPSTER'},
    {label: 'Hacker', value: 'HACKER'},
  ]);
  // dropdown1
  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([]);

  // dropdown1
  // const [open2, setOpen2] = useState(false);
  // const [value2, setValue2] = useState(null);
  // const [items2, setItems2] = useState([]);
  // dropdown1
  // const [open3, setOpen3] = useState(false);
  // const [value3, setValue3] = useState(null);
  // const [items3, setItems3] = useState([]);
  // dropdown1
  const [open4, setOpen4] = useState(false);
  const [value4, setValue4] = useState(null);
  const [items4, setItems4] = useState([]);

  // dropdownJenisKelamin
  const [openDdJenisKelamin, setOpenDdJenisKelamin] = useState(false);
  const [valueDdJenisKelamin, setValueDdJenisKelamin] = useState(null);
  const [itemsDdJenisKelamin, setItemsDdJenisKelamin] = useState([]);

  const [openedDropdown, setOpenedDropdown] = useState({dropdownName: ''});

  const [isUpdated, setIsUpdated] = useState(false);

  const dropdownOpenHandler = useCallback(type => () => {
    if (type === openedDropdown.dropdownName) {
      setOpenedDropdown({dropdownName: ''});
    } else {
      setOpenedDropdown({dropdownName: type});
    }
  });

  const backToPreviousPage = () => {
    if (isUpdated) {
      navigation.navigate('Profile', {onResume: {refresh: true}});
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    getData().then(jsonValue => setData(jsonValue));
    prefetchConfiguration({
      warmAndPrefetchChrome: Platform.OS === 'android',
      ...AuthConfig,
    });
  }, []);

  useEffect(() => {
    if (data !== defaultAuthState && !dataProfile.success) {
      console.log('get profile');
      GetDataProfile(data.id).then(jsonValue => {
        setDataProfile(
          jsonValue !== undefined
            ? {success: true, data: jsonValue}
            : {...dataProfile, success: false},
        );
      });
    }
    if (dataProfile.success) {
      if (dataProfile.data.teamStructure !== '' && value1 === null) {
        setValue1(dataProfile.data.teamStructure);
      }
      if (
        dataProfile.data.jenisKelamin !== null &&
        valueDdJenisKelamin === null
      ) {
        setValueDdJenisKelamin(dataProfile.data.jenisKelamin);
      }
      if (route.params.skill !== undefined) {
        const userSkillTemp = [];
        route.params.skill.map(item => {
          userSkillTemp.push(item.id);
        });
        setValue4(userSkillTemp);
      }
    }
  }, [dataProfile, data]);

  useEffect(() => {
    if (data !== defaultAuthState && !dataSkill.success) {
      console.log('get skill');
      GetDataSkill().then(res => {
        setDataSkill(
          res !== undefined
            ? {success: true, data: res}
            : {...dataSkill, success: false},
        );
      });
    }
    if (dataSkill.success) {
      const skillDataTemp = [];
      dataSkill.data.map(val => {
        skillDataTemp.push({label: val.name, value: val.id});
      });
      setItems4(skillDataTemp);
    }
  }, [dataSkill, data]);

  useEffect(() => {
    if (data !== defaultAuthState && !dataJenisKelamin.success) {
      console.log('get jenis kelamin');
      const dataFromServer = [
        {
          id: 'PRIA',
          name: 'Laki-laki',
        },
        {
          id: 'WANITA',
          name: 'Perempuan',
        },
      ];
      setDataJenisKelamin({
        success: true,
        data: dataFromServer,
      });
    }
    if (dataJenisKelamin.success) {
      const genderDataTemp = [];
      dataJenisKelamin.data.map(val => {
        genderDataTemp.push({label: val.name, value: val.id});
      });
      setItemsDdJenisKelamin(genderDataTemp);
    }
  }, [dataJenisKelamin, data]);

  useBackHandler(() => {
    backToPreviousPage();
    return true;
  });

  if (
    // dataProfile === null ||
    // dataCfu === null ||
    // dataSkill === null ||
    // dataJenisKelamin === null
    !dataProfile.success
  ) {
    console.log('loading');
    return <LoadingScreen navigation={navigation} />;
  }

  // useEffect(() => {
  //   // const xx = ['k', 'p'];
  //   // console.log(Object.keys(xx).length);

  //   if (
  //     dataProfile === null ||
  //     // dataCfu === null ||
  //     dataSkill === null ||
  //     dataJenisKelamin === null
  //   ) {
  //     getData().then(jsonValue => setData(jsonValue));
  //     prefetchConfiguration({
  //       warmAndPrefetchChrome: Platform.OS === 'android',
  //       ...AuthConfig,
  //     });
  //     if (data === defaultAuthState) {
  //       return <LoadingScreen navigation={navigation} />;
  //     }
  //     GetDataProfile(data.id).then(jsonValue =>
  //       setDataProfile(jsonValue !== undefined ? jsonValue : null),
  //     );
  //     // GetDataCfu().then(res => setDataCfu(res));
  //     GetDataSkill().then(res => {
  //       setDataSkill(res !== undefined ? res : null);
  //     });
  //     if (dataJenisKelamin === null) {
  //       setDataJenisKelamin([
  //         {
  //           id: 1,
  //           name: 'Laki-laki',
  //         },
  //         {
  //           id: 2,
  //           name: 'Perempuan',
  //         },
  //       ]);
  //     }
  //   }
  // });
  // useEffect(() => {
  //   setArray2(false);
  //   setItems2([]);
  //   setDataCategoryUnit(null);
  // }, [value]);
  // useEffect(() => {
  //   setArray3(false);
  //   setItems3([]);
  //   setDataUnit(null);
  // }, [value2]);
  // useEffect(() => {
  //   GetDataCategoryUnit(value).then(res => setDataCategoryUnit(res));
  //   console.log(dataCategoryUnit);
  // }, [value]);
  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 640,
      height: 360,
      cropping: true,
    }).then(image => {
      setImageCover(image.path);
    });
  };
  const takePhotoFromLibraryProfile = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      console.log(image.size);
      setImageProfile(image.path);
    });
  };

  const storeDataLdap = async () => {
    try {
      if (dataProfile.data.name !== '') {
        const jsonValue = JSON.stringify(dataProfile.data);
        await AsyncStorage.setItem('authState', jsonValue);
      }
    } catch (e) {
      console.log('failed to store data');
    }
  };

  const handlePostCover = () => {
    var formData = new FormData();
    var img = {
      uri: imageCover,
      name: 'photo.jpeg',
      type: 'image/jpeg',
    };
    formData.append('userId', dataProfile.data.id);
    formData.append('background', img);
    axios({
      crossDomain: true,
      method: 'post',
      url: `${UserServiceBaseUrl}/trackrecord/editbackground`,
      data: formData,
      validateStatus: false,
    })
      .then((response, status) => {
        console.log('image background status', response.status);
        // setSuccessModal(response.status);
      })
      .catch(function (error) {
        console.log(error);
        // need handling error
      });
  };
  const handlePostProfile = () => {
    var formData = new FormData();
    var img = {
      uri: imageProfile,
      name: 'photo.jpeg',
      type: 'image/jpeg',
    };
    formData.append('userId', dataProfile.data.id);
    formData.append('pictures', img);
    axios({
      crossDomain: true,
      method: 'post',
      url: `${UserServiceBaseUrl}/trackrecord/editpicture`,
      data: formData,
      validateStatus: false,
    })
      .then((response, status) => {
        console.log('foto Profile status :', response.status);
        // setSuccessModal(response.status);
      })
      .catch(function (error) {
        console.log(error);
        // need handling error
      });
  };
  const handlePost = () => {
    // const mySentence = 'freeCodeCamp is an awesome resource';
    // const words = mySentence.split(' ');

    // for (let i = 0; i < words.length; i++) {
    //   words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    // }

    // words.join(' ');
    // console.log(words);

    // const mySentence = 'freeCodeCamp is an awesome resource';
    // const words = mySentence.split(' ');

    // words
    //   .map(word => {
    //     return word[0].toUpperCase() + word.substring(1);
    //   })
    //   .join(' ');
    axios({
      crossDomain: true,
      method: 'post',
      url: `${UserServiceBaseUrl}/trackrecord/editprofile`,
      data: {
        userId: dataProfile.data.id,
        name: dataProfile.data.name,
        // nik: dataProfile.nik,
        email: dataProfile.data.email,
        noTelp: dataProfile.data.noTelp,
        // tglLahir: dataProfile.tglLahir,
        // namaAtasan: dataProfile.namaAtasan,
        // nikAtasan: dataProfile.nikAtasan,
        // anakPerusahaan: dataProfile.anakPerusahaan,
        // loker: dataProfile.loker,
        // regional: dataProfile.regional,
        // categoryUnitId: value3,
        teamStructure: value1,
        skillSetId: value4,
        jenisKelamin: valueDdJenisKelamin,
        perusahaan: 'dummyPerusahaan',
        pekerjaan: 'dummyPekerjaan',
      },
      validateStatus: false,
    })
      .then((response, status) => {
        console.log(response);
        setIsUpdated(true);
        setSuccessModal(response.status);
        storeDataLdap();
      })
      .catch(function (error) {
        console.log(error);
        // need handling error
      });
  };

  const getDataSuccess = data => {
    setSuccessModal(data);
  };
  //calender
  const handleText = () =>
    pickedDate
      ? moment(pickedDate).format('YYYY-MM-DD')
      : dataProfile.data.tglLahir;

  if (imageCover === null || imageProfile === null) {
    setImageCover(dataProfile.data.background);
    setImageProfile(dataProfile.data.pictures);
  }

  // //skill
  // if (dataSkill !== undefined) {
  //   if (array4 === false) {
  //     if (dataSkill !== null) {
  //       dataSkill.map(val => {
  //         setItems4(res => [...res, {label: val.name, value: val.id}]);
  //       });
  //       setArray4(true);
  //     }
  //   }
  // }
  //cfu/fu
  // if (dataCfu !== undefined) {
  //   if (array === false) {
  //     if (dataCfu !== null) {
  //       dataCfu.map(val => {
  //         setItems(res => [...res, {label: val.name, value: val.id}]);
  //       });
  //       setArray(true);
  //     }
  //   }
  // }
  //category unit
  // if (value !== null) {
  //   if (dataCategoryUnit === null) {
  //     GetDataCategoryUnit(value).then(response => {
  //       setDataCategoryUnit(response);
  //     });
  //   }
  // }
  // if (dataCategoryUnit !== undefined) {
  //   if (array2 === false) {
  //     if (dataCategoryUnit !== null) {
  //       dataCategoryUnit.map(val => {
  //         setItems2(res => [...res, {label: val.name, value: val.id}]);
  //       });
  //       setArray2(true);
  //     }
  //   }
  // }
  //unit
  // if (value2 !== null) {
  //   if (dataUnit === null) {
  //     GetDataUnit(value2).then(response => {
  //       setDataUnit(response);
  //     });
  //   }
  // }
  // if (dataUnit !== undefined) {
  //   if (array3 === false) {
  //     if (dataUnit !== null) {
  //       dataUnit.map(val => {
  //         setItems3(res => [...res, {label: val.name, value: val.id}]);
  //       });
  //       setArray3(true);
  //     }
  //   }
  // }

  // if (dataProfile.data.teamStructure !== '' && value1 === null) {
  //   setValue1(dataProfile.data.teamStructure);
  // }

  return (
    <SafeAreaView style={styles.container}>
      {successModal === 200 ? (
        <SuccesModal
          desc={'Congrats your profile have been updated!'}
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
        {/* header */}
        <Header
          backButton
          backText="Back"
          onBackPress={() => navigation.goBack()}
          onNotificationPress={() => navigation.navigate('Notification')}
        />
        <View style={styles.mainContainer}>
          <View style={styles.imageBackground}>
            <Image source={{uri: imageCover}} style={styles.backgroundImage} />
            <TouchableOpacity
              style={styles.ButtonCamera}
              onPress={() => {
                takePhotoFromLibrary();
              }}>
              <Camera />
            </TouchableOpacity>
          </View>
          <View style={styles.profilePictureWrapper}>
            <View style={styles.profilePicture}>
              <TouchableOpacity
                onPress={() => {
                  takePhotoFromLibraryProfile();
                }}
                style={{position: 'absolute', bottom: 0, zIndex: 3, right: 0}}>
                <Image
                  source={require('../../../assets/icon/iconcameraprofile.png')}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                />
              </TouchableOpacity>
              <Image source={{uri: imageProfile}} style={styles.profileImage} />
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.h1}>PROFILE DATA</Text>
            {/* <Text style={[styles.h2, {fontStyle: 'italic'}]}>
              Fill all data is required!
            </Text> */}
            <Text style={styles.h2}>Name</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.data.name}
              onChangeText={val =>
                setDataProfile({
                  ...dataProfile,
                  data: {...dataProfile.data, name: val},
                })
              }
              // need handle ASYNCSTORAGE
            />
            {/* <Text style={styles.h2}>NIK</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.nik}
              onChangeText={val => setDataProfile({...dataProfile, nik: val})}
            /> */}
            <Text style={styles.h2}>Email</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.data.email}
              onChangeText={val =>
                setDataProfile({
                  ...dataProfile,
                  data: {...dataProfile.data, email: val},
                })
              }
            />
            <Text style={styles.h2}>No. HP (Min 8 number)</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.data.noTelp}
              onChangeText={val =>
                setDataProfile({
                  ...dataProfile,
                  data: {...dataProfile.data, noTelp: val},
                })
              }
            />

            {/* <Text style={styles.h2}>Date of Birth</Text>
            <DatePicker
              style={styles.input}
              value={pickedDate}
              onDateChange={val => {
                setDataProfile({
                  ...dataProfile,
                  tglLahir: moment(val).format('YYYY-MM-DD'),
                });

                setPickedDate(val);
              }}
              title="Date Picker"
              text={handleText()}
              isNullable={false}
              iosDisplay="inline"
            /> */}

            <Text style={styles.h2}>Jenis Kelamin</Text>
            <View>
              <DropDownPicker
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
                open={openedDropdown.dropdownName === 'JENIS_KELAMIN'}
                value={valueDdJenisKelamin}
                items={itemsDdJenisKelamin}
                setOpen={dropdownOpenHandler('JENIS_KELAMIN')}
                setValue={setValueDdJenisKelamin}
                setItems={setItemsDdJenisKelamin}
                style={styles.input}
                placeholder="Choose your gender!"
                labelStyle={styles.fontLabelStyle}
                listItemLabelStyle={styles.labelStyle}
                listItemContainerStyle={styles.listContainer}
                placeholderStyle={styles.placeholder}
                zIndex={7000}
                maxHeight={120}
              />
            </View>
            <Text style={styles.h2}>Perusahaan</Text>
            <TextInput
              style={styles.input}
              value="Jaya Sentosa Indotama" //dummy
              onChangeText={val => console.log(val)}
            />
            <Text style={styles.h2}>Pekerjaan</Text>
            <TextInput
              style={styles.input}
              value="Human Resource Development" //dummy
              onChangeText={val => console.log(val)}
            />
            {/* <Text style={styles.h2}>Work Location :</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.loker}
              onChangeText={val => setDataProfile({...dataProfile, loker: val})}
            /> */}
            {/* <Text style={styles.h2}>Name Office Supervisor :</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.namaAtasan}
              onChangeText={val =>
                setDataProfile({...dataProfile, namaAtasan: val})
              }
            /> */}
            {/* <Text style={styles.h2}>NIK Supervisor :</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.nikAtasan}
              onChangeText={val =>
                setDataProfile({...dataProfile, nikAtasan: val})
              }
            /> */}
            <Text style={styles.h1}>DETAIL</Text>
            {/* <Text style={styles.h2}>Regional</Text>
            <TextInput
              style={styles.input}
              value={dataProfile.regional}
              onChangeText={val =>
                setDataProfile({...dataProfile, regional: val})
              }
            /> */}
            <Text style={styles.h2}>Team Structure</Text>
            <View>
              <DropDownPicker
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
                open={openedDropdown.dropdownName === 'TEAM_STRUCTURE'}
                value={value1}
                items={items1}
                setOpen={dropdownOpenHandler('TEAM_STRUCTURE')}
                setValue={setValue1}
                setItems={setItems1}
                style={styles.input}
                placeholder="Choose your team structure!"
                labelStyle={styles.fontLabelStyle}
                listItemLabelStyle={styles.labelStyle}
                listItemContainerStyle={styles.listContainer}
                placeholderStyle={styles.placeholder}
                zIndex={7100}
                zIndexInverse={7000}
                maxHeight={120}
              />
            </View>
            <Text style={styles.h2}>Skill</Text>
            <View>
              <DropDownPicker
                multiple={true}
                min={0}
                max={dataSkill.count}
                listMode="SCROLLVIEW"
                dropDownDirection="AUTO"
                open={openedDropdown.dropdownName === 'SKILL'}
                value={value4}
                items={items4}
                setOpen={dropdownOpenHandler('SKILL')}
                setValue={setValue4}
                setItems={setItems4}
                style={styles.input}
                placeholder="Choose your skill!"
                labelStyle={styles.fontLabelStyle}
                listItemLabelStyle={styles.labelStyle}
                listItemContainerStyle={styles.listContainer}
                placeholderStyle={styles.placeholder}
                zIndex={7000}
                zIndexInverse={7100}
                maxHeight={120}
              />
            </View>
            {/* <Text style={[styles.h2, {marginBottom: 5}]}>CFU / FU</Text>
            <View>
              <DropDownPicker
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.input}
                placeholder="Choose your CFU/FU!"
                labelStyle={styles.fontLabelStyle}
                listItemLabelStyle={styles.labelStyle}
                listItemContainerStyle={styles.listContainer}
                placeholderStyle={styles.placeholder}
                zIndex={6500}
                maxHeight={120}
                scrollViewProps={true}
              />
            </View>

            <Text style={styles.h2}>Category Unit</Text>
            <View>
              <DropDownPicker
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                style={styles.input}
                placeholder="Choose your Category Unit! (Fill CFU/FU first)"
                labelStyle={styles.fontLabelStyle}
                listItemLabelStyle={styles.labelStyle}
                listItemContainerStyle={styles.listContainer}
                placeholderStyle={styles.placeholder}
                zIndex={6200}
                maxHeight={120}
                scrollViewProps={true}
              />
            </View>
            <Text style={styles.h2}>Unit</Text>
            <View>
              <DropDownPicker
                listMode="SCROLLVIEW"
                dropDownDirection="BOTTOM"
                open={open3}
                value={value3}
                items={items3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setItems3}
                style={styles.input}
                placeholder="Choose your Unit! (Fill Cat. Unit first)"
                labelStyle={styles.fontLabelStyle}
                listItemLabelStyle={styles.labelStyle}
                listItemContainerStyle={styles.listContainer}
                placeholderStyle={styles.placeholder}
                containerStyle={{width: '100%'}}
                maxHeight={80}
                scrollViewProps={true}
              />
            </View> */}

            <TouchableOpacity
              onPress={() => {
                handlePost();
                handlePostProfile();
                handlePostCover();
              }}
              style={styles.button}>
              <Text style={styles.save}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InputProfile;
