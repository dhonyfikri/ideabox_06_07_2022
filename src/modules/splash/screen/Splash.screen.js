import React, {useEffect} from 'react';
import {View, ActivityIndicator, Image} from 'react-native';
import {Logo} from '../../../assets/image';
import {windowWidth} from '../../../components/WindowDimensions';
import styles from '../style/Splash.style';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main');
    }, 1500);
  }, [navigation]);

  return (
    <View style={styles.container}>
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
