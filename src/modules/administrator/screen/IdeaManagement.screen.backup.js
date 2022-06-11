import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Cross, Eye, Trash} from '../../../assets/icon';
import CardIdeaManagement from '../../../components/CardIdeaManagement';
import LoadingScreen from '../../../components/LoadingScreen';
import SearchHeader from '../../../components/SearchHeader';
import SuccesModal from '../../../components/SuccesModal';
import DeleteIdeaManagement from '../../../config/DeleteData/DeleteIdeaManagement';
import {
  GetDataCategoryManagement,
  GetDataIdeaManagement,
} from '../../../config/GetData/GetDataAdministrator';
import style from '../../../config/Style/style.cfg';
import styles from '../style/Administrator.style';

const IdeaManagement = ({navigation}) => {
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [dataIdeaManagement, setDataIdeaManagement] = useState();
  const [deleteData, setDeleteData] = useState(null);
  const [success, setSuccess] = useState(null);
  // search
  const [filterData, setFilterData] = useState([]);
  const getDataIdea = dataSearch => {
    searchFilter(dataSearch);
  };
  useEffect(() => {
    GetDataIdeaManagement().then(response => {
      setDataIdeaManagement(response !== undefined ? response : null);
      setFilterData(response !== undefined ? response : []);
    });
  }, []);
  useEffect(() => {
    GetDataIdeaManagement().then(response => {
      setDataIdeaManagement(response);
      setFilterData(response);
    });
  }, [success]);
  if (dataIdeaManagement === null) {
    return <LoadingScreen />;
  }
  const getDataSuccess = data => {
    setSuccess(data);
  };
  const handleDelete = () => {
    DeleteIdeaManagement(deleteData).then(val => setSuccess(val));
  };
  const searchFilter = text => {
    if (text) {
      const newData = dataIdeaManagement.filter(item => {
        const itemData = item.desc[0].value
          ? item.desc[0].value.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(dataIdeaManagement);
    }
  };
  console.log(success);
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

      {/* Header navigation */}
      <View style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          {/* <TouchableOpacity
            style={styles.wrap}
            onPress={() => {
              navigation.navigate('UserManagement');
            }}>
            <View style={styles.tabBar}>
              <Text style={styles.textNonActive}>User Management</Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.wrap}
            onPress={() => {
              navigation.navigate('CategoryManagement');
            }}>
            <View style={styles.tabBar}>
              <Text style={styles.textNonActive}>Category Management</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.wrap} onPress={() => {}}>
            <View style={styles.tabBarActive}>
              <Text style={styles.textActive}>Idea Management</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.wrap}
            onPress={() => navigation.navigate('RoleManagement')}>
            <View style={styles.tabBar}>
              <Text style={styles.textNonActive}>Role Management</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>

      {/* content */}
      <View style={styles.contentContainer}>
        {/* <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon}>
            <Image
              source={require('../../../assets/icon/plusAdmin.png')}
              style={styles.imageAdmin}
            />
          </TouchableOpacity>
        </View> */}

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleContent}>
            <View style={styles.title}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                No.{' '}
              </Text>
            </View>
            <View style={styles.email}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                Nama Idea
              </Text>
            </View>
            <View style={styles.email}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                Created By
              </Text>
            </View>
          </View>
          <SwipeListView
            data={filterData}
            renderItem={({item, index}) => {
              // console.log(item)
              return (
                <View>
                  <CardIdeaManagement
                    // delete={() => setModalDeleteVisible(true)}
                    id={index + 1}
                    title={item.desc[0].value}
                    create={item.createdBy}
                  />
                </View>
              );
            }}
            renderHiddenItem={({item}) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => {
                    setDeleteData(item.id);
                    setModalDeleteVisible(true);
                  }}>
                  <Trash />
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
            leftOpenValue={0}
          />
          {/* <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={dataIdeaManagement}
            renderItem={({item, index}) => {
              return (
                <ScrollView>
                  <CardIdeaManagement
                    delete={() => setModalDeleteVisible(true)}
                    id={item.id}
                    title={item.desc[0].value}
                    create={item.createdBy}
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
                <TouchableOpacity onPress={() => setModalDeleteVisible(false)}>
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
    </SafeAreaView>
  );
};

export default IdeaManagement;
