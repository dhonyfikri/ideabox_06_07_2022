import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Line, MainImage} from '../../../assets/icon';
import styles from '../style/Main.style';
import style from '../../../config/Style/style.cfg';
const Main = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.line}>
          <Line />
        </View>
        <View style={styles.wrap}>
          <View style={styles.title}>
            <Text style={styles.textwhitetitle}>Apa Itu</Text>
            <Text style={styles.textredtitle}> IDEA</Text>
            <Text style={styles.textwhitetitle}>BOX?</Text>
          </View>
          <View style={styles.content}>
            <Text style={[style.h4medium, styles.textcontent]}>
              <Text style={styles.redtitlecontent}>IDEA</Text>
              <Text style={styles.whitetitlecontent}>BOX</Text> Merupakan single
              platform yang digunakan sebagai media sosial inovasi bagi karyawan
              Telkom untuk dapat menyampaikan idea dan berkolaborasi
              mengembangkannya.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.replace('Login', {checked: false})}
            style={styles.button}>
            <Text style={styles.getstarted}>GET STARTED</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainimage}>
          <Image
            source={require('../../../assets/image/ImageMain.png')}
            style={{flex: 1, resizeMode: 'contain'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Main;
