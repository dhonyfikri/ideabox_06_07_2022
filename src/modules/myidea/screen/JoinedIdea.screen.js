import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {IcFilterCalendar, IcSearch} from '../../../assets/icon';
import CalendarRangePicker from '../../../components/CalendarRangePicker';
import CardJoinedIdea from '../../../components/CardJoinedIdea';
import Divider from '../../../components/Divider';
import EditActionButton from '../../../components/EditActionButton';
import Gap from '../../../components/Gap';
import Header from '../../../components/Header';
import ModalAction from '../../../components/ModalAction';
import ModalMessage from '../../../components/ModalMessage';
import {colors} from '../../../utils/ColorsConfig/Colors';
import {textToDate} from '../../../utils/DateConfig/DateConvert';
import fonts from '../../../utils/FontsConfig/Fonts';

const JoinedIdea = ({navigation, route}) => {
  const dataFromServer = [
    {
      id: 1,
      ideaId: 1,
      ideaName: 'Pembuatan Robot',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '20/02/2022, 12:00:01',
    },
    {
      id: 2,
      ideaId: 5,
      ideaName: 'Pembuatan Televisi',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '04/01/2022, 14:00:01',
    },
    {
      id: 3,
      ideaId: 20,
      ideaName: 'Pembuatan Remote',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '26/10/2022, 16:00:01',
    },
    {
      id: 4,
      ideaId: 32,
      ideaName: 'Pembuatan Microwife',
      ownerId: 4,
      ownerName: 'Siti Bojong G.',
      createdDate: '12/05/2022, 18:00:01',
    },
  ];

  const refRBSheetAction = useRef();
  const refRBSheetCalendar = useRef();

  const [joinedIdea, setJoinedIdea] = useState(dataFromServer);
  const [joinedIdeaToShow, setJoinedIdeaToShow] = useState(dataFromServer);
  const [searchText, setSearchText] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [filterDate, setFilterDate] = useState({
    start: 'Unlimited',
    end: 'Unlimited',
  });

  const [modalLeaveIdeaVisible, setModalLeaveIdeaVisible] = useState(false);
  const [
    messageSuccessLeaveIdeaModalVisible,
    setMessageSuccessLeaveIdeaModalVisible,
  ] = useState(false);
  const [leaveIdeaMessage, setLeaveIdeaMessage] = useState('');

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
    setJoinedIdeaToShow(matchToFilter(tempJoinedIdea));
  };

  const matchToFilter = value => {
    let tempJoinedIdea = [...value];
    if (filterDate.start !== 'Unlimited' && filterDate.end !== 'Unlimited') {
      const _tempJoinedIdea = value.filter(item => {
        return (
          textToDate(item.createdDate?.split(',')[0]) >=
            textToDate(filterDate.start) &&
          textToDate(item.createdDate?.split(',')[0]) <=
            textToDate(filterDate.end)
        );
      });
      tempJoinedIdea = _tempJoinedIdea;
    } else if (
      filterDate.start !== 'Unlimited' &&
      filterDate.end === 'Unlimited'
    ) {
      const _tempJoinedIdea = value.filter(item => {
        return (
          textToDate(item.createdDate?.split(',')[0]) >=
          textToDate(filterDate.start)
        );
      });
      tempJoinedIdea = _tempJoinedIdea;
    } else if (
      filterDate.start === 'Unlimited' &&
      filterDate.end !== 'Unlimited'
    ) {
      const _tempJoinedIdea = value.filter(item => {
        return (
          textToDate(item.createdDate?.split(',')[0]) <=
          textToDate(filterDate.end)
        );
      });
      tempJoinedIdea = _tempJoinedIdea;
    }

    return tempJoinedIdea;
  };

  useEffect(() => {
    setJoinedIdeaToShow(matchToFilter(joinedIdea));
  }, [filterDate, joinedIdea]);

  return (
    <View style={styles.page}>
      <Header
        backButton
        onBackPress={() => navigation.goBack()}
        backText="Back"
        title="Joined Idea"
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.searchAndFilterWrapper}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={searchText}
              onChangeText={text => setSearchText(text)}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => {
                matchToSearch();
              }}>
              <IcSearch />
            </TouchableOpacity>
          </View>
          <Gap width={4} />
          <TouchableOpacity onPress={() => refRBSheetCalendar.current.open()}>
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
                <CardJoinedIdea
                  valueLength={joinedIdeaToShow.length}
                  raiseDelay={index}
                  ideaName={item.ideaName}
                  ownerName={item.ownerName}
                  createdDate={item.createdDate}
                  onDotThreePress={() => {
                    console.log(item.ideaId, item.ideaName);
                    setSelectedIdea(item);
                    refRBSheetAction.current.open();
                  }}
                />
              </>
            );
          }}
        />
      </ScrollView>
      {/* Bottom sheet action */}
      <RBSheet
        ref={refRBSheetAction}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="fade"
        height={280}
        customStyles={{
          container: {
            paddingTop: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          draggableIcon: {
            backgroundColor: '#9CA3AF',
            margin: 0,
          },
        }}>
        <View style={styles.bottomSheetContentContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.bottomSheetTitle}>Action</Text>
            <TouchableOpacity
              style={styles.titleContainer}
              onPress={() => refRBSheetAction.current.close()}>
              <Text style={styles.bottomSheetCancelButtonText}>Cancel</Text>
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
            <TouchableOpacity
              style={{padding: 16}}
              onPress={() => {
                refRBSheetAction.current.close();
                navigation.navigate('EditIdea', {
                  ideaId: selectedIdea.ideaId,
                  userToken: route.params?.userToken,
                  isGuest: true,
                });
              }}>
              <Text style={styles.buttonText('normal')}>Edit Idea</Text>
            </TouchableOpacity>
          </View>
          <Gap height={8} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{padding: 16}}
              onPress={() => {
                refRBSheetAction.current.close();
                setModalLeaveIdeaVisible(true);
              }}>
              <Text style={styles.buttonText('danger')}>Leave Idea</Text>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
      {/* Bottom sheet calendar */}
      <RBSheet
        ref={refRBSheetCalendar}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="fade"
        onClose={() => setShowDateRangePicker(false)}
        customStyles={{
          container: {
            paddingTop: 16,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            height: showDateRangePicker ? 455 : 220,
          },
          wrapper: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
          draggableIcon: {
            backgroundColor: '#9CA3AF',
            margin: 0,
          },
        }}>
        <View style={styles.bottomSheetContentContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Text style={styles.bottomSheetTitle}>Calender</Text>
            <TouchableOpacity
              style={styles.cancelContainer}
              onPress={() => refRBSheetCalendar.current.close()}>
              <Text style={styles.bottomSheetCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Gap height={16} />
          <Divider />
          <Gap height={16} />
          <CalendarRangePicker
            actualDateFilter={filterDate}
            showRangePicker={showDateRangePicker}
            onClick={() => setShowDateRangePicker(!showDateRangePicker)}
            onDiscard={() => refRBSheetCalendar.current.close()}
            onSave={newDateFilter => {
              refRBSheetCalendar.current.close();
              setFilterDate(newDateFilter);
            }}
          />
        </View>
      </RBSheet>
      {/* Modal leave idea action */}
      <ModalAction
        visible={modalLeaveIdeaVisible}
        title="Leave Idea"
        onCloseButtonPress={() => {
          setModalLeaveIdeaVisible(false);
          setLeaveIdeaMessage('');
        }}
        onRequestClose={() => {
          setModalLeaveIdeaVisible(false);
          setLeaveIdeaMessage('');
        }}
        contentBackground={colors.secondary}
        withTitleDivider={false}>
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>
            Are you sure you want to{' '}
            <Text
              style={{
                ...styles.noticeText,
                fontFamily: fonts.secondary[700],
                color: colors.reject,
              }}>
              leave
            </Text>{' '}
            this idea?{' '}
            <Text
              style={{
                ...styles.noticeText,
                fontFamily: fonts.secondary[700],
              }}>
              {selectedIdea?.ideaName}
            </Text>
          </Text>
        </View>
        <Gap height={28} />
        <View
          style={{
            padding: 16,
            backgroundColor: colors.white,
            borderRadius: 32,
          }}>
          <Text style={styles.messageTitle}>
            Please fill the reason in the field below
            <Text style={{color: colors.reject}}>*</Text>
          </Text>
          <Gap height={8} />
          <TextInput
            multiline
            autoCorrect={false}
            textAlignVertical="top"
            style={styles.board}
            placeholder="Fill your reason.."
            onChangeText={text => {
              setLeaveIdeaMessage(text);
            }}>
            <Text style={{lineHeight: 20}}>{leaveIdeaMessage}</Text>
          </TextInput>
        </View>
        <Gap height={16} />
        <EditActionButton
          disableSaveButton={leaveIdeaMessage.trim().length <= 0}
          onDiscardPress={() => {
            setModalLeaveIdeaVisible(false);
            setLeaveIdeaMessage('');
          }}
          onSavePress={() => {
            setModalLeaveIdeaVisible(false);
            let tempIdea = joinedIdeaToShow.filter(item => {
              return item.ideaId !== selectedIdea.ideaId;
            });
            setSelectedIdea(null);
            setJoinedIdeaToShow(tempIdea);
            setLeaveIdeaMessage('');
            setMessageSuccessLeaveIdeaModalVisible(true);
          }}
        />
      </ModalAction>
      {/* modal success leave idea message */}
      <ModalMessage
        visible={messageSuccessLeaveIdeaModalVisible}
        withIllustration
        illustrationType="confused"
        title="You’re all done"
        message={
          <Text>
            You have <Text style={{color: colors.reject}}>abandoned</Text> this
            Idea
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessLeaveIdeaModalVisible(false);
        }}
        onRequestClose={() => {
          setMessageSuccessLeaveIdeaModalVisible(false);
        }}
      />
    </View>
  );
};

export default JoinedIdea;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#FFFFFF'},
  contentContainer: {
    padding: 16,
  },
  searchAndFilterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 32,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 24,
    padding: 0,
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    lineHeight: 17,
    color: colors.text.primary,
  },
  searchButton: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
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
  cancelContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  noticeContainer: {
    paddingVertical: 20,
    borderRadius: 16,
  },
  noticeText: {
    fontFamily: fonts.secondary[500],
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.primary,
  },
  messageTitle: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
    color: colors.text.primary,
  },
  board: {
    height: 155,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 12,
    fontFamily: fonts.primary[400],
    fontSize: 16,
    color: colors.text.tertiary,
  },
});
