import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CardProfile from '../../../components/CardProfile';
import DetailIdeaDesc from '../../../components/DetailIdeaDesc';
import Header from '../../../components/Header';
import LoadingScreen from '../../../components/LoadingScreen';
import SearchHeader from '../../../components/SearchHeader';
import {GetDetailIdea} from '../../../config/GetData/GetDataIdea';
import styles from '../style/Explore.style';
const DetailExplore = ({route, navigation}) => {
  const data = route.params.data;
  const item = route.params.item;
  const [detailIdea, setDetailIdea] = useState(null);
  useEffect(() => {
    if (data === null) {
      return <LoadingScreen />;
    }
    GetDetailIdea(data.id).then(response => setDetailIdea(response));
  }, [data]);
  if (detailIdea === null) {
    return <LoadingScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />

      {/* Profile */}
      {item.user.pictures === '' ? (
        <CardProfile
          onPress={() => navigation.goBack()}
          profile={() => navigation.navigate('ProfileUser', {data: item})}
          image={require('../../../assets/icon/profilepicture.png')}
          name={detailIdea.user.name}
          nik={detailIdea.user.nik}
        />
      ) : (
        <CardProfile
          onPress={() => navigation.goBack()}
          profile={() => navigation.navigate('ProfileUser', {data: item})}
          image={{uri: item.user.pictures}}
          name={detailIdea.user.name}
          nik={detailIdea.user.nik}
        />
      )}

      {/* content */}

      <View style={styles.contentContainer}>
        {/* Header navigation */}
        <View style={styles.headerContainer2}>
          <View style={styles.headerWrapDetail}>
            <TouchableOpacity style={styles.wrap} onPress={() => {}}>
              <View style={styles.tabBarActive}>
                <Text style={styles.textActive}>Idea Description</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailStoryBehind', {
                  data: detailIdea,
                  item: data,
                })
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Story Behind</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailLeanCanvas', {
                  data: detailIdea,
                  item: data,
                })
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Lean Canvas</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailTeams', {
                  data: detailIdea,
                  item: data,
                })
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Teams</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView>
          <View style={styles.content}>
            {detailIdea.CFUFU[0] === undefined ? (
              <DetailIdeaDesc
                title={detailIdea.desc[0].value}
                cfufu={'-'}
                desc={detailIdea.desc[2].value}
                image={data.desc[1].value}
              />
            ) : (
              <DetailIdeaDesc
                title={detailIdea.desc[0].value}
                cfufu={detailIdea.CFUFU[0].name}
                desc={detailIdea.desc[2].value}
                image={data.desc[1].value}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DetailExplore;
