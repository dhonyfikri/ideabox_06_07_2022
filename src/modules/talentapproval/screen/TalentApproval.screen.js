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
import {IcFilter, IcSearch, IcTime} from '../../../assets/icon';
import CardTalentApproval from '../../../components/CardTalentApproval';
import FilterTalentApproval from '../../../components/FilterTalentApproval';
import Gap from '../../../components/Gap';
import Header from '../../../components/Header';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';
import {textToDate} from '../../../utils/DateConfig/DateConvert';

const TalentApproval = ({navigation, route}) => {
  const dataFromServer = [
    {
      id: 1,
      status: 'Approved',
      ideaId: 1,
      ideaName: 'Smart Bike',
      personId: 4,
      personName: 'Siti Bojong G.',
      activity: 'Request to Join Idea',
      requestDate: '22/12/2022, 12:00:01',
    },
    {
      id: 2,
      status: 'Rejected',
      ideaId: 1,
      ideaName: 'Smart Bike',
      personId: 6,
      personName: 'Tony Stark',
      activity: 'Request to Join Idea',
      requestDate: '23/12/2022, 13:00:01',
    },
    {
      id: 3,
      status: 'Pending',
      ideaId: 1,
      ideaName: 'Smart Bike',
      personId: 12,
      personName: 'Gusion.',
      activity: 'Request to Join Idea',
      requestDate: '21/12/2022, 14:00:01',
    },
    {
      id: 4,
      status: 'Pending',
      ideaId: 1,
      ideaName: 'Smart Bike',
      personId: 22,
      personName: 'Abinara',
      activity: 'Request to Join Idea',
      requestDate: '20/12/2022, 15:00:01',
    },
  ];

  const refRBSheetFilter = useRef();

  const [talentApprovalRequest, setTalentApprovalRequest] =
    useState(dataFromServer);
  const [talentApprovalToShow, setTalentApprovalToShow] =
    useState(dataFromServer);
  const [searchText, setSearchText] = useState('');
  const [pendingClicked, setPendingClicked] = useState(false);
  const [filterByStatusValue, setFilterByStatusValue] = useState([
    'approved',
    'rejected',
    'pending',
  ]);
  const [filterByDateValue, setFilterByDateValue] = useState('latest');
  const [onResume, setOnResume] = useState({status: true});

  let pendingRequestCount = 0;
  talentApprovalRequest.map(item => {
    if (item.status.toLowerCase() === 'pending') {
      pendingRequestCount += 1;
    }
  });

  const showOnlyPendingStatus = () => {
    const tempTalentApproval = [];
    talentApprovalRequest.map(item => {
      if (item.status.toLowerCase() === 'pending') {
        tempTalentApproval.push(item);
      }
    });
    setTalentApprovalToShow(tempTalentApproval);
  };

  const matchToSearch = () => {
    let tempTalentApproval = [];
    if (searchText === '') {
      tempTalentApproval = talentApprovalRequest;
    } else {
      talentApprovalRequest.map(item => {
        if (item.personName.toLowerCase().includes(searchText.toLowerCase())) {
          tempTalentApproval.push(item);
        }
      });
    }
    setTalentApprovalToShow(matchToFilter(tempTalentApproval));
  };

  const matchToFilter = value => {
    let tempTalentApproval = value.filter(item => {
      return filterByStatusValue.includes(item.status.toLowerCase());
    });
    if (filterByDateValue === 'latest') {
      tempTalentApproval.sort(function (a, b) {
        return (
          textToDate(b.requestDate.split(',')[0]) -
          textToDate(a.requestDate.split(',')[0])
        );
      });
    } else if (filterByDateValue === 'earliest') {
      tempTalentApproval.sort(function (a, b) {
        return (
          textToDate(a.requestDate.split(',')[0]) -
          textToDate(b.requestDate.split(',')[0])
        );
      });
    } else if (filterByDateValue === 'last modified') {
      tempTalentApproval.sort(function (a, b) {
        return (
          textToDate(b.requestDate.split(',')[0]) -
          textToDate(a.requestDate.split(',')[0])
        );
      });
    }
    return tempTalentApproval;
  };

  useEffect(() => {
    setTalentApprovalToShow(matchToFilter(talentApprovalRequest));
  }, [filterByStatusValue, filterByDateValue, talentApprovalRequest, onResume]);

  return (
    <View style={styles.page}>
      <Header
        backButton
        onBackPress={() => navigation.goBack()}
        backText="Back"
        title="Talent Approval"
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {pendingRequestCount > 0 && !pendingClicked ? (
          <>
            <TouchableOpacity
              style={styles.pendingNoticeButton}
              onPress={() => {
                setPendingClicked(true);
                showOnlyPendingStatus();
              }}>
              <IcTime />
              <Gap width={12} />
              <Text style={styles.pendingNoticeButtonText}>
                {pendingRequestCount} Pending
              </Text>
            </TouchableOpacity>
            <Gap height={16} />
          </>
        ) : (
          <></>
        )}
        <View style={styles.searchFilterWrapper}>
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
                setPendingClicked(false);
                matchToSearch();
              }}>
              <IcSearch />
            </TouchableOpacity>
          </View>
          <Gap width={4} />
          <TouchableOpacity onPress={() => refRBSheetFilter.current.open()}>
            <IcFilter />
          </TouchableOpacity>
        </View>
        <Gap height={16} />
        <FlatList
          data={talentApprovalToShow}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          inverted={false}
          renderItem={({item, index}) => {
            return (
              <>
                {index !== 0 && <Gap height={16} />}
                <CardTalentApproval
                  stateListLength={talentApprovalToShow.length}
                  raiseDelay={index}
                  personName={item.personName}
                  ideaName={item.ideaName}
                  activity={item.activity}
                  status={item.status}
                  requestDate={item.requestDate}
                  onViewPress={() =>
                    navigation.navigate('TalentApprovalAction', {
                      approvalData: item,
                    })
                  }
                />
              </>
            );
          }}
        />
      </ScrollView>
      {/* Bottom sheet filter */}
      <RBSheet
        ref={refRBSheetFilter}
        closeOnDragDown={true}
        closeOnPressMask={true}
        animationType="fade"
        height={550}
        dragFromTopOnly={false}
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
            <Text style={styles.bottomSheetTitle}>Filters</Text>
            <TouchableOpacity
              style={styles.cancelContainer}
              onPress={() => refRBSheetFilter.current.close()}>
              <Text style={styles.bottomSheetCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Gap height={16} />
          <FilterTalentApproval
            statusFilter={filterByStatusValue}
            dateFilter={filterByDateValue}
            onApply={(newStatusFilter, newDateFilter) => {
              setFilterByStatusValue(newStatusFilter);
              setFilterByDateValue(newDateFilter);
              setPendingClicked(false);
              setOnResume({status: true});
              refRBSheetFilter.current.close();
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
};

export default TalentApproval;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#FFFFFF'},
  searchFilterWrapper: {
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
  contentContainer: {
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
  cancelContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
