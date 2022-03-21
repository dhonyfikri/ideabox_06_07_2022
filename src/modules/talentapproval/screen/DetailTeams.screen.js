import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CardDetailTeamDesc from '../../../components/CardDetailTeamsDesc';
import CardProfile from '../../../components/CardProfile';
import SearchHeader from '../../../components/SearchHeader';
import styles from '../../myidea/style/MyIdea.style';
const DetailTeams = ({navigation, route}) => {
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
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailStoryBehind', {data: data})
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Story Behind</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.wrap}
              onPress={() =>
                navigation.navigate('DetailLeanCanvas', {data: data})
              }>
              <View style={styles.tabBar}>
                <Text style={styles.textNonActive}>Lean Canvas</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wrap} onPress={() => {}}>
              <View style={styles.tabBarActive}>
                <Text style={styles.textActive}>Teams</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.titleContent}>
            <View style={styles.email}>
              <Text>No</Text>
            </View>
            <View style={styles.title}>
              <Text>Nama</Text>
            </View>
            <View style={styles.title}>
              <Text>NIP</Text>
            </View>
            <View style={styles.title}>
              <Text>CFU/FU</Text>
            </View>
          </View>
          <ScrollView>
            {data.approval.map((val, index) => {
              return (
                <CardDetailTeamDesc
                  number={index + 1}
                  name={val.approvalTo.name}
                  nip={val.approvalTo.id}
                  cfu={val.approvalTo.cfufuName}
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailTeams;
