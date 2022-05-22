import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import fonts from '../utils/FontsConfig/Fonts';
import {colors} from '../utils/ColorsConfig/Colors';
import Gap from './Gap';
import {Divider} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const CheckBoxItem = ({title, isHeader, isChecked, onPress = () => {}}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          flex: 1,
          fontFamily: isHeader ? fonts.secondary[600] : fonts.secondary[400],
          fontSize: 14,
          lineHeight: 17,
          color: colors.text.primary,
        }}>
        {title}
      </Text>
      <Gap width={8} />
      <BouncyCheckbox
        size={20}
        fillColor={colors.primary}
        unfillColor={colors.white}
        disableBuiltInState
        iconStyle={{
          borderColor: isChecked ? colors.primary : colors.divider,
          borderRadius: 6,
          marginRight: -15,
        }}
        onPress={() => onPress(title.toLowerCase())}
        isChecked={isChecked}
        style={{
          marginRight: 0,
          alignSelf: 'flex-end',
        }}
      />
    </View>
  );
};

const RadioButtonItem = ({title, isHeader, valueState, onPress = () => {}}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          flex: 1,
          fontFamily: isHeader ? fonts.secondary[600] : fonts.secondary[400],
          fontSize: 14,
          lineHeight: 17,
          color: colors.text.primary,
        }}>
        {title}
      </Text>
      <Gap width={8} />
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: 20,
          height: 20,
          backgroundColor:
            valueState.toLowerCase() === title.toLowerCase()
              ? colors.primary
              : '#00000000',
          borderWidth: 1,
          borderColor: colors.divider,
          borderRadius: 20 / 2,
        }}
        onPress={() => onPress(title.toLowerCase())}
      />
    </View>
  );
};

const FilterTalentApproval = ({
  statusFilter = [],
  dateFilter = '',
  onApply = () => {},
}) => {
  const statusFilterItem = ['Approved', 'Rejected', 'Pending'];
  const dateFilterItem = ['Latest', 'Earliest', 'Last Modified'];

  const [filterByStatusValue, setFilterByStatusValue] = useState(statusFilter);
  const [filterByDateValue, setFilterByDateValue] = useState(dateFilter);

  const handleFilterByStatusChange = val => {
    const value = val.toLowerCase();
    const tempFilterByStatusValue = [...filterByStatusValue];
    if (value === 'all') {
      if (filterByStatusValue.length !== statusFilterItem.length) {
        setFilterByStatusValue(['approved', 'rejected', 'pending']);
      } else {
        setFilterByStatusValue([]);
      }
    } else {
      if (tempFilterByStatusValue.includes(value)) {
        const afterRemoveValue = tempFilterByStatusValue.filter(item => {
          return item !== value;
        });
        setFilterByStatusValue(afterRemoveValue);
      } else {
        tempFilterByStatusValue.push(value);
        setFilterByStatusValue(tempFilterByStatusValue);
      }
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* filter by status */}
        <Text style={styles.sparatorTitle}>By Status</Text>
        <Text style={styles.sparatorDesc}>You can select multiple options</Text>
        <Divider />
        <Gap height={12} />
        <CheckBoxItem
          title="All"
          isHeader
          isChecked={filterByStatusValue.length === statusFilterItem.length}
          onPress={value => handleFilterByStatusChange(value)}
        />
        <Gap height={12} />
        {statusFilterItem.map((item, index) => {
          return (
            <View key={index.toString()}>
              <CheckBoxItem
                title={item}
                isChecked={filterByStatusValue.includes(item.toLowerCase())}
                onPress={value => handleFilterByStatusChange(value)}
              />
              <Gap height={12} />
            </View>
          );
        })}
        <Gap height={20} />
        {/* filter by date */}
        <Text style={styles.sparatorTitle}>By Date</Text>
        <Text style={styles.sparatorDesc}>You can only select one option</Text>
        <Divider />
        <Gap height={12} />
        {dateFilterItem.map((item, index) => {
          return (
            <View key={index.toString()}>
              <RadioButtonItem
                title={item}
                isHeader={index === 0}
                valueState={filterByDateValue}
                onPress={value => setFilterByDateValue(value)}
              />
              <Gap height={14} />
            </View>
          );
        })}
      </ScrollView>
      <Divider />
      <Gap height={16} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
          }}
          onPress={() => {
            setFilterByStatusValue(
              statusFilterItem.map(item => item.toLowerCase()),
            );
            setFilterByDateValue('latest');
          }}>
          <Text
            style={{
              fontFamily: fonts.secondary[500],
              fontSize: 11,
              lineHeight: 12.89,
              color: colors.danger,
            }}>
            Clear all filters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 8,
            paddingHorizontal: 24,
            backgroundColor: colors.primary,
            borderRadius: 16,
          }}
          onPress={() => onApply(filterByStatusValue, filterByDateValue)}>
          <Text
            style={{
              fontFamily: fonts.secondary[600],
              fontSize: 12,
              lineHeight: 15,
              color: colors.white,
            }}>
            Apply
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FilterTalentApproval;

const styles = StyleSheet.create({
  sparatorTitle: {
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    lineHeight: 25.6,
    color: colors.text.primary,
    marginBottom: 4,
  },
  sparatorDesc: {
    fontFamily: fonts.secondary[300],
    fontSize: 12,
    lineHeight: 15,
    color: colors.text.tertiary2,
    marginBottom: 12,
  },
});
