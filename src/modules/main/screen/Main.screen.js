import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {RefreshTokenAPI} from '../../../config/RequestAPI/RefreshTokenAPI';
import {
  getAsyncStorageObject,
  storeAsyncStorageObject,
} from '../../../utils/AsyncStorage/StoreAsyncStorage';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';
import slides from '../components/slides';
import styles from '../style/Main.style';
import LoadingProcessFull from '../../../components/LoadingProcessFull';

const Main = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userToken, setUserToken] = useState(undefined);
  const [loading, setLoading] = useState({visible: false, message: undefined});
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const {width} = Dimensions.get('window');

  const expiredCheck = () => {
    let decodedToken = undefined;
    try {
      decodedToken = jwt_decode(userToken.authToken);
    } catch (e) {
      console.log(e);
    }
    if (decodedToken?.exp > moment().unix()) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    let scrollValue = 0,
      scrolled = 0;

    const intervalId = setInterval(() => {
      scrolled++;
      if (scrolled < slides.length) {
        scrollValue = scrollValue + width;
      } else {
        scrollValue = 0;
        scrolled = 0;
      }

      slidesRef.current.scrollToOffset({animated: true, offset: scrollValue});
    }, 3000);
    return () => clearInterval(intervalId);
  }, [width]);

  useEffect(() => {
    getAsyncStorageObject('@USER_TOKEN').then(res => {
      setUserToken(res);
    });
  }, []);

  const handleRefreshToken = () => {
    if (userToken !== undefined) {
      if (userToken === null) {
        navigation.replace('Login', {checked: false});
      } else {
        if (!expiredCheck()) {
          setLoading({...loading, visible: true});
          RefreshTokenAPI(userToken.refreshToken).then(res => {
            setLoading({...loading, visible: false});
            if (res.status === 'SUCCESS') {
              storeAsyncStorageObject('@USER_TOKEN', res.data).then(() => {
                navigation.replace('TabNavigation', {userToken: res.data});
              });
            } else {
              navigation.replace('Login', {checked: false});
            }
          });
        } else {
          navigation.replace('Login', {checked: false});
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar animated backgroundColor="#5F49D2" barStyle="light-content" />
      <View style={styles.flatlist}>
        <FlatList
          data={slides}
          renderItem={({item}) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: scrollX},
                },
              },
            ],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          style={{
            flexGrow: 0,
          }}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleRefreshToken();
        }}>
        <Text style={styles.getstarted}>Get Started</Text>
      </TouchableOpacity>
      <LoadingProcessFull visible={loading.visible} message={loading.message} />
    </View>
  );
};

export default Main;
