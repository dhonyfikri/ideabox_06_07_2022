import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Back} from '../../../assets/icon';
import DetailCategory from '../../../components/DetailCategory';
import Header from '../../../components/Header';
import LoadingScreen from '../../../components/LoadingScreen';
import SearchHeader from '../../../components/SearchHeader';
import GetParentCategory from '../../../config/GetData/GetParentCategory';

const DetailCategoryUserManagement = ({navigation, route}) => {
  const data = route.params.data;
  const [status, setStatus] = useState('');
  const [value, setValue] = useState(null);
  const [parent, setParent] = useState('');
  useEffect(() => {
    if (value === null) {
      GetParentCategory(data.type).then(response => {
        setValue(response);
      });
    }
  });
  if (status === '') {
    if (data.activeFlag === '1') {
      setStatus('Acttive');
    } else {
      setStatus('Non-Active');
    }
  }
  if (value === null) {
    return <LoadingScreen />;
  }
  if (parent === '') {
    value.filter(res => {
      if (res.id === data.parentId) {
        setParent(res);
      } else {
        setParent('None');
      }
    });
  }
  return (
    <View style={styles.container}>
      <Header
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}>
            <Back />
          </TouchableOpacity>
          <Text style={styles.textEdit}>Detail User</Text>
          <View style={styles.button}></View>
        </View>
        <ScrollView>
          <View style={styles.inputContainer}>
            <DetailCategory
              name={data.name}
              type={data.type}
              parent={parent}
              status={status}
              createdBy={data.createdBy.name}
              createdDate={data.createdDate}
              updatedBy={data.updatedBy.name}
              updatedDate={data.updatedDate}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailCategoryUserManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    paddingBottom: 70,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  textEdit: {
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#085D7A',
    alignSelf: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  save: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
