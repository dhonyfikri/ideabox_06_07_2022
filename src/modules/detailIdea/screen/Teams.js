import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import CardDetailTeamDesc from '../../../components/CardDetailTeamsDesc';
import React from 'react';

const Teams = () => {
  const stateGlobal = useSelector(state => state);

  return (
    <View style={styles.page}>
      <View style={styles.titleContent}>
        <View style={styles.email}>
          <Text>No</Text>
        </View>
        <View style={styles.title}>
          <Text>Nama</Text>
        </View>
        <View style={styles.title}>
          <Text>NIP</Text>
        </View>
        <View style={styles.title}>
          <Text>CFU/FU</Text>
        </View>
      </View>
      <ScrollView>
        {stateGlobal.detailIdea?.approval.map((val, index) => {
          return (
            <CardDetailTeamDesc
              number={index + 1}
              name={val.approvalTo.name}
              nip={val.approvalTo.nik}
              cfu={val.approvalTo.cfufuName}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Teams;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#EBEFF5',
    borderRadius: 10,
  },
  titleContent: {
    flexDirection: 'row',
  },
  email: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 2,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
