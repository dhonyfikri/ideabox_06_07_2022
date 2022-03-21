import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import styles from '../style/TalentBooster.style';
import SearchHeader from '../../../components/SearchHeader';
import CardTalentBooster from '../../../components/CardTalentBooster';

const TalentBooster = ({navigation}) => {
  return (
    <View>
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />
      <ScrollView>
        <View style={styles.picture}>
          <Image
            source={require('./../../../assets/image/dummyPicture2.png')}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Episode 1 - Unleash Your Power</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={{marginRight: 24}} />
            <CardTalentBooster
              image={require('../../../assets/image/dummyPicture4.png')}
              title={'Apa itu design thinking?'}
            />
            <CardTalentBooster
              image={require('../../../assets/image/dummyPicture3.png')}
              title={'Apa itu Data Analytics?'}
            />
            <View style={{marginRight: 24}} />
          </ScrollView>
        </View>

        <Text style={styles.title}>Digital Telent Ready!</Text>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <View style={{marginRight: 24}} />
          <CardTalentBooster
            image={require('../../../assets/image/dummyPicture1.png')}
            title={'Yuk ikut Assesment'}
          />
          <CardTalentBooster
            image={require('../../../assets/image/dummyPicture4.png')}
            title={'Yuk ikut Assesment'}
          />
          <View style={{marginRight: 24}} />
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default TalentBooster;
