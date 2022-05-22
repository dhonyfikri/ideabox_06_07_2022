import {useBackHandler} from '@react-native-community/hooks';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CreateAdditionalAttachment from '../../../components/CreateAdditionalAttachment';
import CreateIdeaDescription from '../../../components/CreateIdeaDescription';
import CreateLeanCanvas from '../../../components/CreateLeanCanvas';
import CreateStoryBehind from '../../../components/CreateStoryBehind';
import CreateTeams from '../../../components/CreateTeams';
import Divider from '../../../components/Divider';
import Gap from '../../../components/Gap';
import Header from '../../../components/Header';
import ModalMessage from '../../../components/ModalMessage';
import {colors} from '../../../utils/ColorsConfig/Colors';
import fonts from '../../../utils/FontsConfig/Fonts';

const CreateIdeaStep = ({navigation, route}) => {
  const onNextCreateIdeaDescriptionReff = useRef(null);
  const onNextCreateStoryBehindReff = useRef(null);
  const onNextCreateLeanCanvasReff = useRef(null);
  const onNextCreateTeamsReff = useRef(null);
  const onNextCreateAdditionalAttachmentReff = useRef(null);
  const stepSessionRef = useRef(null);
  const formSessionRef = useRef(null);
  const [eachFormSessionHeight, setEachFormSessionHeight] = useState([
    0, 0, 0, 0, 0,
  ]);
  const [eachFormSessionCompleted, setEachFormSessionCompleted] = useState([
    false,
    false,
    false,
    false,
    true,
  ]);
  const [indexActive, setIndexActive] = useState(0);
  const [contentMounted, setContentMounted] = useState(false);
  const [submittedIdea, setSubmittedIdea] = useState(false);
  const [edited, setEdited] = useState(false);
  const [
    messageDiscardCreateModalVisible,
    setMessageDiscardCreateModalVisible,
  ] = useState(false);
  const [
    messageOpenNotificationRequestModalVisible,
    setMessageOpenNotificationRequestModalVisible,
  ] = useState(false);
  const [messageSuccessModalVisible, setMessageSuccessModalVisible] =
    useState(false);

  const [idea, setIdea] = useState({
    ideaDescription: {
      title: '',
      cover: null,
      category: null,
      description: '',
      allowToJoin: true,
    },
    storyBehind: {
      why: '',
      how: '',
      what: '',
    },
    leanCanvas: {
      customer: [],
      problem: [],
      earlyAdopter: [],
      existingSolution: [],
      uniqueValue: [],
      proposedSolution: '',
    },
    teams: [
      {name: '', nik: '', teamStructure: '', workingLocation: '', unit: ''},
    ],
    attachment: [],
  });

  const stepSession = [
    {key: '1', title: 'Idea Description', mandatory: true},
    {key: '1.5', title: ''},
    {key: '2', title: 'Story Behind', mandatory: true},
    {key: '2.5', title: ''},
    {key: '3', title: 'Lean Canvas', mandatory: true},
    {key: '3.5', title: ''},
    {key: '4', title: 'Teams', mandatory: true},
    {key: '4.5', title: ''},
    {key: '5', title: 'Additional Attachment', mandatory: false},
  ];

  const formSession = [
    {key: '1'},
    {key: '2'},
    {key: '3'},
    {key: '4'},
    {key: '5'},
  ];

  const formFieldConpletingHandler = (index, isCompleted) => {
    if (eachFormSessionCompleted[index] !== isCompleted) {
      let tempEachFormSessionCompleted = [...eachFormSessionCompleted];
      tempEachFormSessionCompleted[index] = isCompleted;
      setEachFormSessionCompleted(tempEachFormSessionCompleted);
    }
  };

  const cancelCreateIdea = () => {
    if (edited) {
      setMessageDiscardCreateModalVisible(true);
    } else {
      navigation.goBack();
    }
  };

  useBackHandler(() => {
    cancelCreateIdea();
    return true;
  });

  useEffect(() => {
    stepSessionRef.current?.scrollToIndex({
      index: indexActive * 2,
      animated: true,
      viewOffset: 0,
      viewPosition: 0.5,
    });
    formSessionRef.current?.scrollToIndex({
      index: indexActive,
      animated: true,
      viewOffset: 0,
      viewPosition: 0.5,
    });
  }, [indexActive, contentMounted]);

  useEffect(() => {
    if (submittedIdea) {
      console.log(idea);
      setMessageSuccessModalVisible(true);
    }
  }, [submittedIdea]);

  return (
    <View style={styles.page}>
      <Header
        backButton
        onBackPress={() => cancelCreateIdea()}
        backText="Back"
        onNotificationPress={() => {
          if (edited) {
            setMessageOpenNotificationRequestModalVisible(true);
          } else {
            navigation.replace('Notification');
          }
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Gap height={16} />
          <FlatList
            ref={stepSessionRef}
            data={stepSession}
            keyExtractor={item => item.key}
            initialScrollIndex={indexActive * 2}
            scrollEnabled={false}
            // onContentSizeChange={() => {
            //   if (!contentMounted) {
            //     setContentMounted(true);
            //   }
            // }}
            contentContainerStyle={{
              paddingHorizontal: Dimensions.get('screen').width,
              height: 32,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({item, index}) => {
              return (
                <View style={styles.indicatorStepItemWrapper}>
                  {item.title === '' ? (
                    <Divider
                      width={24}
                      lineColors={colors.text.primary}
                      marginVertical={0}
                    />
                  ) : (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={styles.indicatorStepNumberContainer(
                          index === indexActive * 2,
                        )}>
                        <Text
                          style={styles.indicatorStepNumberText(
                            index === indexActive * 2,
                          )}>
                          {item.key}
                        </Text>
                      </View>
                      <Gap width={8} />
                      <Text
                        style={styles.indicatorStepTitle(
                          index === indexActive * 2,
                        )}>
                        {item.title}{' '}
                        {item.mandatory && (
                          <Text style={{color: colors.alert}}>*</Text>
                        )}
                      </Text>
                    </View>
                  )}
                </View>
              );
            }}
          />
          <Gap height={16} />
          <FlatList
            ref={formSessionRef}
            data={formSession}
            keyExtractor={item => item.key}
            initialScrollIndex={indexActive}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingHorizontal: Dimensions.get('screen').width,
              height: eachFormSessionHeight[indexActive],
            }}
            onContentSizeChange={() => {
              if (!contentMounted) {
                setContentMounted(true);
              }
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({item, index}) => {
              return (
                <ScrollView
                  onContentSizeChange={(_, height) => {
                    const _eachSessionHeight = [...eachFormSessionHeight];
                    _eachSessionHeight[index] = height;
                    setEachFormSessionHeight(_eachSessionHeight);
                  }}>
                  {item.key === '1' && (
                    <View style={styles.sessionComponentWrapper}>
                      <CreateIdeaDescription
                        onNextReff={onNextCreateIdeaDescriptionReff}
                        onEdited={() => {
                          if (!edited) {
                            setEdited(true);
                          }
                        }}
                        onUpdate={isCompleted => {
                          formFieldConpletingHandler(index, isCompleted);
                        }}
                        onNextRequest={newIdeaDescription => {
                          setIdea({
                            ...idea,
                            ideaDescription: newIdeaDescription,
                          });
                        }}
                      />
                    </View>
                  )}
                  {item.key === '2' && (
                    <View style={styles.sessionComponentWrapper}>
                      <CreateStoryBehind
                        onNextReff={onNextCreateStoryBehindReff}
                        onUpdate={isCompleted => {
                          formFieldConpletingHandler(index, isCompleted);
                        }}
                        onNextRequest={newStoryBehind => {
                          setIdea({
                            ...idea,
                            storyBehind: newStoryBehind,
                          });
                        }}
                      />
                    </View>
                  )}
                  {item.key === '3' && (
                    <View style={styles.sessionComponentWrapper}>
                      <CreateLeanCanvas
                        onNextReff={onNextCreateLeanCanvasReff}
                        onUpdate={isCompleted => {
                          formFieldConpletingHandler(index, isCompleted);
                        }}
                        onNextRequest={newLeanCanvas => {
                          setIdea({
                            ...idea,
                            leanCanvas: newLeanCanvas,
                          });
                        }}
                      />
                    </View>
                  )}
                  {item.key === '4' && (
                    <View style={styles.sessionComponentWrapper}>
                      <CreateTeams
                        onNextReff={onNextCreateTeamsReff}
                        onUpdate={isCompleted => {
                          formFieldConpletingHandler(index, isCompleted);
                        }}
                        onNextRequest={newTeams => {
                          setIdea({
                            ...idea,
                            teams: newTeams,
                          });
                        }}
                      />
                    </View>
                  )}
                  {item.key === '5' && (
                    <View style={styles.sessionComponentWrapper}>
                      <CreateAdditionalAttachment
                        onNextReff={onNextCreateAdditionalAttachmentReff}
                        onUpdate={isCompleted => {
                          formFieldConpletingHandler(index, isCompleted);
                        }}
                        onNextRequest={newAttachment => {
                          setIdea({
                            ...idea,
                            attachment: newAttachment,
                          });
                        }}
                      />
                    </View>
                  )}
                </ScrollView>
              );
            }}
          />
          <Gap height={16} />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.actionButtonContainer}>
        <TouchableOpacity
          style={styles.actionButton('previous')}
          onPress={() => {
            if (indexActive <= 0) {
              cancelCreateIdea();
            } else {
              setIndexActive(indexActive - 1);
            }
          }}>
          <Text style={styles.actionButtonText('previous')}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton(
            eachFormSessionCompleted[indexActive] ? 'next' : 'nextDisabled',
          )}
          disabled={!eachFormSessionCompleted[indexActive]}
          onPress={() => {
            if (indexActive === 0) {
              onNextCreateIdeaDescriptionReff.current();
            } else if (indexActive === 1) {
              onNextCreateStoryBehindReff.current();
            } else if (indexActive === 2) {
              onNextCreateLeanCanvasReff.current();
            } else if (indexActive === 3) {
              onNextCreateTeamsReff.current();
            } else if (indexActive === 4) {
              onNextCreateAdditionalAttachmentReff.current();
            }
            if (indexActive < formSession.length - 1) {
              setIndexActive(indexActive + 1);
            } else {
              setSubmittedIdea(true);
            }
          }}>
          <Text style={styles.actionButtonText('next')}>
            {indexActive < 4 ? 'Next' : 'Finish'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* modal discard confirmation message */}
      <ModalMessage
        visible={messageDiscardCreateModalVisible}
        withIllustration
        illustrationType="confused"
        message={
          <Text
            style={{
              ...styles.customWarningMessageStyle,
              color: colors.text.primary,
            }}>
            Are you sure want to{' '}
            <Text style={styles.customWarningMessageStyle}>
              leave this page
            </Text>
            ? You will lose all unsaved progress.
          </Text>
        }
        withCancelButton
        withConfirmButton
        onCancel={() => setMessageDiscardCreateModalVisible(false)}
        onConfirm={() => {
          setMessageDiscardCreateModalVisible(false);
          navigation.goBack();
        }}
        onRequestClose={() => setMessageDiscardCreateModalVisible(false)}
      />

      {/* modal open notification request message */}
      <ModalMessage
        visible={messageOpenNotificationRequestModalVisible}
        withIllustration
        illustrationType="confused"
        message={
          <Text
            style={{
              ...styles.customWarningMessageStyle,
              color: colors.text.primary,
            }}>
            Are you sure want to{' '}
            <Text style={styles.customWarningMessageStyle}>
              leave this page
            </Text>
            ? You will lose all unsaved progress.
          </Text>
        }
        withCancelButton
        withConfirmButton
        onCancel={() => setMessageOpenNotificationRequestModalVisible(false)}
        onConfirm={() => {
          setMessageOpenNotificationRequestModalVisible(false);
          navigation.replace('Notification');
        }}
        onRequestClose={() =>
          setMessageOpenNotificationRequestModalVisible(false)
        }
      />

      {/* modal success message */}
      <ModalMessage
        visible={messageSuccessModalVisible}
        withIllustration
        illustrationType="smile"
        title="Success"
        message={
          <Text
            style={{
              ...styles.customSuccessMessageStyle,
              color: colors.text.primary,
            }}>
            You have{' '}
            <Text style={styles.customSuccessMessageStyle}>submitted</Text>{' '}
            about yourself!
          </Text>
        }
        withBackButton
        onBack={() => {
          setMessageSuccessModalVisible(false);
          navigation.goBack();
        }}
        onRequestClose={() => {
          setMessageSuccessModalVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default CreateIdeaStep;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: 'white'},
  indicatorStepItemWrapper: {
    paddingHorizontal: 6,
    justifyContent: 'center',
  },
  indicatorStepNumberContainer: active => ({
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: active ? colors.primary : '#00000000',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  indicatorStepNumberText: active => ({
    color: active ? colors.white : colors.primary,
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 22,
  }),
  indicatorStepTitle: active => ({
    color: active ? colors.text.primary : colors.text.tertiary,
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
  }),
  sessionComponentWrapper: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 16,
  },
  actionButtonContainer: {
    height: 76,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: (type = 'next') => ({
    width: 102,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: type === 'previous' ? 1 : 0,
    borderColor: type === 'nextDisabled' ? colors.border : colors.primary,
    borderRadius: 100,
    backgroundColor:
      type === 'previous'
        ? colors.white
        : type === 'next'
        ? colors.primary
        : 'nextDisabled'
        ? colors.border
        : colors.primary,
  }),
  actionButtonText: (type = 'next') => ({
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color:
      type === 'previous'
        ? colors.primary
        : type === 'next'
        ? colors.white
        : 'nextDisabled'
        ? colors.white
        : colors.white,
  }),
  customSuccessMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.success,
  },
  customWarningMessageStyle: {
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    color: colors.danger,
  },
});
