import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CardEventCategory from '../../../components/CardEventCategory';
import CardEventContent from '../../../components/CardEventContent';
import styles from '../style/Event.style';
import SearchHeader from '../../../components/SearchHeader';
import {Cross} from '../../../assets/icon';
import DropDownPicker from 'react-native-dropdown-picker';
import {useScrollToTop} from '@react-navigation/native';
import style from '../../../config/Style/style.cfg';

import {defaultCategoryEvent, defaultEvent} from '../../../config/Auth.cfg';
import {
  GetDataCategory,
  GetDataEvent,
} from '../../../config/GetData/GetDataEvent';

const EventContent = ({navigation}) => {
  const dataCategory = require('../data/dataCategory.json');
  const dataEvent = require('../data/dataEvent.json');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSubmitVisible, setModalSubmitVisible] = useState(false);

  const [selectedId, setSelectedId] = useState(1);

  // dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'},
  ]);
  const [hasil, setHasil] = useState('');
  const getData = dataSearch => {
    setHasil(dataSearch);
  };
  const selectedData = dataEvent.filter(
    x => x.category === dataCategory[selectedId - 1].title,
  );
  // const selectedData = stateDataEvent.filter(
  //   x => x.category[0].id === stateDataCategory[selectedId - 17].id,
  // );
  // Json terbaru
  const [stateDataCategory, setStateDataCategory] =
    useState(defaultCategoryEvent);
  const [stateDataEvent, setStateDataEvent] = useState(defaultEvent);
  useEffect(() => {
    GetDataCategory().then(response => setStateDataCategory(response));
    GetDataEvent().then(response => setStateDataEvent(response));
  }, []);
  console.log(stateDataEvent);
  const ref = React.useRef(null);
  useScrollToTop(ref);
  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        getData={getData}
        placeholder={'Search an Event ... '}
      />
      <ScrollView ref={ref} style={styles.contentContainer}>
        <Text style={styles.titleCategory}>By Category</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, key) => item.id}
          data={dataCategory}
          renderItem={({item, key}) => {
            const borderColor = item.id === selectedId ? '#085D7A' : 'grey';
            const textColor = item.id === selectedId ? '#085D7A' : 'grey';
            return (
              <View key={key}>
                <CardEventCategory
                  title={item.title}
                  image={item.image}
                  getId={() => setSelectedId(item.id)}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              </View>
            );
          }}
          extraData={selectedId}
        />
        {/* Json terbaru */}
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, key) => item.id}
          data={stateDataCategory}
          renderItem={({item, key}) => {
            const borderColor = item.id === selectedId ? '#085D7A' : 'grey';
            const textColor = item.id === selectedId ? '#085D7A' : 'grey';
            return (
              <View key={key}>
                <CardEventCategory
                  title={item.name}
                  image={item.image}
                  getId={() => setSelectedId(item.id)}
                  borderColor={borderColor}
                  textColor={textColor}
                />
              </View>
            );
          }}
          extraData={selectedId}
        /> */}
        <Text style={styles.titleEvent}>Event</Text>
        {selectedId === 1
          ? dataEvent
              .filter(val => {
                if (hasil === '') {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(hasil.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => {
                return (
                  <View key={key}>
                    <CardEventContent
                      title={val.title}
                      desc={val.desc}
                      image={val.image}
                      join={() => setModalVisible(true)}
                      detail={() =>
                        navigation.navigate('DetailEventContent', {data: val})
                      }
                    />
                  </View>
                );
              })
          : selectedData
              .filter(val => {
                if (hasil === '') {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(hasil.toLowerCase())
                ) {
                  return val;
                }
              })
              .map(val => {
                return (
                  <CardEventContent
                    title={val.title}
                    desc={val.desc}
                    image={val.image}
                    join={() => setModalVisible(true)}
                    detail={() =>
                      navigation.navigate('DetailEventContent', {data: val})
                    }
                  />
                );
              })}
        {/* JSON terbaru */}
        {/* {stateDataEvent.map((val, key) => {
          return (
            <View key={key}>
              <CardEventContent
                title={val.name}
                desc={val.description}
                image={val.image}
                join={() => setModalVisible(true)}
                detail={() =>
                  navigation.navigate('DetailEventContent', {data: val})
                }
              />
            </View>
          );
        })} */}
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
                  <Text style={style.h5}>
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
        <Modal
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
        </Modal>
        {/* EndPopup */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventContent;
