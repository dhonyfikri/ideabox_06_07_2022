import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import CardProfile from '../../../components/CardProfile';
import DetailStoryBehindDesc from '../../../components/DetailStoryBehind';
import Header from '../../../components/Header';
import SearchHeader from '../../../components/SearchHeader';
import styles from '../style/MyIdea.style';
const DetailStoryBehind = ({navigation, route}) => {
  const data = route.params.data;
  const item = route.params.item;
  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />

      {/* Profile */}
      {item.createdBy.pictures === '' ? (
        <CardProfile
          onPress={() => navigation.navigate('SubmittedIdea')}
          profile={() => navigation.navigate('ProfileUser', {data: item})}
          image={require('../../../assets/icon/profilepicture.png')}
          name={data.user.name}
          nik={data.user.nik}
        />
      ) : (
        <CardProfile
          onPress={() => navigation.navigate('SubmittedIdea')}
          profile={() => navigation.navigate('ProfileUser', {data: item})}
          image={{uri: item.createdBy.pictures}}
          name={data.user.name}
          nik={data.user.nik}
        />
      )}

      {/* content */}
      <View style={styles.contentContainer}>
        {/* Header navigation */}
        <View style={styles.headerContainer2}>
          <View style={styles.headerWrapDetail}>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailIdeaUser', {data: data, item: item})
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Idea Description</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrap} onPress={() => {}}>
              <View style={styles.tabBarActive}>
                <Text style={styles.textActive}>Story Behind</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailLeanCanvas', {
                  data: data,
                  item: item,
                })
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Lean Canvas</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailTeams', {data: data, item: item})
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Teams</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <DetailStoryBehindDesc
            why={data.gc[0].value}
            how={data.gc[1].value}
            what={data.gc[2].value}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailStoryBehind;
