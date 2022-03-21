import React, {useState} from 'react';
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
import {Cross} from '../../../assets/icon';
import CardRoleManagement from '../../../components/CardRoleManagement';
import SearchHeader from '../../../components/SearchHeader';
import style from '../../../config/Style/style.cfg';
import styles from '../style/Administrator.style';
const RoleManagement = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const data = require('../data/dataRoleManagement.json');

  // dropdown1
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Area Inovasi', value: 'area'},
    {label: 'Category Idea', value: 'category'},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader onPress={() => navigation.openDrawer()} />

      {/* Header navigation */}
      <View style={styles.headerContainer}>
        <View style={styles.headerWrap}>
          <TouchableOpacity
            style={styles.wrap}
            onPress={() => {
              navigation.navigate('UserManagement');
            }}>
            <View style={styles.tabBar}>
              <Text style={styles.textNonActive}>User Management</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrap}
            onPress={() => navigation.navigate('CategoryManagement')}>
            <View style={styles.tabBar}>
              <Text style={styles.textNonActive}>Category Management</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrap}
            onPress={() => navigation.navigate('IdeaManagement')}>
            <View style={styles.tabBar}>
              <Text style={styles.textNonActive}>Idea Management</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrap}
            onPress={() => navigation.navigate('RoleManagement')}>
            <View style={styles.tabBarActive}>
              <Text style={styles.textActive}>Role Management</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* content */}
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.icon}>
              <Image
                source={require('../../../assets/icon/plusAdmin.png')}
                style={styles.imageAdmin}
              />
            </View>
          </TouchableOpacity>
        </View>

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
                  <Text style={styles.textEdit}>Edit Role</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.h2}>Role Name :</Text>
                  <TextInput
                    style={styles.input}
                    // value={''}
                    // onChangeText={() => { }}
                  />
                  <Text style={styles.h2}>Feature :</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={styles.input}
                  />
                  <View style={styles.button}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <Text style={styles.save}>SAVE</Text>
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
          visible={modalDeleteVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalDeleteVisible(!modalDeleteVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.centeredcontainer}>
              <View style={styles.modalView}>
                <View style={styles.titleContainer}>
                  <Text style={styles.textEdit}>Delete User</Text>
                  <TouchableOpacity
                    onPress={() => setModalDeleteVisible(false)}>
                    <Cross />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                  <Text style={styles.h2}>Anda ingin menghapus role ini?</Text>
                  <View style={styles.rowDelete}>
                    <View style={styles.buttondelete}>
                      <TouchableOpacity
                        onPress={() => setModalDeleteVisible(false)}>
                        <Text style={styles.save}>Hapus</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttoncancel}>
                      <TouchableOpacity
                        onPress={() => setModalDeleteVisible(false)}>
                        <Text style={styles.save}>Batal</Text>
                      </TouchableOpacity>
                    </View>
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
          </View>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            renderItem={({item, index}) => {
              return (
                <ScrollView>
                  <CardRoleManagement
                    onPress={() =>
                      navigation.navigate('DetailCategory', {data: item})
                    }
                    edit={() => setModalVisible(true)}
                    delete={() => setModalDeleteVisible(true)}
                    id={item.id}
                    title={item.title}
                    status={item.status}
                  />
                </ScrollView>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RoleManagement;
