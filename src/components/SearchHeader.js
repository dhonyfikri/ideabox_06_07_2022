import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, TextInput} from 'react-native';
import {Drawer, Notif, Search} from '../assets/icon';
import {windowHeight} from './WindowDimensions';

const SearchHeader = props => {
  const [focus, setFocus] = useState(false);
  const FocusClick = () => {
    setFocus(true);
  };
  const BlurClick = () => {
    setFocus(false);
  };
  const colorFocus = focus ? '#085D7A' : 'grey';
  return (
    <View style={styles.container}>
      <View style={styles.sideIcon}>
        <TouchableOpacity onPress={props.onPress}>
          <Drawer />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              borderColor: colorFocus,
            },
          ]}>
          <View style={styles.sideIcon}>
            <Search />
          </View>
          <TextInput
            style={styles.inputSearch}
            placeholder={props.placeholder}
            placeholderTextColor={'grey'}
            onChangeText={val => props.getData(val)}
            onFocus={() => FocusClick()}
            onBlur={() => BlurClick()}
          />
        </View>
      </View>
      <View style={styles.sideIcon}>
        <TouchableOpacity onPress={props.notification}>
          <Notif />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: windowHeight / 13,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  sideIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  searchContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 6,
  },
  searchBar: {
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1.5,
    width: '100%',
    height: '65%',
    backgroundColor: '#FFFFFF',
  },
  inputSearch: {
    flex: 5,
    justifyContent: 'center',
    color: 'black',
    fontSize: 11,
    height: '100%',
  },
});
