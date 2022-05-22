import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Header from '../../../components/Header';
import DummyResponseDetailIdea from '../../riset/DummyResponseDetailIdea';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';
import Gap from '../../../components/Gap';
import EditIdeaDescription from '../../../components/EditIdeaDescription';
import _ from 'lodash';
import EditStoryBehind from '../../../components/EditStoryBehind';
import EditLeanCanvas from '../../../components/EditLeanCanvas';
import EditTeams from '../../../components/EditTeams';
import EditAdditionalAttachment from '../../../components/EditAdditionalAttachment';
import ModalMessage from '../../../components/ModalMessage';

const EditIdea = ({navigation, route}) => {
  const ideaData = _.cloneDeep(DummyResponseDetailIdea);

  const stepSession = [
    'Idea Description',
    'Story Behind',
    'Lean Canvas',
    'Teams',
    'Additional Attachment',
  ];

  const stepSessionRef = useRef(null);

  const [activeIndexOfContent, setActiveIndexOfContent] = useState(0);
  const [currentIdeaData, setCurrentIdeaData] = useState(ideaData);
  const [isFlatlistMounted, setIsFlatlistMounted] = useState(false);
  const [edited, setEdited] = useState(false);
  const [messageDiscardEditModalVisible, setMessageDiscardEditModalVisible] =
    useState(false);
  const [
    messageSuccessUpdateIdeaModalVisible,
    setMessageSuccessUpdateIdeaModalVisible,
  ] = useState(false);

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

  const toggleActive = index => {
    if (activeIndexOfContent !== index) {
      setActiveIndexOfContent(index);
      handleFadeIn();
    }
  };

  const handleEdited = () => {
    if (!edited) {
      setEdited(true);
    }
  };

  const handleCompleted = () => {
    let completed = true;
    // idea description check
    if (
      currentIdeaData.desc[0].value.trim().length === 0 ||
      currentIdeaData.desc[1].value === null ||
      currentIdeaData.desc[2].value.trim().length === 0 ||
      currentIdeaData.categoryIdea.length === 0 ||
      currentIdeaData.allowJoin === null
    ) {
      completed = false;
    }
    // story behind check
    if (
      currentIdeaData.gc[0].value.trim().length === 0 ||
      currentIdeaData.gc[1].value.trim().length === 0 ||
      currentIdeaData.gc[2].value.trim().length === 0
    ) {
      completed = false;
    }
    // lean canvas check
    let customer = currentIdeaData.lc.filter(item => {
      return item.field === 'customer';
    });
    let problem = currentIdeaData.lc.filter(item => {
      return item.field === 'problem';
    });
    let earlyAdopter = currentIdeaData.lc.filter(item => {
      return item.field === 'earlyAdopter';
    });
    let existingSolution = currentIdeaData.lc.filter(item => {
      return item.field === 'existingSolution';
    });
    let uniqueValue = currentIdeaData.lc.filter(item => {
      return item.field === 'uniqueValue';
    });
    let proposedSolution = currentIdeaData.lc.filter(item => {
      return item.field === 'proposedSolution';
    });
    if (
      customer.length === 0 ||
      problem.length === 0 ||
      earlyAdopter.length === 0 ||
      existingSolution.length === 0 ||
      uniqueValue.length === 0 ||
      proposedSolution.length === 0 ||
      proposedSolution[0]?.value.trim().length === 0
    ) {
      completed = false;
    }
    // story behind check
    if (
      currentIdeaData.gc[0].value.trim().length === 0 ||
      currentIdeaData.gc[1].value.trim().length === 0 ||
      currentIdeaData.gc[2].value.trim().length === 0
    ) {
      completed = false;
    }
    // teams check (not necessary)
    // additional attachment check (not necessary)

    return completed && edited;
  };

  useEffect(() => {
    stepSessionRef.current?.scrollToIndex({
      index: activeIndexOfContent,
      animated: true,
      viewOffset: 0,
      viewPosition: 0.5,
    });
  }, [activeIndexOfContent, isFlatlistMounted]);

  useEffect(() => {
    if (route.params.indexSection !== undefined && isFlatlistMounted) {
      setActiveIndexOfContent(route.params.indexSection);
    }
  }, [route.params?.indexSection, isFlatlistMounted]);

  useEffect(() => {
    handleFadeIn();
  }, []);

  return (
    <View style={styles.page}>
      <Header
        backButton
        onBackPress={() => navigation.goBack()}
        backText="Back"
        title="Edit Idea"
        onNotificationPress={() => navigation.navigate('Notification')}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
          <Gap height={16} />
          <FlatList
            ref={stepSessionRef}
            data={stepSession}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}
            inverted={false}
            onContentSizeChange={() => {
              if (!isFlatlistMounted) {
                setIsFlatlistMounted(true);
              }
            }}
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  style={styles.tabContainer(
                    index === 0
                      ? 'start'
                      : index === stepSession.length - 1
                      ? 'end'
                      : 'middle',
                  )}>
                  <TouchableOpacity
                    style={styles.tabItem(activeIndexOfContent === index)}
                    onPress={() => toggleActive(index)}>
                    <Text
                      numberOfLines={2}
                      style={styles.tabTitle(activeIndexOfContent === index)}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <Animated.View style={{padding: 16, opacity: fadeAnim}}>
            {/* edit idea description */}
            {activeIndexOfContent === 0 && (
              <EditIdeaDescription
                ideaTitle={currentIdeaData.desc[0]?.value}
                ideaCover={
                  currentIdeaData.desc[1]?.value !== null
                    ? {uri: currentIdeaData.desc[1]?.value}
                    : null
                }
                ideaCategory={currentIdeaData.categoryIdea[0]?.name}
                ideaDesc={currentIdeaData.desc[2]?.value}
                allowToJoin={currentIdeaData.allowJoin === '1' ? true : false}
                onIdeaTitleChange={newTitle => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.desc[0].value = newTitle;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onIdeaCoverChange={newCover => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.desc[1].value = newCover;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onIdeaCategoryChange={newCategory => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.categoryIdea[0].name = newCategory;
                  setCurrentIdeaData(tempCurrentIdeaData);
                }}
                onDropdownValueChange={() => handleEdited()}
                onIdeaDescChange={newDesc => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.desc[2].value = newDesc;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onAllowToJoinChange={newAllowToJoin => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.allowJoin =
                    newAllowToJoin === true ? '1' : 0;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
              />
            )}
            {/* edit story behind */}
            {activeIndexOfContent === 1 && (
              <EditStoryBehind
                why={currentIdeaData.gc[0].value}
                how={currentIdeaData.gc[1].value}
                what={currentIdeaData.gc[2].value}
                onWhyChange={newWhy => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.gc[0].value = newWhy;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onHowChange={newHow => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.gc[1].value = newHow;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onWhatChange={newWhat => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.gc[2].value = newWhat;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
              />
            )}
            {/* edit story lean canvas */}
            {activeIndexOfContent === 2 && (
              <EditLeanCanvas
                customer={currentIdeaData.lc.filter(item => {
                  return item.field === 'customer';
                })}
                problem={currentIdeaData.lc.filter(item => {
                  return item.field === 'problem';
                })}
                earlyAdopter={currentIdeaData.lc.filter(item => {
                  return item.field === 'earlyAdopter';
                })}
                existingSolution={currentIdeaData.lc.filter(item => {
                  return item.field === 'existingSolution';
                })}
                uniqueValue={currentIdeaData.lc.filter(item => {
                  return item.field === 'uniqueValue';
                })}
                proposedSolution={currentIdeaData.lc.filter(item => {
                  return item.field === 'proposedSolution';
                })}
                onLeanCanvasChange={(type, field, value) => {
                  if (type === 'add') {
                    let tempCurrentIdeaData = {...currentIdeaData};
                    tempCurrentIdeaData.lc.push({field: field, value: value});
                    setCurrentIdeaData(tempCurrentIdeaData);
                    handleEdited();
                  } else if (type === 'remove') {
                    let tempCurrentIdeaData = {...currentIdeaData};
                    let tempLeanCanvas = tempCurrentIdeaData.lc.filter(item => {
                      return item.field !== field || item.value !== value;
                    });
                    tempCurrentIdeaData.lc = tempLeanCanvas;
                    setCurrentIdeaData(tempCurrentIdeaData);
                    handleEdited();
                  }
                }}
                onProposedSolutionChange={newProposedSolution => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  let tempLeanCanvas = tempCurrentIdeaData.lc.filter(item => {
                    return item.field !== 'proposedSolution';
                  });
                  tempCurrentIdeaData.lc = tempLeanCanvas;
                  tempCurrentIdeaData.lc.push({
                    field: 'proposedSolution',
                    value: newProposedSolution,
                  });
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
              />
            )}
            {/* edit teams */}
            {activeIndexOfContent === 3 && (
              <EditTeams
                isGuest={
                  route.params.isGuest === undefined
                    ? false
                    : route.params.isGuest
                }
                ideaName={DummyResponseDetailIdea.desc[0]?.value}
                teams={currentIdeaData.approval}
                onProfilePress={(person, id) => {
                  if (person === 'me') {
                    navigation.navigate('MyProfile', {
                      profileData: {
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
                      },
                      editable: false,
                    });
                  } else if (person === 'others') {
                    console.log('open profile with user id =', id);
                  }
                }}
                onTeamsRemoved={index => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.approval.splice(index, 1);
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onTeamsChange={(index, newName, newTeamStructure) => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.approval[index].approvalTo.name = newName;
                  tempCurrentIdeaData.approval[index].approvalTo.teamStructure =
                    newTeamStructure;
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onLeaveIdea={() => {
                  navigation.goBack();
                }}
              />
            )}
            {/* edit additional attachment */}
            {activeIndexOfContent === 4 && (
              <EditAdditionalAttachment
                attachment={currentIdeaData.additionalAttachment}
                onRemoveAttachment={index => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.additionalAttachment.splice(index, 1);
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
                onAddAttachment={newAttachment => {
                  let tempCurrentIdeaData = {...currentIdeaData};
                  tempCurrentIdeaData.additionalAttachment.push(newAttachment);
                  setCurrentIdeaData(tempCurrentIdeaData);
                  handleEdited();
                }}
              />
            )}
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton('discard')}
          onPress={() => {
            if (edited) {
              setMessageDiscardEditModalVisible(true);
            } else {
              navigation.goBack();
            }
          }}>
          <Text style={styles.actionButtonText('discard')}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton(
            handleCompleted() ? 'finish' : 'finishDisabled',
          )}
          disabled={!handleCompleted()}
          onPress={() => {
            setMessageSuccessUpdateIdeaModalVisible(true);
          }}>
          <Text style={styles.actionButtonText('finish')}>Finish</Text>
        </TouchableOpacity>
      </View>
      {/* modal discard confirmation message */}
      <ModalMessage
        visible={messageDiscardEditModalVisible}
        withIllustration
        illustrationType="confused"
        message={
          <Text>
            Are you sure want{' '}
            <Text style={{color: colors.pending}}>to leave this page</Text>? You
            will lose all unsaved progress.
          </Text>
        }
        withCancelButton
        withConfirmButton
        onCancel={() => setMessageDiscardEditModalVisible(false)}
        onConfirm={() => {
          setMessageDiscardEditModalVisible(false);
          navigation.goBack();
        }}
        onRequestClose={() => setMessageDiscardEditModalVisible(false)}
      />
      {/* modal success update idea message */}
      <ModalMessage
        visible={messageSuccessUpdateIdeaModalVisible}
        withIllustration
        illustrationType="smile"
        title="Success"
        message={
          <Text
            style={{...styles.customMessageStyle, color: colors.text.primary}}>
            You have <Text style={styles.customMessageStyle}>updated</Text> your
            Idea
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessUpdateIdeaModalVisible(false);
          navigation.goBack();
        }}
        onRequestClose={() => {
          setMessageSuccessUpdateIdeaModalVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default EditIdea;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#FFFFFF'},
  tabContainer: type => ({
    backgroundColor: colors.tertiary,
    paddingVertical: 4,
    paddingRight: type === 'end' ? 4 : 0,
    paddingLeft: type === 'start' ? 4 : 0,
    borderTopLeftRadius: type === 'start' ? 32 : 0,
    borderBottomLeftRadius: type === 'start' ? 32 : 0,
    borderTopRightRadius: type === 'end' ? 32 : 0,
    borderBottomRightRadius: type === 'end' ? 32 : 0,
    overflow: 'hidden',
  }),
  tabItem: active => ({
    flex: 1,
    backgroundColor: active ? colors.primary : '#00000000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 32,
    justifyContent: 'center',
  }),
  tabTitle: active => ({
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: active ? colors.white : colors.text.primary,
    textAlign: 'center',
  }),
  actionButtonContainer: {
    height: 76,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: (type = 'discard') => ({
    width: 102,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: type === 'discard' ? 1 : 0,
    borderColor: type === 'finishDisabled' ? colors.border : colors.primary,
    borderRadius: 100,
    backgroundColor:
      type === 'discard'
        ? colors.white
        : type === 'finish'
        ? colors.primary
        : 'finishDisabled'
        ? colors.border
        : colors.primary,
  }),
  actionButtonText: (type = 'discard') => ({
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color:
      type === 'discard'
        ? colors.primary
        : type === 'finish'
        ? colors.white
        : 'finishDisabled'
        ? colors.white
        : colors.white,
  }),
  customMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.success,
  },
});
