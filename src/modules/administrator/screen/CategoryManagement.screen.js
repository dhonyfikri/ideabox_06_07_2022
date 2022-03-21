import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Cross, EditCategory, Eye, Trash} from '../../../assets/icon';
import CardCategoryManagement from '../../../components/CardCategoryManagement';
import getData from '../../../components/GetData';
import LoadingScreen from '../../../components/LoadingScreen';
import SearchHeader from '../../../components/SearchHeader';
import SuccesModal from '../../../components/SuccesModal';
import FailedModal from '../../../components/FailedModal';
import DeleteCategoryManagement from '../../../config/DeleteData/DeleteCategoryManagement';
import {GetDataCategoryManagement} from '../../../config/GetData/GetDataAdministrator';
import GetParentCategory from '../../../config/GetData/GetParentCategory';
import UpdateCategory from '../../../config/PostData/UpdateCategory';
import style from '../../../config/Style/style.cfg';
import styles from '../style/Administrator.style';
const CategoryManagement = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddVisible, setModalAddVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [dataCategoryManagement, setDataCategoryManagement] = useState(null);
  const [deleteSelected, setDeleteSelected] = useState(null);
  const [array, setArray] = useState(false);
  const [editSelected, setEditSelected] = useState(null);
  const [success, setSuccess] = useState(null);
  const [update, setUpdate] = useState(null);
  const [data, setData] = useState(null);
  // search
  const [filterData, setFilterData] = useState([]);
  const getDataIdea = dataSearch => {
    searchFilter(dataSearch);
  };
  const [dropValue, setDropValue] = useState(null);
  // dropdown1
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  // dropdown2
  const [open1, setOpen1] = useState(false);
  const [items1, setItems1] = useState([
    {label: 'Idea', value: 'idea'},
    {label: 'Event', value: 'event'},
    {label: 'Amoeba', value: 'amoeba'},
  ]);
  const [value1, setValue1] = useState(items1[0].value);
  const [textCategory, setTextCategory] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (dataCategoryManagement === null || data === null) {
      getData().then(res => {
        setData(res);
      });
      GetDataCategoryManagement().then(response => {
        setDataCategoryManagement(response !== undefined ? response : null);
        setFilterData(response !== undefined ? response : []);
      });
    }
  }, []);
  useEffect(() => {
    GetDataCategoryManagement().then(response => {
      setDataCategoryManagement(response);
      setFilterData(response);
    });
  }, [success]);
  useEffect(() => {
    GetDataCategoryManagement().then(response => {
      setDataCategoryManagement(response);
      setFilterData(response);
    });
  }, [update]);
  useEffect(() => {
    setArray(false);
    setItems([]);
    setDropValue(null);
  }, [value1]);

  if (dataCategoryManagement === null || data === null) {
    return <LoadingScreen />;
  }
  const handleDelete = () => {
    DeleteCategoryManagement(deleteSelected).then(val => setSuccess(val));
  };
  const handleUpdate = () => {
    UpdateCategory(editSelected, value, textCategory, data.id, value1).then(
      val => setUpdate(val),
    );
  };
  const getDataSuccess = data => {
    setSuccess(data);
  };
  const getDataUpdate = data => {
    setUpdate(data);
  };
  // const getDataIdea = dataSearch => {
  //   searchFilter(dataSearch);
  // };
  const searchFilter = text => {
    if (text) {
      const newData = dataCategoryManagement.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(dataCategoryManagement);
    }
  };
  if (dropValue === null) {
    GetParentCategory(value1).then(response => {
      setDropValue(response);
    });
  }
  if (dropValue !== undefined) {
    if (array === false) {
      if (dropValue !== null) {
        dropValue.map(val => {
          setItems(res => [...res, {label: val.name, value: val.id}]);
        });
        setArray(true);
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {success === 200 ? (
        <SuccesModal
          desc={'Your data category management have been non active!'}
          getData={getDataSuccess}
        />
      ) : update === 200 ? (
        <SuccesModal
          desc={'Your data category management have been updated!'}
          getData={getDataUpdate}
        />
      ) : success !== null ? (
        <FailedModal
          desc={'Your data category management cannot update!'}
          getData={getDataSuccess}
        />
      ) : update !== null ? (
        <FailedModal
          desc={'Your data category management cannot update!'}
          getData={getDataUpdate}
        />
      ) : null}
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
        getData={getDataIdea}
        placeholder={'Search a Category ...'}
      />
      {/* <TextInput
        style={styles.textInputStyle}
        value={search}
        placeholder="Search Item"
        underlineColorAndroid="transparent"
        onChangeText={text => searchFilter(text)}
      /> */}
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
          <TouchableOpacity style={styles.wrap} onPress={() => {}}>
            <View style={styles.tabBarActive}>
              <Text style={styles.textActive}>Category Management</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrap}
            onPress={() => navigation.navigate('IdeaManagement')}>
            <View style={styles.tabBar}>
              <Text style={styles.textNonActive}>Idea Management</Text>
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
          <TouchableOpacity onPress={() => setModalAddVisible(true)}>
            <View style={styles.icon}>
              <Image
                source={require('../../../assets/icon/plusAdmin.png')}
                style={styles.imageAdmin}
              />
            </View>
          </TouchableOpacity>
        </View> */}

        {/* Popup Add category */}
        {/* <Modal
          animationType="none"
          transparent={true}
          visible={modalAddVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalAddVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.titleContainer}>
                  <Text style={styles.textEdit}>Add Category</Text>
                  <TouchableOpacity onPress={() => setModalAddVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.h2}>Category Name :</Text>
                  <TextInput
                    style={styles.input}
                    // value={''}
                    // onChangeText={() => { }}
                  />
                  <Text style={styles.h2}>Parent Category :</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.input}
                  />
                  <Text style={styles.h2}>Type Category :</Text>
                  <DropDownPicker
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setModalAddVisible(false)}
                    style={styles.button}>
                    <Text style={styles.save}>SAVE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal> */}
        {/* EndPopup */}

        {/* Popup Edit category */}
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
                  <Text style={styles.textEdit}>Edit Category</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.h2}>Category Name :</Text>
                  <TextInput
                    style={styles.input}
                    value={textCategory}
                    onChangeText={val => {
                      setTextCategory(val);
                    }}
                  />
                  <Text style={styles.h2}>Type Category :</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    dropDownDirection="BOTTOM"
                    open={open1}
                    value={value1}
                    items={items1}
                    setOpen={setOpen1}
                    setValue={setValue1}
                    setItems={setItems1}
                    style={styles.input}
                    maxHeight={100}
                    placeholder={'Select a type category'}
                  />
                  <Text style={styles.h2}>Parent Category :</Text>
                  <DropDownPicker
                    listMode="SCROLLVIEW"
                    dropDownDirection="BOTTOM"
                    open={open}
                    value={value}
                    items={items}
                    maxHeight={100}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.input}
                    placeholder={
                      value1 === null
                        ? 'Insert your type category first!'
                        : 'Select a parent category'
                    }
                  />

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      handleUpdate();
                      setModalVisible(false);
                    }}>
                    <Text style={styles.save}>SAVE</Text>
                  </TouchableOpacity>
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
          visible={modalDeleteVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalDeleteVisible(!modalDeleteVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.titleContainer}>
                  <Text style={styles.textEdit}>Non-Active Category</Text>
                  <TouchableOpacity
                    onPress={() => setModalDeleteVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.h2}>
                    Anda ingin menonactivekan category ini?
                  </Text>
                  <View style={styles.rowDelete}>
                    <TouchableOpacity
                      style={styles.buttondelete}
                      onPress={() => {
                        handleDelete();
                        setModalDeleteVisible(false);
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

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleContent}>
            <View style={styles.title}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                No.
              </Text>
            </View>
            <View style={styles.email}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                Category Name
              </Text>
            </View>
            <View style={styles.title}>
              <Text
                style={[style.h5, {textAlign: 'center', fontWeight: 'bold'}]}>
                Status
              </Text>
            </View>
          </View>
          <SwipeListView
            data={filterData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View>
                  <CardCategoryManagement
                    id={index + 1}
                    title={item.name}
                    status={item.activeFlag === '1' ? 'Active' : 'Non-Active'}
                  />
                </View>
              );
            }}
            renderHiddenItem={({item}) => (
              <View style={styles.rowBack}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('DetailCategory', {data: item})
                  }
                  style={[styles.backRightBtn, styles.backRightBtnRight3]}>
                  <Eye />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setEditSelected(item.id);
                  }}
                  style={[styles.backRightBtn, styles.backRightBtnRight2]}>
                  <EditCategory />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDeleteSelected(item.id);
                    setModalDeleteVisible(true);
                  }}
                  style={[styles.backRightBtn, styles.backRightBtnRight]}>
                  <Trash />
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-225}
            leftOpenValue={0}
          />
          {/* <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={dataCategoryManagement}
            renderItem={({item, index}) => {
              return (
                <ScrollView>
                  <CardCategoryManagement
                    onPress={() =>
                      navigation.navigate('DetailCategory', {data: item})
                    }
                    edit={() => setModalVisible(true)}
                    delete={() => setModalDeleteVisible(true)}
                    id={item.id}
                    title={item.name}
                    status={item.activeFlag}
                  />
                </ScrollView>
              );
            }}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CategoryManagement;
