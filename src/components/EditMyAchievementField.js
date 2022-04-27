import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import {IcCalendar} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import {dateToText, textToDate} from '../utils/DateConfig/DateConvert';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';

const EditMyAchievementField = ({
  title,
  desc,
  issueDate,
  onTitleChange = () => {},
  onDescChange = () => {},
  onDateChange = () => {},
}) => {
  const date =
    issueDate === undefined
      ? new Date()
      : issueDate === ''
      ? new Date()
      : textToDate(issueDate);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const _onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === 'set') {
      const currentDate = selectedDate || date;

      const tempDate = new Date(currentDate);
      const fullDate = dateToText(tempDate);

      onDateChange(fullDate);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={{opacity: fadeAnim}}>
      <Text
        style={{
          fontFamily: fonts.secondary[400],
          fontSize: 12,
          lineHeight: 15,
          color: colors.text.primary,
        }}>
        Title
      </Text>
      <Gap height={8} />
      <TextInput
        style={{
          paddingVertical: 0,
          paddingHorizontal: 12,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 32,
          fontFamily: fonts.secondary[400],
          fontSize: 12,
          color: colors.text.primary,
        }}
        placeholder="Input Title"
        onChangeText={newTitle => onTitleChange(newTitle)}>
        <Text style={{lineHeight: 15}}>{title}</Text>
      </TextInput>
      <Gap height={12} />
      <Text
        style={{
          fontFamily: fonts.secondary[400],
          fontSize: 12,
          lineHeight: 15,
          color: colors.text.primary,
        }}>
        Issue Date
      </Text>
      <Gap height={8} />
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 32,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingVertical: 6,
            paddingHorizontal: 12,
            alignItems: 'center',
          }}
          onPress={() => {
            !showDatePicker && setShowDatePicker(true);
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.secondary[400],
              fontSize: 12,
              lineHeight: 15,
              color: colors.text.primary,
            }}>
            {issueDate}
          </Text>
          <Gap width={4} />
          <IcCalendar />
        </TouchableOpacity>
      </View>
      {/* <Gap height={18} /> */}
      {/* <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 32,
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingVertical: 6,
            paddingHorizontal: 12,
            alignItems: 'center',
          }}>
          <Text
            style={{
              flex: 1,
              fontFamily: fonts.secondary[400],
              fontSize: 12,
              lineHeight: 15,
              color: colors.text.primary,
            }}>
            2022
          </Text>
          <Gap width={4} />
          <IcCalendar />
        </TouchableOpacity>
      </View> */}
      <Gap height={12} />
      <Text
        style={{
          fontFamily: fonts.secondary[400],
          fontSize: 12,
          lineHeight: 15,
          color: colors.text.primary,
        }}>
        description
      </Text>
      <Gap height={8} />
      <TextInput
        multiline
        textAlignVertical="top"
        style={styles.board}
        onChangeText={newDesc => onDescChange(newDesc)}>
        <Text
          style={{
            lineHeight: 22,
          }}>
          {desc}
        </Text>
      </TextInput>
      <Gap height={12} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="calendar"
          onChange={_onDateChange}
        />
      )}
    </Animated.View>
  );
};

export default EditMyAchievementField;

const styles = StyleSheet.create({
  board: {
    height: 106,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 12,
    fontFamily: fonts.primary[400],
    fontSize: 12,
    color: colors.text.tertiary,
  },
});
