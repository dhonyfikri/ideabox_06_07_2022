import React, {useEffect} from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {BackBlue, Cross} from '../../../assets/icon';
import SearchHeader from '../../../components/SearchHeader';
import styles from '../style/EventManagement.style';
import style from '../../../config/Style/style.cfg';
import getData from '../../../components/GetData';
import {defaultAuthState} from '../../../config/Auth.cfg';
import LoadingScreen from '../../../components/LoadingScreen';
import {GetDataSubmittedIdea} from '../../../config/GetData/GetDataMyIdea';
import JoinEvent from '../../../config/PostData/JoinEvent';
import SuccesModal from '../../../components/SuccesModal';
import Header from '../../../components/Header';
const DetailEventManagement = ({navigation, route}) => {
  const data = route.params.data;

  const [modalSubmitVisible, setModalSubmitVisible] = useState(false);
  // dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [dataAsync, setDataAsync] = useState(defaultAuthState);
  const [stateDataSubmitted, setStateDataSubmitted] = useState(null);
  const [array, setArray] = useState(false);
  const [success, setSuccess] = useState(null);
  useEffect(() => {
    if (stateDataSubmitted === null) {
      getData().then(jsonValue => setDataAsync(jsonValue));
      if (dataAsync === defaultAuthState) {
        return <LoadingScreen />;
      }
      GetDataSubmittedIdea(data.id).then(response =>
        setStateDataSubmitted(response),
      );
    }
  });
  if (stateDataSubmitted === null) {
    return <LoadingScreen />;
  }

  if (array === false) {
    stateDataSubmitted.ideas.map(val => {
      setItems(res => [...res, {label: val.desc[0].value, value: val.id}]);
    });
    setArray(true);
  }
  const handleJoin = () => {
    JoinEvent(dataAsync.id, value, data.id, data.createdBy).then(val =>
      setSuccess(val),
    );
  };
  const getDataSuccess = data => {
    setSuccess(data);
  };
  return (
    <SafeAreaView style={styles.container}>
      {success === 200 ? (
        <SuccesModal
          desc={'Congrats you have been join event!'}
          getData={getDataSuccess}
        />
      ) : null}

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
                <TouchableOpacity onPress={() => setModalSubmitVisible(false)}>
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
                    onPress={() => setModalSubmitVisible(false)}
                    style={styles.buttondelete}>
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

      {/* Content */}
      <Header
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />
      <View style={styles.content}>
        <ScrollView>
          <Image
            source={{
              uri: data.image,
            }}
            style={styles.imageContent}
          />
          <View style={styles.textWrap}>
            <View style={styles.titleWrap}>
              <Text style={style.h4}>{data.name}</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackBlue />
              </TouchableOpacity>
            </View>
            <Text style={styles.date}>Tanggal Acara : {data.date}</Text>
            <Text style={style.h5}>{data.description}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.buttonJoin}>
            <Text style={styles.save}>Management Ideas in event</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailEventManagement;
