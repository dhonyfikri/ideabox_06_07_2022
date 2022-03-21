import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import {BackBlue, Clock, Search} from '../../../assets/icon';
import {windowHeight} from '../../../components/WindowDimensions';

const SearchScreen = props => {
  const data = props.route.params.data;
  const [search, setsearch] = useState('');
  const [hasil, setHasil] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      {data
        .filter(val => {
          if (search === '') {
            return val;
          } else if (
            val.desc[0].value.toLowerCase().includes(search.toLowerCase())
          ) {
            return val;
          }
        })
        .map((val, key) => {
          console.log(val.desc[0].value);
          // setHasil(val.desc[0].value);
          // console.log(hasil);
        })}
      <View style={styles.searchBarContainer}>
        <View style={styles.sideIcon}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <BackBlue />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <View style={styles.sideIconSearch}>
              <Search />
            </View>
            <TextInput
              style={styles.inputSearch}
              onChangeText={val => setsearch(val)}
              onSubmitEditing={val => props.navigation.goBack({data: search})}
            />
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.titleContent}>Kategori</Text>
        <View style={styles.row}>
          <View style={styles.tabBarActive}>
            <Text style={styles.textActive}>Semua</Text>
          </View>
          <View style={styles.tabBar}>
            <Text style={styles.textNonActive}>Kategori Ide</Text>
          </View>
          <View style={styles.tabBar}>
            <Text style={styles.textNonActive}>Area Inovasi</Text>
          </View>
        </View>
        <Text style={styles.titleContent}>Sub Kategori</Text>
        <View style={styles.row}>
          <View style={styles.tabBarActive}>
            <Text style={styles.textActive}>Semua</Text>
          </View>
        </View>
        <Text style={styles.titleContent}>Terakhir dicari</Text>
        <View style={styles.rowHistory}>
          <Clock />
          <Text style={styles.textHistory}>KUKM</Text>
        </View>
        <TouchableOpacity>
          <View style={styles.buttonHapus}>
            <Text style={styles.textHapus}>Hapus Pencarian</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBarContainer: {
    flexDirection: 'row',
    height: windowHeight / 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sideIcon: {
    justifyContent: 'center',
    marginRight: 10,
  },
  sideIconSearch: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  searchContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#085D7A',
    width: '100%',
    height: '68%',
    backgroundColor: '#FFFFFF',
  },
  inputSearch: {
    justifyContent: 'flex-end',
    fontSize: 10,
  },
  textInputSearch: {
    color: 'black',
    fontSize: 11,
    height: '100%',
  },
  placeholder: {
    fontSize: 11,
    color: 'grey',
  },
  row: {
    flexDirection: 'row',
  },
  rowHistory: {
    flexDirection: 'row',
    marginTop: 10,
  },
  tabBarActive: {
    backgroundColor: '#085D7A',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
  },
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#085D7A',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10,
  },
  textActive: {
    color: '#FFFFFF',
  },
  textNonActive: {
    color: '#085D7A',
  },
  titleContent: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  content: {
    padding: 10,
  },
  textHistory: {
    marginLeft: 10,
  },
  buttonHapus: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#085D7A',
    borderRadius: 10,
    marginTop: 10,
  },
  textHapus: {
    color: '#085D7A',
  },
});
