import React, {useState, useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import CardProfileMainContent from '../../../components/CardProfileMainContent';
import ContactDetail from '../../../components/ContactDetail';
import Gap from '../../../components/Gap';
import ModalEditProfile from '../../../components/ModalEditProfile';
import ProfileOptionItem from '../../../components/ProfileOptionItem';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';
import {useIsFocused} from '@react-navigation/native';
import {removeAsyncStorageItem} from '../../../utils/AsyncStorage/StoreAsyncStorage';

const Profile = ({navigation, route}) => {
  const [profileData, setProfiledata] = useState({});
  const [modalContactInfoVisible, setModalContactInfoVisible] = useState(false);

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
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setProfiledata({
      profilePhoto: {
        uri: 'https://cdn0-production-images-kly.akamaized.net/S9AM35Gly7_IQDK9cwINANo5qoU=/1200x900/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/957804/original/067365400_1439796663-thom_yorke.jpg',
      },
      backgroundPhoto: {
        uri: 'https://www.cufonfonts.com/images/thumb/6571/paranoid-android-741x415-1762fc0191.jpg',
      },
      name: 'Elon Murz',
      nip: '2317345',
      phone: '081289058901',
      email: 'elon@gmail.com',
      birthOfDate: '22/03/1999',
      job: 'Product Owner IdeaBox',
      workingLocation: 'Jakarta',
      teamStructure: 'Hacker',
      unit: 'Ideabox2',
      location: 'Karawang, Jawa Barat, Indonesia',
      numberOfIdeas: '36',
      numberOfLikes: '402',
      numberOfComments: '381',
    });
    handleFadeIn();
  }, []);

  if (useIsFocused()) {
    handleFadeIn();
  }

  return (
    <Animated.View style={{...styles.container, opacity: fadeAnim}}>
      <ScrollView>
        <CardProfileMainContent
          profilePhoto={profileData.profilePhoto}
          backgroundPhoto={profileData.backgroundPhoto}
          name={profileData.name}
          teamStructure={profileData.teamStructure}
          job={profileData.job}
          location={profileData.location}
          numberOfIdeas={profileData.numberOfIdeas}
          numberOfLikes={profileData.numberOfLikes}
          numberOfComments={profileData.numberOfComments}
          onContactInfoPress={() => setModalContactInfoVisible(true)}
        />
        <View style={styles.profileOptions}>
          <ProfileOptionItem
            singleData={{
              itemTitle: 'My Profile',
              onPress: () =>
                navigation.navigate('MyProfile', {profileData: profileData}),
            }}
          />
          <Gap height={16} />
          <ProfileOptionItem
            title="My Ideas"
            multiItems
            multiData={[
              {
                itemTitle: 'Submitted Idea',
                onPress: () => navigation.navigate('SubmittedIdea'),
              },
              {
                itemTitle: 'Joined Idea',
                onPress: () => navigation.navigate('JoinedIdea'),
              },
            ]}
          />
          <Gap height={16} />
          <ProfileOptionItem
            title="Tallent Approval"
            singleData={{
              itemTitle: 'Talent Approval',
              onPress: () => navigation.navigate('TalentApproval'),
            }}
          />
          <Gap height={16} />
          <ProfileOptionItem
            title="General Info"
            singleData={{
              itemTitle: 'FAQ',
              onPress: () => console.log('FAQ Clicked'),
            }}
          />
          <Gap height={32} />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              removeAsyncStorageItem('@USER_TOKEN').then(res => {
                navigation.replace('Login');
              });
            }}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          <Gap height={30.5} />
        </View>
      </ScrollView>

      {/* modal contact info */}
      <ModalEditProfile
        title="Elon Murz"
        visible={modalContactInfoVisible}
        onRequestClose={() => setModalContactInfoVisible(false)}
        onCloseButtonPress={() => setModalContactInfoVisible(false)}>
        <ContactDetail email="elonmuzk@gmail.com" phone="082189046790" />
      </ModalEditProfile>
    </Animated.View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  profileOptions: {
    padding: 16,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    padding: 12,
  },
  logoutButtonText: {
    color: colors.white,
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
  },
});
