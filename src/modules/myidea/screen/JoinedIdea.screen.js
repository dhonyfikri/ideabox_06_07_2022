import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcFilterCalendar, IcSearch} from '../../../assets/icon';
import CardSubmittedIdea from '../../../components/CardSubmittedIdea';
import Divider from '../../../components/Divider';
import Gap from '../../../components/Gap';
import Header from '../../../components/Header';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';

const JoinedIdea = ({navigation, route}) => {
  const dataFromServer = [
    {
      id: 1,
      ideaId: 1,
      ideaName: 'Pembuatan Robot',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '20/12/2022, 12:00:01',
    },
    {
      id: 2,
      ideaId: 5,
      ideaName: 'Pembuatan Televisi',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '20/12/2022, 14:00:01',
    },
    {
      id: 3,
      ideaId: 20,
      ideaName: 'Pembuatan Remote',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '20/12/2022, 16:00:01',
    },
    {
      id: 4,
      ideaId: 32,
      ideaName: 'Pembuatan Microwife',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '20/12/2022, 18:00:01',
    },
  ];

  const [joinedIdea, setJoinedIdea] = useState(dataFromServer);
  const [joinedIdeaToShow, setJoinedIdeaToShow] = useState(dataFromServer);
  const [searchText, setSearchText] = useState('');
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);

  // ref
  const bottomSheetRef = useRef(null);
  const bottomSheetActionRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const snapPointsAction = useMemo(() => ['25%', 285], []);

  // callbacks
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleSheetActionChanges = useCallback(index => {
    console.log('handleSheetActionChanges', index);
  }, []);

  const matchToSearch = () => {
    let tempJoinedIdea = [];
    if (searchText === '') {
      tempJoinedIdea = joinedIdea;
    } else {
      joinedIdea.map(item => {
        if (item.ideaName.toLowerCase().includes(searchText.toLowerCase())) {
          tempJoinedIdea.push(item);
        }
      });
    }
    setJoinedIdeaToShow(tempJoinedIdea);
  };

  return (
    <View style={styles.page}>
      <Header
        backButton
        onBackPress={() => navigation.goBack()}
        backText="Back"
        title="Joined Idea"
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                height: '100%',
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 32,
              }}>
              <TextInput
                style={{
                  flex: 1,
                  marginHorizontal: 24,
                  padding: 0,
                  fontFamily: fonts.secondary[400],
                  fontSize: 14,
                  lineHeight: 17,
                  color: colors.text.primary,
                }}
                placeholder="Search..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
              <TouchableOpacity
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32 / 2,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  matchToSearch();
                }}>
                <IcSearch />
              </TouchableOpacity>
            </View>
            <Gap width={4} />
            <TouchableOpacity onPress={() => setCalendarModalVisible(true)}>
              <IcFilterCalendar />
            </TouchableOpacity>
          </View>
          <Gap height={16} />
          <FlatList
            data={joinedIdeaToShow}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            inverted={false}
            renderItem={({item, index}) => {
              return (
                <>
                  {index !== 0 && <Gap height={16} />}
                  <CardSubmittedIdea
                    ideaName={item.ideaName}
                    ownerName={item.ownerName}
                    createdDate={item.createdDate}
                    onDotThreePress={() => {
                      console.log(item.ideaName);
                      setActionModalVisible(true);
                    }}
                  />
                </>
              );
            }}
          />
        </ScrollView>
      </View>
      {/* calendar modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={calendarModalVisible}
        onRequestClose={() => setCalendarModalVisible(false)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#00000088',
          }}>
          {calendarModalVisible && (
            <BottomSheet
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <View style={styles.contentContainer2}>
                <Text>Calendar</Text>
              </View>
            </BottomSheet>
          )}
        </View>
      </Modal>
      {/* action modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={actionModalVisible}
        onRequestClose={() => setActionModalVisible(false)}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#00000088',
          }}>
          {actionModalVisible && (
            <BottomSheet
              ref={bottomSheetActionRef}
              index={1}
              snapPoints={snapPointsAction}
              onChange={handleSheetActionChanges}>
              <View style={styles.bottomSheetContentContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Text style={styles.bottomSheetTitle}>Action</Text>
                  <TouchableOpacity
                    style={styles.titleContainer}
                    onPress={() => setActionModalVisible(false)}>
                    <Text style={styles.bottomSheetCancelButtonText}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                <Gap height={16} />
                <Divider />
                <Gap height={16} />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={{padding: 16}}>
                    <Text style={styles.buttonText('normal')}>My Event</Text>
                  </TouchableOpacity>
                  <Divider />
                  <TouchableOpacity style={{padding: 16}}>
                    <Text style={styles.buttonText('normal')}>Edit Idea</Text>
                  </TouchableOpacity>
                </View>
                <Gap height={8} />
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={{padding: 16}}>
                    <Text style={styles.buttonText('danger')}>Leave Idea</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheet>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default JoinedIdea;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#FFFFFF'},
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  pendingNoticeButton: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 32,
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  pendingNoticeButtonText: {
    color: colors.white,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
  },
  contentContainer2: {
    flex: 1,
    alignItems: 'center',
  },
  bottomSheetContentContainer: {
    height: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  bottomSheetTitle: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
    color: colors.text.primary,
  },
  bottomSheetCancelButtonText: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.tertiary,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: colors.dot,
    borderRadius: 32,
    overflow: 'hidden',
  },
  buttonText: type => ({
    textAlign: 'center',
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color:
      type === 'normal'
        ? colors.text.primary
        : type === 'danger'
        ? colors.reject
        : colors.text.secondary,
  }),
});
