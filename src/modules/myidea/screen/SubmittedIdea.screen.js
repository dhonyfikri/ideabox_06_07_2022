import {useBackHandler} from '@react-native-community/hooks';
import jwtDecode from 'jwt-decode';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {IcFilterCalendar, IcSearch} from '../../../assets/icon';
import CalendarRangePicker from '../../../components/CalendarRangePicker';
import CardSubmittedIdea from '../../../components/CardSubmittedIdea';
import Divider from '../../../components/Divider';
import EditActionButton from '../../../components/EditActionButton';
import Gap from '../../../components/Gap';
import Header from '../../../components/Header';
import LoadingProcessFull from '../../../components/LoadingProcessFull';
import ModalAction from '../../../components/ModalAction';
import ModalMessage from '../../../components/ModalMessage';
import RefreshFull from '../../../components/RefreshFull';
import {
  DeleteIdeasAPI,
  GetSubmittedIdeasAPI,
} from '../../../config/RequestAPI/IdeaAPI';
import {colors} from '../../../utils/ColorsConfig/Colors';
import {textToDate} from '../../../utils/DateConfig/DateConvert';
import fonts from '../../../utils/FontsConfig/Fonts';

const SubmittedIdea = ({navigation, route}) => {
  const decodedJwt = jwtDecode(route.params?.userToken.authToken);

  const refRBSheetAction = useRef();
  const refRBSheetCalendar = useRef();

  const [submittedIdea, setSubmittedIdea] = useState([]);
  const [submittedIdeaToShow, setSubmittedIdeaToShow] = useState([]);
  const [listUserData, setListUserData] = useState([]);
  const [ideaDataList, setIdeaDataList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedIdea, setSelectedIdea] = useState(null);

  const [showDateRangePicker, setShowDateRangePicker] = useState(false);
  const [filterDate, setFilterDate] = useState({
    start: 'Unlimited',
    end: 'Unlimited',
  });

  const [modalDeleteIdeaVisible, setModalDeleteIdeaVisible] = useState(false);
  const [
    messageSuccessDeleteIdeaModalVisible,
    setMessageSuccessDeleteIdeaModalVisible,
  ] = useState(false);
  const [deleteIdeaMessage, setDeleteIdeaMessage] = useState('');
  const [loading, setLoading] = useState({
    visible: true,
    message: 'Please Wait',
  });
  const [messageModal, setMessageModal] = useState({
    visible: false,
    message: undefined,
    title: undefined,
    type: 'smile',
    onClose: () => {},
  });
  const [showRefreshBUtton, setShowRefreshButton] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const fetchSubmittedIdea = () => {
    setLoading({...loading, visible: true});
    GetSubmittedIdeasAPI(route.params?.userToken?.authToken).then(res => {
      setLoading({...loading, visible: false});
      if (res.status === 'SUCCESS') {
        setSubmittedIdea(res.data);
      } else {
        setShowRefreshButton(true);
      }
    });
  };

  const handleDeleteSubmittedIdea = () => {
    setLoading({...loading, visible: true, message: 'Deleting idea'});
    DeleteIdeasAPI(
      route.params?.userToken.authToken,
      parseInt(selectedIdea.id),
    ).then(res => {
      setLoading({...loading, visible: false});
      console.log(res);
      if (res.status === 'SUCCESS') {
        setModalDeleteIdeaVisible(false);
        setSelectedIdea(null);
        setDeleteIdeaMessage('');
        setMessageSuccessDeleteIdeaModalVisible(true);
        setChanged();
      } else if (
        res.status === 'SOMETHING_WRONG' ||
        res.status === 'ERROR' ||
        res.status === 'SERVER_ERROR'
      ) {
        setMessageModal({
          ...messageModal,
          visible: true,
          title: 'Failed',
          message: res.message,
          type: 'confused',
        });
      }
    });
  };

  const matchToSearch = () => {
    let tempSubmittedIdea = [];
    if (searchText === '') {
      tempSubmittedIdea = submittedIdea;
    } else {
      submittedIdea.map(item => {
        if (
          item.desc[0]?.value.toLowerCase().includes(searchText.toLowerCase())
        ) {
          tempSubmittedIdea.push(item);
        }
      });
    }
    setSubmittedIdeaToShow(matchToFilter(tempSubmittedIdea));
  };

  const matchToFilter = value => {
    let tempSubmittedIdea = [...value];
    if (filterDate.start !== 'Unlimited' && filterDate.end !== 'Unlimited') {
      const _tempSubmittedIdea = value.filter(item => {
        return (
          (item.createdDate
            ? textToDate(item.createdDate?.split(',')[0])
            : 0) >= textToDate(filterDate.start) &&
          (item.createdDate
            ? textToDate(item.createdDate?.split(',')[0])
            : 0) <= textToDate(filterDate.end)
        );
      });
      tempSubmittedIdea = _tempSubmittedIdea;
    } else if (
      filterDate.start !== 'Unlimited' &&
      filterDate.end === 'Unlimited'
    ) {
      const _tempSubmittedIdea = value.filter(item => {
        return (
          (item.createdDate
            ? textToDate(item.createdDate?.split(',')[0])
            : 0) >= textToDate(filterDate.start)
        );
      });
      tempSubmittedIdea = _tempSubmittedIdea;
    } else if (
      filterDate.start === 'Unlimited' &&
      filterDate.end !== 'Unlimited'
    ) {
      const _tempSubmittedIdea = value.filter(item => {
        return (
          (item.createdDate
            ? textToDate(item.createdDate?.split(',')[0])
            : 0) <= textToDate(filterDate.end)
        );
      });
      tempSubmittedIdea = _tempSubmittedIdea;
    }

    return tempSubmittedIdea;
  };

  const setChanged = () => {
    if (!isChanged) {
      setIsChanged(true);
    }
  };

  const backToPreviousPage = () => {
    if (isChanged) {
      navigation.navigate('TabNavigation', {
        screen: 'Profile',
        params: {
          userToken: route.params?.userToken,
          refresh: {status: true},
        },
      });
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    setSubmittedIdeaToShow(matchToFilter(submittedIdea));
  }, [filterDate, submittedIdea]);

  useEffect(() => {
    if (route.params?.refresh?.status) {
      setChanged();
      fetchSubmittedIdea();
    }
    if (route.params?.refresh?.status) {
      navigation.setParams({
        ...route.params,
        refresh: {status: false},
      });
    }
  }, [route.params?.refresh]);

  useEffect(() => {
    fetchSubmittedIdea();
  }, []);

  useBackHandler(() => {
    backToPreviousPage();
    return true;
  });

  return (
    <View style={styles.page}>
      <Header
        backButton
        onBackPress={() => backToPreviousPage()}
        backText="Back"
        title="Submitted Idea"
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
          data={submittedIdeaToShow}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          inverted={false}
          renderItem={({item, index}) => {
            return (
              <>
                {index !== 0 && <Gap height={16} />}
                <CardSubmittedIdea
                  valueLength={submittedIdeaToShow.length}
                  raiseDelay={index}
                  ideaName={item.desc[0]?.value}
                  ownerName={item.createdBy.name}
                  createdDate={item.createdDate ? item.createdDate : '-'}
                  onDotThreePress={() => {
                    console.log(item.id, item.desc[0]?.value);
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
        height={350}
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
                  ideaId: selectedIdea.id,
                  allowJoin: selectedIdea.allowJoin,
                  userToken: route.params?.userToken,
                  ideaDataList: ideaDataList,
                });
              }}>
              <Text style={styles.buttonText('normal')}>Edit Idea</Text>
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              style={{padding: 16}}
              onPress={() => {
                refRBSheetAction.current.close();
                navigation.navigate('EditIdea', {
                  ideaId: selectedIdea.id,
                  allowJoin: selectedIdea.allowJoin,
                  userToken: route.params?.userToken,
                  ideaDataList: ideaDataList,
                  indexSection: 3,
                });
              }}>
              <Text style={styles.buttonText('normal')}>Remove Member</Text>
            </TouchableOpacity>
          </View>
          <Gap height={8} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{padding: 16}}
              onPress={() => {
                refRBSheetAction.current.close();
                setModalDeleteIdeaVisible(true);
              }}>
              <Text style={styles.buttonText('danger')}>Delete Idea</Text>
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

      <LoadingProcessFull visible={loading.visible} message={loading.message} />
      <RefreshFull
        visible={showRefreshBUtton}
        onPress={() => {
          setShowRefreshButton(false);
          fetchSubmittedIdea();
        }}
        onOffsetTouch={() => navigation.goBack()}
      />

      {/* Modal delete idea action */}
      <ModalAction
        visible={modalDeleteIdeaVisible}
        title="Delete Idea"
        onCloseButtonPress={() => {
          setModalDeleteIdeaVisible(false);
          setDeleteIdeaMessage('');
        }}
        onRequestClose={() => {
          setModalDeleteIdeaVisible(false);
          setDeleteIdeaMessage('');
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
              delete
            </Text>{' '}
            your idea?{' '}
            <Text
              style={{
                ...styles.noticeText,
                fontFamily: fonts.secondary[700],
              }}>
              {selectedIdea?.desc[0].value}
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
              setDeleteIdeaMessage(text);
            }}>
            <Text style={{lineHeight: 20}}>{deleteIdeaMessage}</Text>
          </TextInput>
        </View>
        <Gap height={16} />
        <EditActionButton
          disableSaveButton={deleteIdeaMessage.trim().length <= 0}
          onDiscardPress={() => {
            setModalDeleteIdeaVisible(false);
            setDeleteIdeaMessage('');
          }}
          onSavePress={() => {
            handleDeleteSubmittedIdea();
          }}
        />
      </ModalAction>
      {/* modal success delete idea message */}
      <ModalMessage
        visible={messageSuccessDeleteIdeaModalVisible}
        withIllustration
        illustrationType="confused"
        title="You’re all done"
        message={
          <Text>
            You have <Text style={{color: colors.reject}}>deleted</Text> your
            Idea
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessDeleteIdeaModalVisible(false);
          fetchSubmittedIdea();
        }}
        onRequestClose={() => {
          setMessageSuccessDeleteIdeaModalVisible(false);
          fetchSubmittedIdea();
        }}
      />
    </View>
  );
};

export default SubmittedIdea;

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
    padding: 16,
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
