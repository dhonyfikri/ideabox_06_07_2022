import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcOutlinedAdd, IcOutlinedRemove} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import BoardTextInput from './BoardTextInput';
import CardCreateIdeaSession from './CardCreateIdeaSession';
import Gap from './Gap';

const EditLeanCanvas = ({
  customer,
  problem,
  earlyAdopter,
  existingSolution,
  uniqueValue,
  proposedSolution,
  onLeanCanvasChange = () => {},
  onProposedSolutionChange = () => {},
}) => {
  const [customerInput, setCustomerInput] = useState('');
  const [problemInput, setProblemInput] = useState('');
  const [earlyAdopterInput, setEarlyAdopterInput] = useState('');
  const [existingSolutionInput, setExistingSolutionInput] = useState('');
  const [uniqueValueInput, setUniqueValueInput] = useState('');

  return (
    <CardCreateIdeaSession title="Lean Canvas" mandatory>
      <Text style={styles.fieldTitle}>
        CUSTOMER, who do you want to solve?
        <Text style={{color: colors.alert}}>*</Text>
      </Text>
      <View style={styles.singleLineInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter here"
          value={customerInput}
          onChangeText={text => {
            setCustomerInput(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonSingleLineInput(true)}
          onPress={() => {
            if (customerInput.trim() !== '') {
              onLeanCanvasChange('add', 'customer', customerInput);
              setCustomerInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={customer}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginHorizontal: 16}}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}>
                  <View style={styles.leanCanvasItemTextContainer}>
                    <Text style={styles.leanCanvasItemText}>{item.value}</Text>
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    onLeanCanvasChange('remove', item.field, item.value);
                  }}>
                  <IcOutlinedRemove />
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
      <Text style={styles.fieldTitle}>
        PROBLEM, what problem do they want to solve?
        <Text style={{color: colors.alert}}>*</Text>
      </Text>
      <View style={styles.singleLineInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter here"
          value={problemInput}
          onChangeText={text => {
            setProblemInput(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonSingleLineInput(true)}
          onPress={() => {
            if (problemInput.trim() !== '') {
              onLeanCanvasChange('add', 'problem', problemInput);
              setProblemInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={problem}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginHorizontal: 16}}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}>
                  <View style={styles.leanCanvasItemTextContainer}>
                    <Text style={styles.leanCanvasItemText}>{item.value}</Text>
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    onLeanCanvasChange('remove', item.field, item.value);
                  }}>
                  <IcOutlinedRemove />
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
      <Text style={styles.fieldTitle}>
        EARLY ADOPTER, Which of the targets above can you achieve first in the
        next 3 months?
        <Text style={{color: colors.alert}}>*</Text>
      </Text>
      <View style={styles.singleLineInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter here"
          value={earlyAdopterInput}
          onChangeText={text => {
            setEarlyAdopterInput(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonSingleLineInput(true)}
          onPress={() => {
            if (earlyAdopterInput.trim() !== '') {
              onLeanCanvasChange('add', 'earlyAdopter', earlyAdopterInput);
              setEarlyAdopterInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={earlyAdopter}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginHorizontal: 16}}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}>
                  <View style={styles.leanCanvasItemTextContainer}>
                    <Text style={styles.leanCanvasItemText}>{item.value}</Text>
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    onLeanCanvasChange('remove', item.field, item.value);
                  }}>
                  <IcOutlinedRemove />
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
      <Text style={styles.fieldTitle}>
        EXISTING SOLUTION, how do they usually solve those problems?
        <Text style={{color: colors.alert}}>*</Text>
      </Text>
      <View style={styles.singleLineInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter here"
          value={existingSolutionInput}
          onChangeText={text => {
            setExistingSolutionInput(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonSingleLineInput(true)}
          onPress={() => {
            if (existingSolutionInput.trim() !== '') {
              onLeanCanvasChange(
                'add',
                'existingSolution',
                existingSolutionInput,
              );
              setExistingSolutionInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={existingSolution}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginHorizontal: 16}}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}>
                  <View style={styles.leanCanvasItemTextContainer}>
                    <Text style={styles.leanCanvasItemText}>{item.value}</Text>
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    onLeanCanvasChange('remove', item.field, item.value);
                  }}>
                  <IcOutlinedRemove />
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
      <Text style={styles.fieldTitle}>
        UNIQUE VALUE, what makes you different and cool, so they want to move to
        you?
        <Text style={{color: colors.alert}}>*</Text>
      </Text>
      <View style={styles.singleLineInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter here"
          value={uniqueValueInput}
          onChangeText={text => {
            setUniqueValueInput(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonSingleLineInput(true)}
          onPress={() => {
            if (uniqueValueInput.trim() !== '') {
              onLeanCanvasChange('add', 'uniqueValue', uniqueValueInput);
              setUniqueValueInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={uniqueValue}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{marginHorizontal: 16}}
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}>
                  <View style={styles.leanCanvasItemTextContainer}>
                    <Text style={styles.leanCanvasItemText}>{item.value}</Text>
                  </View>
                </ScrollView>
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    onLeanCanvasChange('remove', item.field, item.value);
                  }}>
                  <IcOutlinedRemove />
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      />
      <Text style={styles.fieldTitle}>
        PROPOSED SOLUTION, So what are you going to do or are you doing so they
        can really love you?
        <Text style={{color: colors.alert}}>*</Text>
      </Text>
      <BoardTextInput
        text={proposedSolution[0]?.value}
        placeholder="(Max. 1000 Characters)"
        maxLength={1000}
        onChangeText={text => {
          onProposedSolutionChange(text);
        }}
      />
    </CardCreateIdeaSession>
  );
};

export default EditLeanCanvas;

const styles = StyleSheet.create({
  fieldTitle: {
    marginBottom: 8,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
  },
  singleLineInputContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 32,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 29,
    paddingVertical: 0,
    paddingHorizontal: 12,
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    lineHeight: 17,
    color: colors.text.primary,
  },
  leanCanvasItemTextContainer: {
    height: 29,
    justifyContent: 'center',
  },
  leanCanvasItemText: {
    paddingVertical: 0,
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    lineHeight: 17,
    color: colors.text.primary,
  },
  buttonSingleLineInput: addField => ({
    width: 72,
    height: 32,
    backgroundColor: addField ? colors.primary : colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
