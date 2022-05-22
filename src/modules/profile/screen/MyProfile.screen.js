import {useBackHandler} from '@react-native-community/hooks';
import {useNavigationState} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AddMyAchievements from '../../../components/AddMyAchievements';
import AddMySkills from '../../../components/AddMySkills';
import CardDetailProfileContent from '../../../components/CardDetailProfileContent';
import CardMyAchivements from '../../../components/CardMyAchivements';
import CardMyIdeas from '../../../components/CardMyIdeas';
import CardMySkills from '../../../components/CardMySkills';
import CardProfileMainContent from '../../../components/CardProfileMainContent';
import ContactDetail from '../../../components/ContactDetail';
import EditMyAbout from '../../../components/EditMyAbout';
import ActionMyAchievements from '../../../components/ActionMyAchievements';
import EditMyBackgroundPhoto from '../../../components/EditMyBackgroundPhoto';
import EditMyProfile from '../../../components/EditMyProfile';
import EditMySkills from '../../../components/EditMySkills';
import Gap from '../../../components/Gap';
import Header from '../../../components/Header';
import ModalEditProfile from '../../../components/ModalEditProfile';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';
import EditMyAchievements from '../../../components/EditMyAchievements';

const MyProfile = ({navigation, route}) => {
  const editableProfile =
    route.params.editable !== undefined ? route.params.editable : true;
  const openModalDiscardEditBackgroundPhotoReff = useRef(null);
  const openModalDiscardEditProfileReff = useRef(null);
  const openModalDiscardEditAboutReff = useRef(null);
  const openModalDiscardEditSkillReff = useRef(null);
  const openModalDiscardAddSkillReff = useRef(null);
  const openModalDiscardAddAchievementReff = useRef(null);
  const openModalDiscardEditAchievementReff = useRef(null);

  const [myAbout, setMyAbout] = useState('');
  const [mySkills, setMySkills] = useState([]);
  const [myAchivements, setMyAchivements] = useState([]);
  const [myIdeas, setMyIdeas] = useState([]);
  const [profileData, setProfileData] = useState(route.params.profileData);

  const [modalEditBackgroundPhotoVisible, setModalEditBackgroundPhotoVisible] =
    useState(false);
  const [modalEditProfileVisible, setModalEditProfileVisible] = useState(false);
  const [modalContactInfoVisible, setModalContactInfoVisible] = useState(false);
  const [modalEditAboutVisible, setModalEditAboutVisible] = useState(false);
  const [modalAddSkillsVisible, setModalAddSkillsVisible] = useState(false);
  const [modalEditSkillsVisible, setModalEditSkillsVisible] = useState(false);
  const [modalAddAchievemensVisible, setModalAddAchievemensVisible] =
    useState(false);
  const [modalActionAchievemensVisible, setModalActionAchievemensVisible] =
    useState(false);
  const [modalEditAchievemensVisible, setModalEditAchievemensVisible] =
    useState(false);

  const [achievementIndexToEdit, setAchievementIndexToEdit] = useState(null);

  // example to get route index
  const routeIndex = useNavigationState(state => state.index);

  const backToPreviousPage = () => {
    if (routeIndex > 0) {
      navigation.goBack();
    } else {
      navigation.replace('TabNavigation');
    }
  };

  useEffect(() => {
    setMyAbout(
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet',
    );
    setMySkills([
      'UI/UX Designer',
      'Product Owner',
      'Digital Marketing',
      'System Analyst',
    ]);
    setMyAchivements([
      {
        title: 'Sistem Keuangan Berbasis Web untuk UMKM',
        desc: 'Top 25 Ideahack -',
        date: '25/11/2014',
      },
      {
        title: 'Indonesia Menerapkan IoT',
        desc: 'Juara Harapan 2 Ideahack',
        date: '18/03/2016',
      },
    ]);
    setMyIdeas([
      {
        title: 'Sistem Keuangan Berbasis Web untuk UMKM',
        desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit',
        picture: require('../../../assets/image/img_dummy_my_idea_1.png'),
      },
      {
        title: 'Sistem Keuangan Berbasis Web untuk UMKM',
        desc: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit',
        picture: require('../../../assets/image/img_dummy_my_idea_2.png'),
      },
    ]);
  }, []);

  useBackHandler(() => {
    backToPreviousPage();
    return true;
  });

  return (
    <View style={styles.container}>
      <Header
        backButton
        onBackPress={backToPreviousPage}
        backText="Back"
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <ScrollView>
        <CardProfileMainContent
          editable={editableProfile}
          profilePhoto={profileData.profilePhoto}
          backgroundPhoto={profileData.backgroundPhoto}
          name={profileData.name}
          teamStructure={profileData.teamStructure}
          job={profileData.job}
          location={profileData.location}
          numberOfIdeas={profileData.numberOfIdeas}
          numberOfLikes={profileData.numberOfLikes}
          numberOfComments={profileData.numberOfComments}
          onEditBackgroundPhotoPress={() =>
            setModalEditBackgroundPhotoVisible(true)
          }
          onEditProfilePress={() => setModalEditProfileVisible(true)}
          onContactInfoPress={() => setModalContactInfoVisible(true)}
        />
        <View style={styles.profileOptions}>
          <CardDetailProfileContent
            editable={editableProfile}
            title="About"
            withEditButton
            onEditPress={() => setModalEditAboutVisible(true)}>
            {myAbout !== '' && <Text style={styles.aboutText}>{myAbout}</Text>}
          </CardDetailProfileContent>
          <Gap height={16} />
          <CardDetailProfileContent
            editable={editableProfile}
            title="My Skills"
            withAddButton
            withEditButton={mySkills.length > 0}
            onAddPress={() => setModalAddSkillsVisible(true)}
            onEditPress={() => setModalEditSkillsVisible(true)}>
            <CardMySkills skills={mySkills} />
          </CardDetailProfileContent>
          <Gap height={16} />
          <CardDetailProfileContent
            editable={editableProfile}
            title="Achievement"
            withAddButton
            withEditButton={myAchivements.length > 0}
            onAddPress={() => setModalAddAchievemensVisible(true)}
            onEditPress={() => setModalActionAchievemensVisible(true)}>
            <CardMyAchivements achievement={myAchivements} />
          </CardDetailProfileContent>
          <Gap height={16} />
          <CardDetailProfileContent
            title="Ideas"
            withTextAction
            textAction="View All Ideas"
            onTextActionPress={() => console.log('Show More Ideas Clicked')}>
            <CardMyIdeas myIdeas={myIdeas} />
          </CardDetailProfileContent>
        </View>
      </ScrollView>

      {/* modal edit background photo */}
      <ModalEditProfile
        title="Edit Background Photo"
        visible={modalEditBackgroundPhotoVisible}
        onRequestClose={() => openModalDiscardEditBackgroundPhotoReff.current()}
        onCloseButtonPress={() =>
          openModalDiscardEditBackgroundPhotoReff.current()
        }>
        <EditMyBackgroundPhoto
          openModalDiscardReff={openModalDiscardEditBackgroundPhotoReff}
          backgroundPhoto={profileData.backgroundPhoto}
          onSavePress={newBackgroundPhoto => {
            setModalEditBackgroundPhotoVisible(false);
            setProfileData({
              ...profileData,
              backgroundPhoto: newBackgroundPhoto,
            });
          }}
          onDiscardPress={() => setModalEditBackgroundPhotoVisible(false)}
        />
      </ModalEditProfile>

      {/* modal edit profile */}
      <ModalEditProfile
        title="Edit Personal Information"
        visible={modalEditProfileVisible}
        onRequestClose={() => openModalDiscardEditProfileReff.current()}
        onCloseButtonPress={() => openModalDiscardEditProfileReff.current()}>
        <EditMyProfile
          openModalDiscardReff={openModalDiscardEditProfileReff}
          profileData={profileData}
          onSavePress={(newProfileData, photoProfileChanged) => {
            if (photoProfileChanged) {
              //with update photo
              console.log('with update photo');
              setProfileData(newProfileData);
            } else {
              //without update photo
              console.log('without update photo');
              setProfileData({
                ...profileData,
                ...newProfileData,
                profilePhoto: profileData.profilePhoto,
              });
            }
            setModalEditProfileVisible(false);
          }}
          onDiscardPress={() => setModalEditProfileVisible(false)}
        />
      </ModalEditProfile>

      {/* modal contact info */}
      <ModalEditProfile
        title="Elon Murz"
        visible={modalContactInfoVisible}
        onRequestClose={() => setModalContactInfoVisible(false)}
        onCloseButtonPress={() => setModalContactInfoVisible(false)}>
        <ContactDetail email={profileData.email} phone={profileData.phone} />
      </ModalEditProfile>

      {/* modal edit my about */}
      <ModalEditProfile
        title="Edit About Myself"
        visible={modalEditAboutVisible}
        onRequestClose={() => openModalDiscardEditAboutReff.current()}
        onCloseButtonPress={() => openModalDiscardEditAboutReff.current()}>
        <EditMyAbout
          openModalDiscardReff={openModalDiscardEditAboutReff}
          text={myAbout}
          onSavePress={newAbout => {
            setModalEditAboutVisible(false);
            setMyAbout(newAbout);
          }}
          onDiscardPress={() => setModalEditAboutVisible(false)}
        />
      </ModalEditProfile>

      {/* modal add my skills */}
      <ModalEditProfile
        title="Add My Skills"
        visible={modalAddSkillsVisible}
        onRequestClose={() => openModalDiscardAddSkillReff.current()}
        onCloseButtonPress={() => openModalDiscardAddSkillReff.current()}>
        <AddMySkills
          openModalDiscardReff={openModalDiscardAddSkillReff}
          recomendationSkills={[
            'Web Design',
            'Data Representation',
            'Prototyping',
            'Control Systems Design',
          ]}
          mySkills={mySkills}
          onSavePress={newSkills => {
            const oldSkills = [...mySkills];
            setMySkills([...new Set([...oldSkills, ...newSkills])]);
            setModalAddSkillsVisible(false);
          }}
          onDiscardPress={() => setModalAddSkillsVisible(false)}
        />
      </ModalEditProfile>

      {/* modal edit my skills */}
      <ModalEditProfile
        title="Edit My Skills"
        visible={modalEditSkillsVisible}
        onRequestClose={() => openModalDiscardEditSkillReff.current()}
        onCloseButtonPress={() => openModalDiscardEditSkillReff.current()}>
        <EditMySkills
          openModalDiscardReff={openModalDiscardEditSkillReff}
          skills={mySkills}
          onSavePress={newSkills => {
            setModalEditSkillsVisible(false);
            setMySkills(newSkills);
          }}
          onDiscardPress={() => setModalEditSkillsVisible(false)}
        />
      </ModalEditProfile>

      {/* modal add my achievements */}
      <ModalEditProfile
        title="Add My Achievements"
        visible={modalAddAchievemensVisible}
        onRequestClose={() => openModalDiscardAddAchievementReff.current()}
        onCloseButtonPress={() => openModalDiscardAddAchievementReff.current()}>
        <AddMyAchievements
          openModalDiscardReff={openModalDiscardAddAchievementReff}
          onDiscardPress={() => setModalAddAchievemensVisible(false)}
          onSavePress={newAchievements => {
            setModalAddAchievemensVisible(false);
            const tempAchievements = [...myAchivements];
            tempAchievements.push(newAchievements);
            setMyAchivements(tempAchievements);
          }}
        />
      </ModalEditProfile>

      {/* modal action my achievements */}
      <ModalEditProfile
        title="Edit My Achievements"
        visible={modalActionAchievemensVisible}
        onRequestClose={() => setModalActionAchievemensVisible(false)}
        onCloseButtonPress={() => setModalActionAchievemensVisible(false)}>
        <ActionMyAchievements
          achievements={myAchivements}
          onItemEdit={achievementIndexToEdit => {
            setModalActionAchievemensVisible(false);
            setAchievementIndexToEdit(achievementIndexToEdit);
            setModalEditAchievemensVisible(true);
          }}
          onItemDelete={achievementIndexToDelete => {
            if (myAchivements.length <= 1) {
              setModalActionAchievemensVisible(false);
            }
            const tempMyAchievements = [...myAchivements];
            tempMyAchievements.splice(achievementIndexToDelete, 1);
            setMyAchivements(tempMyAchievements);
          }}
        />
      </ModalEditProfile>

      {/* modal edit my achievements */}
      <ModalEditProfile
        title="Edit My Achievements"
        visible={modalEditAchievemensVisible}
        onRequestClose={() => openModalDiscardEditAchievementReff.current()}
        onCloseButtonPress={() =>
          openModalDiscardEditAchievementReff.current()
        }>
        <EditMyAchievements
          openModalDiscardReff={openModalDiscardEditAchievementReff}
          achievementsToEdit={myAchivements[achievementIndexToEdit]}
          onDiscardPress={() => {
            setModalEditAchievemensVisible(false);
            setModalActionAchievemensVisible(true);
          }}
          onSavePress={editedAchievementItem => {
            setModalEditAchievemensVisible(false);
            const tempAchievements = [...myAchivements];
            tempAchievements[achievementIndexToEdit] = editedAchievementItem;
            setMyAchivements(tempAchievements);
            setModalActionAchievemensVisible(true);
          }}
        />
      </ModalEditProfile>
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  profileOptions: {
    padding: 16,
  },
  aboutText: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.text.secondary,
    textAlign: 'justify',
  },
});
