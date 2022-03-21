import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Cross, Eye, Left, Trash} from '../../../assets/icon';
import CardSubmittedIdea from '../../../components/CardSubmittedIdea';
import CardJoinIdea from '../../../components/CardJoinIdea';
import getData from '../../../components/GetData';
import LoadingScreen from '../../../components/LoadingScreen';
import SearchHeader from '../../../components/SearchHeader';
import {defaultAuthState} from '../../../config/Auth.cfg';
import {GetDataSharingIdea} from '../../../config/GetData/GetDataMyIdea';
import style from '../../../config/Style/style.cfg';
import styles from '../style/MyIdea.style';
import LeftSharingIdea from '../../../config/DeleteData/LeftSharingIdea';
import SuccesModal from '../../../components/SuccesModal';
const MyAction = ({navigation}) => {
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [sharingIdea, setSharingIdea] = useState(null);
  const [data, setData] = useState(defaultAuthState);
  const [idApproval, setIdApproval] = useState(null);
  const [success, setSuccess] = useState(null);
  // search
  const [filterData, setFilterData] = useState([]);
  const getDataIdea = dataSearch => {
    searchFilter(dataSearch);
  };
  useEffect(() => {
    if (sharingIdea === null) {
      getData().then(jsonValue => setData(jsonValue));
      if (data === defaultAuthState) {
        return <LoadingScreen />;
      }
      GetDataSharingIdea(data.id).then(response => {
        setSharingIdea(response !== undefined ? response : null);
        setFilterData(response.ideas !== undefined ? response.ideas : []);
      });
    }
  });
  useEffect(() => {
    GetDataSharingIdea(data.id).then(response => {
      setSharingIdea(response);
      setFilterData(response.ideas);
    });
  }, [success]);
  if (sharingIdea === null) {
    return <LoadingScreen />;
  }
  const getDataSuccess = data => {
    setSuccess(data);
  };
  const handleLeft = () => {
    LeftSharingIdea(data.id, idApproval).then(response => setSuccess(response));
    // LeftSharingIdea(3, 96).then(response => setSuccess(response));
  };
  const searchFilter = text => {
    if (text) {
      const newData = sharingIdea.ideas.filter(item => {
        const itemData = item.desc[0].value
          ? item.desc[0].value.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(sharingIdea.ideas);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {success === 200 ? (
        <SuccesModal
          desc={'Your have been left the idea!'}
          getData={getDataSuccess}
        />
      ) : null}
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        getData={getDataIdea}
        placeholder={'Search an Idea ...'}
      />

      {/* Header navigation */}
      <ScrollView>
        <View style={styles.headerContainer2}>
          <View style={styles.headerWrap}>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() => navigation.navigate('SubmittedIdea')}>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Submitted Idea</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrap} onPress={() => {}}>
              <View style={styles.tabBarActive}>
                <Text style={styles.textActive}>Join Idea</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* content */}
        <View style={styles.contentContainer}>
          {/* <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Text>1</Text>
          </View>
        </View> */}

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.titleContent}>
              <View style={styles.title}>
                <Text
                  style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                  Idea Name
                </Text>
              </View>
              <View style={styles.title}>
                <Text
                  style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                  Created By
                </Text>
              </View>
              <View style={styles.email}>
                <Text
                  style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                  Status
                </Text>
              </View>
            </View>
            <SwipeListView
              data={filterData}
              renderItem={({item}) => {
                // console.log(item)
                return (
                  <View>
                    <CardJoinIdea
                      title={item.desc[0].value}
                      name={item.createdBy.name}
                      createdDate={item.createdDate}
                    />
                  </View>
                );
              }}
              renderHiddenItem={({item}) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalDeleteVisible(true);
                      setIdApproval(item.approval.id);
                    }}
                    style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <Left />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight2]}
                    onPress={() =>
                      navigation.navigate('DetailIdeaUser', {
                        data: item,
                        item: item,
                      })
                    }>
                    <Eye />
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-150}
              leftOpenValue={0}
            />
          </View>
        </View>

        {/* Popup delete  */}
        <Modal
          animationType="none"
          transparent={true}
          visible={modalDeleteVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalDeleteVisible(!modalDeleteVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.titleContainer}>
                  <Text style={styles.textEdit}>Left Idea</Text>
                  <TouchableOpacity
                    onPress={() => setModalDeleteVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={[styles.h2, {marginVertical: 10}]}>
                    Anda ingin keluar dari idea ini?
                  </Text>
                  <View style={styles.rowDelete}>
                    <TouchableOpacity
                      style={styles.buttondelete}
                      onPress={() => {
                        setModalDeleteVisible(false);
                        handleLeft();
                      }}>
                      <Text style={styles.save}>Keluar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttoncancel}
                      onPress={() => setModalDeleteVisible(false)}>
                      <Text style={styles.save}>Batal</Text>
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

export default MyAction;
