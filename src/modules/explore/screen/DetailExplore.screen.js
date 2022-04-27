import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import CardProfile from '../../../components/CardProfile';
import Header from '../../../components/Header';
import LoadingFull from '../../../components/LoadingFull';
import RefreshFull from '../../../components/RefreshFull';
import Gap from '../../../components/Gap';
import TopTabDetailIdeaNavigation from '../../../components/TopTabDetailIdeaNavigation';
import {GetDetailIdea} from '../../../config/GetData/GetDataIdea';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../style/Explore.style';
import {IcComment, IcEnvelope, IcUnactiveLike} from '../../../assets/icon';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';

const DetailExplore = ({route, navigation}) => {
  const dispatch = useDispatch();
  const stateGlobal = useSelector(state => state);

  const ideaId = route.params.ideaId;
  // const [detailIdea, setDetailIdea] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showRefreshButton, setShowRefreshButton] = useState(false);

  const fetchDetailIdea = () => {
    setIsLoading(true);
    GetDetailIdea(ideaId).then(response => {
      setIsLoading(false);
      if (response !== undefined) {
        dispatch({
          type: 'SET_DETAIL_IDEA',
          value: response,
        });
      } else {
        setShowRefreshButton(true);
      }
    });
  };

  useEffect(() => {
    fetchDetailIdea();
  }, []);

  return (
    <>
      <StatusBar backgroundColor={colors.secondary} barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Header
          backButton
          backText="Back"
          onBackPress={() => navigation.goBack()}
          onNotificationPress={() => navigation.navigate('Notification')}
        />
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              height: stateGlobal.detailIdeaPageHeight,
            }}>
            <Gap height={24} />
            <CardProfile />
            <Gap height={16} />
            <View style={stylesNew.interactions}>
              <TouchableOpacity style={stylesNew.interactionsItem}>
                <IcUnactiveLike width={24} height={24} />
                <Gap width={6.5} />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={stylesNew.interactionsText}>
                  482
                </Text>
              </TouchableOpacity>
              <Gap width={6.5} />
              <TouchableOpacity style={stylesNew.interactionsItem}>
                <IcComment width={24} height={24} />
                <Gap width={6.5} />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={stylesNew.interactionsText}>
                  15
                </Text>
              </TouchableOpacity>
              <Gap width={6.5} />
              <TouchableOpacity>
                <IcEnvelope width={24} height={24} />
              </TouchableOpacity>
            </View>
            <Gap height={16} />
            <TopTabDetailIdeaNavigation />
          </ScrollView>
        </View>
      </SafeAreaView>
      {isLoading && (
        <LoadingFull message="Getting Detail Idea..." backgroundOpacity={0.2} />
      )}
      {showRefreshButton && (
        <RefreshFull
          backgroundOpacity={0}
          message="Failed get idea details"
          onOffsetTouch={() => setShowRefreshButton(false)}
          onPress={() => {
            setShowRefreshButton(false);
            fetchDetailIdea();
          }}
        />
      )}
    </>
  );
};

export default DetailExplore;

const stylesNew = StyleSheet.create({
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionsText: {
    color: colors.text.secondary,
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    width: 40,
  },
});
