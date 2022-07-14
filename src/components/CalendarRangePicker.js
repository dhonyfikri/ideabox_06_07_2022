import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcCalendarOrange, IcChevronDownOrange} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from './Gap';
import DateTimePicker from '@react-native-community/datetimepicker';
import {dateToText, textToDate} from '../utils/DateConfig/DateConvert';

const CalendarRangePicker = ({
  actualDateFilter = {start: 'Unlimited', end: 'Unlimited'},
  onClick,
  showRangePicker,
  onDiscard,
  onSave = () => {},
}) => {
  const [currentDateFilter, setCurrentDateFilter] = useState(actualDateFilter);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (event.type === 'set') {
      const currentDate = selectedDate;

      const tempDate = new Date(currentDate);
      const fullDate = dateToText(tempDate);

      setCurrentDateFilter({...currentDateFilter, start: fullDate});
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (event.type === 'set') {
      const currentDate = selectedDate;

      const tempDate = new Date(currentDate);
      const fullDate = dateToText(tempDate);

      setCurrentDateFilter({...currentDateFilter, end: fullDate});
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={onClick} style={styles.dateCard}>
          <IcCalendarOrange />
          <Text style={styles.dateCardText}>
            {currentDateFilter.start} - {currentDateFilter.end}
          </Text>
          <IcChevronDownOrange />
        </TouchableOpacity>
        {showRangePicker && (
          <>
            <Gap height={16} />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.startAndEndCard}>
                <Text style={styles.startAndEndCardTitle}>Start Date</Text>
                <View style={styles.tempDateContainer}>
                  <Text numberOfLines={1} style={styles.tempDateText}>
                    {currentDateFilter.start}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.pickButton}
                  onPress={() => setShowStartDatePicker(true)}>
                  <Text style={styles.pickAndUnlimitedButtonText}>Pick</Text>
                </TouchableOpacity>
                <Gap height={8} />
                <TouchableOpacity
                  style={styles.unlimitedButton}
                  onPress={() =>
                    setCurrentDateFilter({
                      ...currentDateFilter,
                      start: 'Unlimited',
                    })
                  }>
                  <Text style={styles.pickAndUnlimitedButtonText}>
                    Set Unlimited
                  </Text>
                </TouchableOpacity>
              </View>
              <Gap width={12} />
              <View style={styles.startAndEndCard}>
                <Text style={styles.startAndEndCardTitle}>End Date</Text>
                <View style={styles.tempDateContainer}>
                  <Text numberOfLines={1} style={styles.tempDateText}>
                    {currentDateFilter.end}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.pickButton}
                  onPress={() => setShowEndDatePicker(true)}>
                  <Text style={styles.pickAndUnlimitedButtonText}>Pick</Text>
                </TouchableOpacity>
                <Gap height={8} />
                <TouchableOpacity
                  style={styles.unlimitedButton}
                  onPress={() =>
                    setCurrentDateFilter({
                      ...currentDateFilter,
                      end: 'Unlimited',
                    })
                  }>
                  <Text style={styles.pickAndUnlimitedButtonText}>
                    Set Unlimited
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      </View>
      <Gap height={16} />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={styles.actionButton('discard')}
          onPress={onDiscard}>
          <Text style={styles.actionButtonText('discard')}>Discard</Text>
        </TouchableOpacity>
        <Gap width={16} />
        <TouchableOpacity
          style={styles.actionButton('save')}
          onPress={() => onSave(currentDateFilter)}>
          <Text style={styles.actionButtonText('save')}>Save</Text>
        </TouchableOpacity>
      </View>
      {showStartDatePicker && (
        <DateTimePicker
          maximumDate={
            currentDateFilter.end !== 'Unlimited'
              ? textToDate(currentDateFilter.end)
              : null
          }
          testID="dateTimePicker"
          value={
            currentDateFilter.start !== 'Unlimited'
              ? textToDate(currentDateFilter.start)
              : new Date()
          }
          mode="date"
          display="calendar"
          onChange={onStartDateChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          minimumDate={
            currentDateFilter.start !== 'Unlimited'
              ? textToDate(currentDateFilter.start)
              : null
          }
          testID="dateTimePicker"
          value={
            currentDateFilter.end !== 'Unlimited'
              ? textToDate(currentDateFilter.end)
              : new Date()
          }
          mode="date"
          display="calendar"
          onChange={onEndDateChange}
        />
      )}
    </View>
  );
};

export default CalendarRangePicker;

const styles = StyleSheet.create({
  dateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },
  dateCardText: {
    flex: 1,
    marginHorizontal: 8,
    textAlign: 'center',
    fontFamily: fonts.primary[400],
    fontSize: 14,
    lineHeight: 22,
    color: colors.text.secondary,
  },
  startAndEndCard: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.dot,
    borderRadius: 8,
    elevation: 4,
  },
  startAndEndCardTitle: {
    textAlign: 'center',
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    color: colors.primary,
  },
  tempDateContainer: {
    paddingVertical: 16,
    backgroundColor: colors.white,
    marginVertical: 16,
    borderRadius: 8,
  },
  tempDateText: {
    textAlign: 'center',
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    color: colors.text.tertiary,
  },
  pickButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  pickAndUnlimitedButtonText: {
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.secondary[400],
  },
  unlimitedButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.success,
    borderRadius: 8,
  },
  actionButton: type => ({
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 100,
    backgroundColor: type === 'save' ? colors.primary : '#00000000',
  }),
  actionButtonText: type => ({
    textAlign: 'center',
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    lineHeight: 20,
    color: type === 'save' ? colors.white : colors.primary,
  }),
});
