import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import CardProfile from '../../../components/CardProfile';
import Header from '../../../components/Header';
import LoadingFull from '../../../components/LoadingFull';
import RefreshFull from '../../../components/RefreshFull';
import TopTabDetailIdeaNavigation from '../../../components/TopTabDetailIdeaNavigation';
import {GetDetailIdea} from '../../../config/GetData/GetDataIdea';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../style/Explore.style';

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
      <SafeAreaView style={styles.container}>
        <Header
          onPress={() => navigation.openDrawer()}
          notification={() => navigation.navigate('Notification')}
        />

        {/* Profile */}

        <CardProfile
          onPress={() => navigation.goBack()}
          profile={
            stateGlobal.detailIdea !== null
              ? () =>
                  navigation.navigate('ProfileUser', {
                    data: stateGlobal.detailIdea,
                  })
              : () => {}
          }
          image={
            stateGlobal.detailIdea === null ||
            stateGlobal.detailIdea.user.pictures === ''
              ? require('../../../assets/icon/profilepicture.png')
              : {uri: stateGlobal.detailIdea.user.pictures}
          }
          name={stateGlobal.detailIdea?.user.name}
          nik={stateGlobal.detailIdea?.user.nik}
        />

        {/* content */}

        <ScrollView contentContainerStyle={{flex: 1}}>
          <TopTabDetailIdeaNavigation />
        </ScrollView>
      </SafeAreaView>
      {isLoading && <LoadingFull message="Getting Detail Idea..." />}
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
