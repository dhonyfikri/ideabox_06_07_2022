import React, {useEffect} from 'react';
import {ActivityIndicator, Image, View, StatusBar} from 'react-native';
import {Logo} from '../../../assets/image';
import {colors} from '../../../utils/ColorsConfig/Colors';
import styles from '../style/Splash.style';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.secondary} barStyle="dark-content" />
      <View style={styles.logo}>
        <Logo />
        <ActivityIndicator size="large" color="#FF0000" style={{margin: 25}} />
      </View>
      <View style={styles.image}>
        {/* <ImageSplash /> */}
        <Image
          source={require('../../../assets/image/ImageSplash.png')}
          style={styles.imageSplash}
        />
      </View>
    </View>
  );
};

export default Splash;
