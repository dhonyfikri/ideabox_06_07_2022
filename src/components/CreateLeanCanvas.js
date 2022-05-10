import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {IcOutlinedAdd, IcOutlinedRemove} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import CardCreateIdeaSession from './CardCreateIdeaSession';
import Gap from './Gap';

const CreateLeanCanvas = ({
  onNextReff,
  onUpdate = () => {},
  onNextRequest = () => {},
}) => {
  const [customerInput, setCustomerInput] = useState('');
  const [problemInput, setProblemInput] = useState('');
  const [earlyAdopterInput, setEarlyAdopterInput] = useState('');
  const [existingSolutionInput, setExistingSolutionInput] = useState('');
  const [uniqueValueInput, setUniqueValueInput] = useState('');

  const [leanCanvas, setLeanCanvas] = useState({
    customer: [],
    problem: [],
    earlyAdopter: [],
    existingSolution: [],
    uniqueValue: [],
    proposedSolution: '',
  });

  useEffect(() => {
    let isCompleted = false;
    if (
      leanCanvas.customer.length > 0 &&
      leanCanvas.problem.length > 0 &&
      leanCanvas.earlyAdopter.length > 0 &&
      leanCanvas.existingSolution.length > 0 &&
      leanCanvas.uniqueValue.length > 0 &&
      leanCanvas.proposedSolution !== ''
    ) {
      isCompleted = true;
    }
    onUpdate(isCompleted);
  }, [leanCanvas]);

  useEffect(() => {
    if (onNextReff !== undefined) {
      onNextReff.current = () => onNextRequest(leanCanvas);
    }
  }, [leanCanvas]);

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
              const tempLeanCanvas = {...leanCanvas};
              tempLeanCanvas.customer.push(customerInput.trim());
              setLeanCanvas(tempLeanCanvas);
              setCustomerInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={leanCanvas.customer}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={item}
                  placeholder="Enter here"
                  onChangeText={text => {
                    console.log(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    const tempLeanCanvas = {...leanCanvas};
                    tempLeanCanvas.customer.splice(index, 1);
                    setLeanCanvas(tempLeanCanvas);
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
              const tempLeanCanvas = {...leanCanvas};
              tempLeanCanvas.problem.push(problemInput.trim());
              setLeanCanvas(tempLeanCanvas);
              setProblemInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={leanCanvas.problem}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={item}
                  placeholder="Enter here"
                  onChangeText={text => {
                    console.log(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    const tempLeanCanvas = {...leanCanvas};
                    tempLeanCanvas.problem.splice(index, 1);
                    setLeanCanvas(tempLeanCanvas);
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
              const tempLeanCanvas = {...leanCanvas};
              tempLeanCanvas.earlyAdopter.push(earlyAdopterInput.trim());
              setLeanCanvas(tempLeanCanvas);
              setEarlyAdopterInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={leanCanvas.earlyAdopter}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={item}
                  placeholder="Enter here"
                  onChangeText={text => {
                    console.log(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    const tempLeanCanvas = {...leanCanvas};
                    tempLeanCanvas.earlyAdopter.splice(index, 1);
                    setLeanCanvas(tempLeanCanvas);
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
              const tempLeanCanvas = {...leanCanvas};
              tempLeanCanvas.existingSolution.push(
                existingSolutionInput.trim(),
              );
              setLeanCanvas(tempLeanCanvas);
              setExistingSolutionInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={leanCanvas.existingSolution}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={item}
                  placeholder="Enter here"
                  onChangeText={text => {
                    console.log(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    const tempLeanCanvas = {...leanCanvas};
                    tempLeanCanvas.existingSolution.splice(index, 1);
                    setLeanCanvas(tempLeanCanvas);
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
              const tempLeanCanvas = {...leanCanvas};
              tempLeanCanvas.uniqueValue.push(uniqueValueInput.trim());
              setLeanCanvas(tempLeanCanvas);
              setUniqueValueInput('');
            }
          }}>
          <IcOutlinedAdd />
        </TouchableOpacity>
      </View>
      <Gap height={16} />
      <FlatList
        data={leanCanvas.uniqueValue}
        keyExtractor={(_, index) => index.toString()}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        inverted
        renderItem={({item, index}) => {
          return (
            <>
              <Gap height={16} />
              <View style={styles.singleLineInputContainer}>
                <TextInput
                  style={styles.input}
                  editable={false}
                  value={item}
                  placeholder="Enter here"
                  onChangeText={text => {
                    console.log(text);
                  }}
                />
                <TouchableOpacity
                  style={styles.buttonSingleLineInput(false)}
                  onPress={() => {
                    const tempLeanCanvas = {...leanCanvas};
                    tempLeanCanvas.uniqueValue.splice(index, 1);
                    setLeanCanvas(tempLeanCanvas);
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
      <TextInput
        multiline
        placeholder="(Max. 100 Characters)"
        maxLength={100}
        textAlignVertical="top"
        autoComplete="off"
        autoCorrect={false}
        style={styles.board}
        onChangeText={text => {
          setLeanCanvas({...leanCanvas, proposedSolution: text});
        }}>
        <Text style={{lineHeight: 20}}>{leanCanvas.proposedSolution}</Text>
      </TextInput>
    </CardCreateIdeaSession>
  );
};

export default CreateLeanCanvas;

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
  buttonSingleLineInput: addField => ({
    width: 72,
    height: 32,
    backgroundColor: addField ? colors.primary : colors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  board: {
    height: 155,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 12,
    fontFamily: fonts.primary[400],
    fontSize: 16,
    color: colors.text.primary,
  },
});
