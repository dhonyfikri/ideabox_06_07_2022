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
import {Cross, Eye, Trash} from '../../../assets/icon';
import CardSubmittedIdea from '../../../components/CardSubmittedIdea';
import getData from '../../../components/GetData';
import LoadingScreen from '../../../components/LoadingScreen';
import SearchHeader from '../../../components/SearchHeader';
import SuccesModal from '../../../components/SuccesModal';
import {defaultAuthState} from '../../../config/Auth.cfg';
import DeleteIdeaManagement from '../../../config/DeleteData/DeleteIdeaManagement';
import {GetDataSubmittedIdea} from '../../../config/GetData/GetDataMyIdea';
import style from '../../../config/Style/style.cfg';
import styles from '../style/MyIdea.style';
const SubmittedIdea = ({navigation}) => {
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [data, setData] = useState(defaultAuthState);
  const [submittedIdea, setSubmittedIdea] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [success, setSuccess] = useState(null);

  // search
  const [filterData, setFilterData] = useState([]);
  const getDataIdea = dataSearch => {
    searchFilter(dataSearch);
  };
  useEffect(() => {
    if (submittedIdea === null) {
      getData().then(jsonValue => setData(jsonValue));
      if (data === defaultAuthState) {
        return <LoadingScreen />;
      }
      GetDataSubmittedIdea(data.id).then(response => {
        setSubmittedIdea(response !== undefined ? response : null);
        setFilterData(response.ideas !== undefined ? response.ideas : []);
      });
    }
  });
  useEffect(() => {
    GetDataSubmittedIdea(data.id).then(response => {
      setSubmittedIdea(response);
      setFilterData(response.ideas);
    });
  }, [success]);
  if (submittedIdea === null) {
    return <LoadingScreen />;
  }
  console.log(filterData);
  const getDataSuccess = data => {
    setSuccess(data);
  };
  const handleDelete = () => {
    DeleteIdeaManagement(deleteData).then(val => setSuccess(val));
  };
  const searchFilter = text => {
    if (text) {
      const newData = submittedIdea.ideas.filter(item => {
        const itemData = item.desc[0].value
          ? item.desc[0].value.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(submittedIdea.ideas);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {success === 200 ? (
        <SuccesModal
          desc={'Your data idea management have been deleted!'}
          getData={getDataSuccess}
        />
      ) : null}
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        getData={getDataIdea}
        placeholder={'Search an Idea ...'}
      />
      <ScrollView>
        {/* Header navigation */}
        <View style={styles.headerContainer}>
          <View style={styles.headerWrap}>
            <TouchableOpacity style={styles.wrap} onPress={() => {}}>
              <View style={styles.tabBarActive}>
                <Text style={styles.textActive}>Submitted Idea</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() => navigation.navigate('MyAction')}>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Join Idea</Text>
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
                  Created Date
                </Text>
              </View>
            </View>
            <SwipeListView
              data={filterData}
              renderItem={({item, index}) => {
                // console.log(item)
                return (
                  <View>
                    <CardSubmittedIdea
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
                      setDeleteData(item.id);
                    }}
                    style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <Trash />
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
            {/* <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={submittedIdea.ideas}
            renderItem={({item, index}) => {
              return (
                <ScrollView>
                  <CardSubmittedIdea
                    onDetail={() =>
                      navigation.navigate('DetailIdeaUser', {data: item})
                    }
                    delete={() => setModalDeleteVisible(true)}
                    title={item.desc[0].value}
                    name={item.createdBy}
                    createdDate={item.createdDate}
                  />
                </ScrollView>
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
                  <Text style={styles.textEdit}>Delete Idea</Text>
                  <TouchableOpacity
                    onPress={() => setModalDeleteVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.h2}>Anda ingin menghapus idea ini?</Text>
                  <View style={styles.rowDelete}>
                    <TouchableOpacity
                      style={styles.buttondelete}
                      onPress={() => {
                        handleDelete();
                        setModalDeleteVisible(false);
                      }}>
                      <Text style={styles.save}>Hapus</Text>
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

export default SubmittedIdea;
