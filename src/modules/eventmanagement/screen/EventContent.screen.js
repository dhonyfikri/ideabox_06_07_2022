import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CardEventCategory from '../../../components/CardEventCategory';
import SearchHeader from '../../../components/SearchHeader';
import LoadingScreen from '../../../components/LoadingScreen';
import CardEventContent from '../../../components/CardEventContent';
import {
  defaultAuthState,
  defaultCategoryEvent,
  defaultEvent,
} from '../../../config/Auth.cfg';
import {
  GetDataCategory,
  GetDataEvent,
} from '../../../config/GetData/GetDataEvent';
import {GetDataSubmittedIdea} from '../../../config/GetData/GetDataMyIdea';
import styles from '../style/EventManagement.style';
import {Cross} from '../../../assets/icon';
import style from '../../../config/Style/style.cfg';
import DropDownPicker from 'react-native-dropdown-picker';
import getData from '../../../components/GetData';
import JoinEvent from '../../../config/PostData/JoinEvent';
import SuccesModal from '../../../components/SuccesModal';

const EventContentManagement = ({navigation}) => {
  const [hasil, setHasil] = useState('');
  const [stateDataCategory, setStateDataCategory] =
    useState(defaultCategoryEvent);
  const [stateDataEvent, setStateDataEvent] = useState(defaultEvent);
  const [stateDataSubmitted, setStateDataSubmitted] = useState(null);
  const [data, setData] = useState(defaultAuthState);
  // dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (
      stateDataEvent === defaultEvent ||
      stateDataCategory === defaultCategoryEvent ||
      stateDataSubmitted === null
    ) {
      GetDataCategory().then(response => setStateDataCategory(response));
      GetDataEvent().then(response => setStateDataEvent(response));
      getData().then(jsonValue => setData(jsonValue));
      if (data === defaultAuthState) {
        return <LoadingScreen />;
      }
      GetDataSubmittedIdea(data.id).then(response =>
        setStateDataSubmitted(response),
      );
    }
  });
  const GetData = dataSearch => {
    setHasil(dataSearch);
  };
  const [selectedId, setSelectedId] = useState(17);
  const [eventId, setEventId] = useState(null);
  const [createdBy, setCreatedBy] = useState(null);
  const [allCategory, setAllCategory] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSubmitVisible, setModalSubmitVisible] = useState(false);
  const [success, setSuccess] = useState(null);
  if (
    stateDataEvent === defaultEvent ||
    stateDataCategory === defaultCategoryEvent ||
    stateDataSubmitted === null
  ) {
    return <LoadingScreen />;
  }
  const selectedData = stateDataEvent.filter(
    x => x.categoryEvent.id === stateDataCategory[selectedId - 17].id,
  );
  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        getData={GetData}
        placeholder={'Search an Event ... '}
      />
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.titleCategory}>By Category</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{flexDirection: 'row'}}>
            {allCategory === true ? (
              <View>
                <CardEventCategory
                  title={'All Category'}
                  getId={() => {
                    setAllCategory(true);
                  }}
                  borderColor={'#085D7A'}
                  textColor={'#085D7A'}
                  image={require('../../../assets/image/categoryall.png')}
                />
              </View>
            ) : (
              <View>
                <CardEventCategory
                  title={'All Category'}
                  getId={() => {
                    setAllCategory(true);
                  }}
                  borderColor={'grey'}
                  textColor={'grey'}
                  image={require('../../../assets/image/categoryall.png')}
                />
              </View>
            )}

            <FlatList
              horizontal
              keyExtractor={(item, key) => item.id}
              data={stateDataCategory}
              renderItem={({item, key}) => {
                const borderColor =
                  item.id === selectedId && allCategory === false
                    ? '#085D7A'
                    : 'grey';
                const textColor =
                  item.id === selectedId && allCategory === false
                    ? '#085D7A'
                    : 'grey';
                const image =
                  item.name === 'Digital Platform'
                    ? require('../../../assets/image/digitalplatform.png')
                    : item.id === '18'
                    ? require('../../../assets/image/digitalconnectivity.png')
                    : item.id === '19'
                    ? require('../../../assets/image/digitalservice.png')
                    : item.id === '20'
                    ? require('../../../assets/image/sport.png')
                    : item.id === '21'
                    ? require('../../../assets/image/holiday.png')
                    : item.id === '22'
                    ? require('../../../assets/image/workshop.png')
                    : null;
                return (
                  <View key={key}>
                    <CardEventCategory
                      title={item.name}
                      image={image}
                      getId={() => {
                        setSelectedId(item.id);
                        setAllCategory(false);
                      }}
                      borderColor={borderColor}
                      textColor={textColor}
                    />
                  </View>
                );
              }}
              extraData={selectedId}
            />
          </View>
        </ScrollView>
        <Text style={styles.titleEvent}>Event</Text>
        {allCategory === true
          ? stateDataEvent
              .filter(val => {
                if (hasil === '') {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(hasil.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => {
                return (
                  <View key={key}>
                    <CardEventContent
                      title={val.name}
                      desc={val.description}
                      image={val.image}
                      textButton={'Management Ideas in event'}
                      join={() => {
                        navigation.navigate('EventManagementIdea');
                      }}
                      detail={() => {
                        navigation.navigate('DetailEventContent', {data: val});
                      }}
                    />
                  </View>
                );
              })
          : selectedData
              .filter(val => {
                if (hasil === '') {
                  return val;
                } else if (
                  val.name.toLowerCase().includes(hasil.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => {
                return (
                  <View key={key}>
                    <CardEventContent
                      title={val.name}
                      desc={val.description}
                      image={val.image}
                      join={() => {
                        setEventId(val.id);
                        setCreatedBy(val.createdBy);
                        setModalVisible(true);
                      }}
                      detail={() =>
                        navigation.navigate('DetailEventContent', {data: val})
                      }
                    />
                  </View>
                );
              })}
        {/* Awal Modal */}
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
                  <Text style={styles.textEdit}>Join Event</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={[style.h5, {marginBottom: 20}]}>
                    Untuk mengikuti event ini, kamu harus memilih ide kamu mana
                    yang akan kamu ikut sertakan:
                  </Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.input}
                    placeholder="Pilih ide"
                    maxHeight={100}
                    listItemContainerStyle={{height: 35}}
                  />
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setModalVisible(false);
                      setModalSubmitVisible(true);
                    }}>
                    <Text style={styles.save}>JOIN NOW</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        {/* End Modal */}
        {/* Popup submit  */}
        {/* <Modal
          animationType="none"
          transparent={true}
          visible={modalSubmitVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalSubmitVisible(!modalSubmitVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.titleContainer}>
                  <Text style={styles.textEdit}>Delete User</Text>
                  <TouchableOpacity
                    onPress={() => setModalSubmitVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={style.h5}>
                    Apakah kamu yakin ingin mengikut sertakan inovasimu di event
                    ini?
                  </Text>
                  <View style={styles.rowDelete}>
                    <TouchableOpacity
                      style={styles.buttondelete}
                      onPress={() => setModalSubmitVisible(false)}>
                      <Text style={styles.save}>Yakin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttoncancel}
                      onPress={() => setModalSubmitVisible(false)}>
                      <Text style={styles.batal}>Batal</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal> */}
        {/* EndPopup */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventContentManagement;
