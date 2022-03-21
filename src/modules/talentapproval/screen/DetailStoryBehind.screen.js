import React from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import CardProfile from '../../../components/CardProfile';
import DetailStoryBehindDesc from '../../../components/DetailStoryBehind';
import SearchHeader from '../../../components/SearchHeader';
import styles from '../../myidea/style/MyIdea.style';
const DetailStoryBehind = ({navigation, route}) => {
  const data = route.params.data;
  return (
    <SafeAreaView style={styles.container}>
      <SearchHeader
        onPress={() => navigation.openDrawer()}
        notification={() => navigation.navigate('Notification')}
      />

      {/* Profile */}
      {data.user.pictures === '' ? (
        <CardProfile
          onPress={() => navigation.navigate('TalentApproval')}
          profile={() => navigation.navigate('ProfileUser', {data: data})}
          image={require('../../../assets/icon/profilepicture.png')}
          name={data.user.name}
          nik={data.user.nik}
        />
      ) : (
        <CardProfile
          onPress={() => navigation.navigate('TalentApproval')}
          profile={() => navigation.navigate('ProfileUser', {data: data})}
          image={{uri: data.user.pictures}}
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
                navigation.navigate('DetailIdeaUser', {data: data})
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
                })
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Lean Canvas</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() => navigation.navigate('DetailTeams', {data: data})}>
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
