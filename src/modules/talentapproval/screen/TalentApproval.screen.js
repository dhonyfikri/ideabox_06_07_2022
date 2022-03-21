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
import {Check, Cross, Eye, Trash, Xapproval} from '../../../assets/icon';
import CardSubmittedIdea from '../../../components/CardSubmittedIdea';
import CardTalentApproval from '../../../components/CardTalentApproval';
import getData from '../../../components/GetData';
import LoadingScreen from '../../../components/LoadingScreen';
import SearchHeader from '../../../components/SearchHeader';
import SuccesModal from '../../../components/SuccesModal';
import {defaultAuthState} from '../../../config/Auth.cfg';
import GetDataTalentApproval from '../../../config/GetData/GetDataTalentApproval';
import PostTalentApproval from '../../../config/PostData/TalentApproval';
import style from '../../../config/Style/style.cfg';
import styles from '../style/TalentApproval.style';
const TalentApproval = ({navigation}) => {
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalAcceptVisible, setModalAcceptVisible] = useState(false);
  const [dataTalentApproval, setDataTalentApproval] = useState(null);
  const [data, setData] = useState(defaultAuthState);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState(null);
  const [id, setId] = useState(null);
  const [success, setSuccess] = useState(null);
  // search
  const [filterData, setFilterData] = useState([]);
  const getDataIdea = dataSearch => {
    searchFilter(dataSearch);
  };
  useEffect(() => {
    if (dataTalentApproval === null) {
      getData().then(jsonValue => setData(jsonValue));
      if (data === defaultAuthState) {
        return <LoadingScreen />;
      }
      GetDataTalentApproval(data.id).then(response => {
        setDataTalentApproval(response !== undefined ? response : null);
        setFilterData(response !== undefined ? response : []);
      });
    }
  });
  useEffect(() => {
    GetDataTalentApproval(data.id).then(response => {
      setDataTalentApproval(response);
      setFilterData(response);
    });
  }, [success]);
  if (dataTalentApproval === null) {
    return <LoadingScreen />;
  }
  const handleApproval = () => {
    PostTalentApproval(data.id, status, id).then(val => setSuccess(val));
  };
  const getDataSuccess = data => {
    setSuccess(data);
  };
  const searchFilter = text => {
    if (text) {
      const newData = dataTalentApproval.filter(item => {
        const itemData = item.ideas.title.value
          ? item.ideas.title.value.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(dataTalentApproval);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {success === 200 ? (
        <SuccesModal
          desc={'Your approval have been change!'}
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
      <View style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          <TouchableOpacity style={styles.wrap} onPress={() => {}}>
            <View style={styles.tabBarActive}>
              <Text style={styles.textActive}>Talent Approval</Text>
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
            <View style={styles.email}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                Request By
              </Text>
            </View>
            <View style={styles.title}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                Idea Name
              </Text>
            </View>
            <View style={styles.email}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                Notes
              </Text>
            </View>
          </View>
          <SwipeListView
            data={filterData}
            renderItem={({item}) => {
              return (
                <View>
                  <CardTalentApproval
                    title={item.ideas.title.value}
                    name={item.approvalTo.name}
                    date={item.updatedDate}
                    request={item.request}
                    notes={item.notes}
                  />
                </View>
              );
            }}
            renderHiddenItem={({item}) => (
              <View style={{flex: 1}}>
                {item.status === 'pending' ? (
                  <View style={styles.rowBack}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailIdeaUser', {
                          data: item,
                          item: item,
                        })
                      }
                      style={[styles.backRightBtn, styles.backRightBtnRight3]}>
                      <Eye />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setName(item.approvalTo.name);
                        setModalDeleteVisible(true);
                        setId(item.id);
                        setStatus('rejected');
                      }}
                      style={[styles.backRightBtn, styles.backRightBtnRight2]}>
                      <Xapproval />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setName(item.approvalTo.name);
                        setModalAcceptVisible(true);
                        setId(item.id);
                        setStatus('approved');
                      }}
                      style={[styles.backRightBtn, styles.backRightBtnRight]}>
                      <Check />
                    </TouchableOpacity>
                  </View>
                ) : item.status === 'approved' ? (
                  <View style={styles.rowBack}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailIdeaUser', {data: item})
                      }
                      style={[styles.backRightBtn, styles.backRightBtnRight3]}>
                      <Eye />
                    </TouchableOpacity>
                    <View
                      style={[styles.backRightBtn2, styles.backRightBtnRight]}>
                      <Check />
                      <Text
                        style={[
                          style.h4medium,
                          {color: '#FFFFFF', marginLeft: 15},
                        ]}>
                        Approved
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.rowBack}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('DetailIdeaUser', {data: item})
                      }
                      style={[styles.backRightBtn, styles.backRightBtnRight3]}>
                      <Eye />
                    </TouchableOpacity>
                    <View
                      style={[styles.backRightBtn2, styles.backRightBtnRight4]}>
                      <Xapproval />
                      <Text
                        style={[
                          style.h4medium,
                          {color: '#FFFFFF', marginLeft: 15},
                        ]}>
                        Rejected
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}
            rightOpenValue={-225}
            leftOpenValue={0}
          />
          {/* <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={dataTalentApproval}
              renderItem={({item, index}) => {
                return (
                  <CardTalentApproval
                    onDetail={() =>
                      navigation.navigate('DetailIdeaUser', {data: item})
                    }
                    delete={() => setModalDeleteVisible(true)}
                    title={item.ideas.desc.value}
                    name={item.approvalTo.name}
                    createdDate={item.createdDate}
                  />
                );
              }}
            /> */}
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
                <Text style={styles.textEdit}>Talent Approval</Text>
                <TouchableOpacity onPress={() => setModalDeleteVisible(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[style.h4normal, {marginVertical: 20}]}>
                  Apakah kamu yakin menolak {name} ke dalam ide ini?
                </Text>
                <View style={styles.rowDelete}>
                  <TouchableOpacity
                    style={styles.buttondelete}
                    onPress={() => {
                      setModalDeleteVisible(false);
                      handleApproval();
                    }}>
                    <Text style={styles.save}>Ya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttoncancel}
                    onPress={() => setModalDeleteVisible(false)}>
                    <Text style={styles.save}>Tidak</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* EndPopup */}
      {/* Popup delete  */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalAcceptVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalDeleteVisible(!modalAcceptVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.centeredcontainer}>
            <View style={styles.modalView}>
              <View style={styles.titleContainer}>
                <Text style={styles.textEdit}>Talent Approval</Text>
                <TouchableOpacity onPress={() => setModalAcceptVisible(false)}>
                  <Cross />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={[style.h4normal, {marginVertical: 20}]}>
                  Apakah kamu yakin menerima {name} ke dalam ide ini?
                </Text>
                <View style={styles.rowDelete}>
                  <TouchableOpacity
                    style={styles.buttonaccept}
                    onPress={() => {
                      setModalAcceptVisible(false);
                      handleApproval();
                    }}>
                    <Text style={styles.save}>Ya</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttoncancel}
                    onPress={() => setModalAcceptVisible(false)}>
                    <Text style={styles.save}>Tidak</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* EndPopup */}
    </SafeAreaView>
  );
};

export default TalentApproval;
