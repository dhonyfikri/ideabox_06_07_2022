import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React, {useState} from 'react';
import styles from '../style/EventManagement.style';
import Header from '../../../components/Header';
import style from '../../../config/Style/style.cfg';
import {ArrowRight, Export} from '../../../assets/icon';
import DropDownPicker from 'react-native-dropdown-picker';
const EventManagementIdea = ({navigation}) => {
  // dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([{label: 'ada', value: 'ada'}]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />
      <View style={{padding: 15, flex: 1}}>
        <Text style={styles.titleCategory}>Event Management</Text>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            marginHorizontal: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            marginBottom: 15,
          }}>
          <View
            style={{
              width: 150,
              height: 100,
              borderWidth: 1,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <View>
            <Text style={style.h4}>Hack Idea</Text>
            <Text style={[style.h4normal, {fontStyle: 'italic'}]}>Date : </Text>
            <Text style={[style.h4normal, {fontStyle: 'italic'}]}>
              Status :
            </Text>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: '#FFFFFF',
            borderRadius: 5,
            marginHorizontal: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
          }}>
          <Text style={styles.titleCategory2}>Manage Submission</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: '#EBEFF5',
                padding: 5,
                width: '100%',
                flex: 1,
                flexDirection: 'row',
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#085D7A',
                borderRadius: 5,
              }}>
              <View style={{padding: 10, maxWidth: 120}}>
                <Text style={style.h4medium}>Submmision</Text>
              </View>
              <ArrowRight />
              <View style={{padding: 10, maxWidth: 120}}>
                <Text style={style.h4medium}>Administrasi Selection</Text>
              </View>
              <ArrowRight />
              <View style={{padding: 10, maxWidth: 120}}>
                <Text style={style.h4medium}>On-desk idea assesment</Text>
              </View>
              <ArrowRight />
              <View style={{padding: 10, maxWidth: 120}}>
                <Text style={style.h4medium}>Acceleration (TOP 120)</Text>
              </View>
              <ArrowRight />
              <View style={{padding: 10, maxWidth: 120}}>
                <Text style={style.h4medium}>Graduate</Text>
              </View>
              <ArrowRight />
              <View style={{padding: 10, maxWidth: 120}}>
                <Text style={style.h4medium}>Not passed</Text>
              </View>
            </View>
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.button}>
              <Text style={[style.h4medium, {color: '#FFFFFF'}]}>
                Change Status
              </Text>
            </View>
            <View style={[styles.button, {backgroundColor: '#EBEFF5'}]}>
              <Export />
              <Text style={[style.h4medium, {marginLeft: 10}]}>Export</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.input2}
                placeholder="Pilih ide"
                maxHeight={100}
                listItemContainerStyle={{height: 35, width: 160}}
              />
            </View>
            <View>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={styles.input2}
                placeholder="Pilih ide"
                maxHeight={100}
                listItemContainerStyle={{height: 35, width: 160}}
              />
            </View>
          </View>
          <View
            style={{
              padding: 10,
              backgroundColor: '#085D7A',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text style={[style.h4medium, {color: '#FFFFFF'}]}>Search</Text>
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#EBEFF5',
              flexDirection: 'row',
              marginTop: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <Text style={[style.h4normal, {marginRight: 20}]}>checkbox</Text>
            <Text style={[style.h4normal, {marginRight: 20}]}>action</Text>
            <Text style={style.h4normal}>Title idea </Text>
          </View>
          <View
            style={{
              padding: 10,
              borderRadius: 5,
              backgroundColor: '#FFFFFF',
              flexDirection: 'row',
              marginTop: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <Text style={[style.h4normal, {marginRight: 20}]}>checkbox</Text>
            <Text style={[style.h4normal, {marginRight: 20}]}>action</Text>
            <Text style={style.h4normal}>Title idea </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventManagementIdea;
