import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ActivityIndicator,
  Animated,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {colors} from '../../../utils/ColorsConfig/Colors';
import Gap from '../../../components/Gap';

const SplashScreen = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const handleFadeIn = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    handleFadeIn();
    setTimeout(() => {
      navigation.replace('Main');
    }, 1200);
  }, []);

  return (
    <>
      <StatusBar
        animated
        backgroundColor={colors.white}
        barStyle="dark-content"
      />
      <View
        style={{
          flex: 1,
          // backgroundColor: colors.primary,
          backgroundColor: colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Animated.View style={{opacity: fadeAnim}}>
          <Image
            source={require('../../../assets/image/logo-ideabox.png')}
            style={{
              width: 100,
              height: 50,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
        <Gap height={16} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
