import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcAdd} from '../assets/icon';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import CardCreateIdeaSession from './CardCreateIdeaSession';
import CreateTeamsField from './CreateTeamsField';
import Gap from './Gap';

const CreateTeams = ({
  onNextReff,
  onUpdate = () => {},
  onNextRequest = () => {},
}) => {
  const [teams, setTeams] = useState([
    {name: '', nik: '', teamStructure: null, workingLocation: '', unit: ''},
  ]);

  useEffect(() => {
    let isCompleted = true;
    for (let i = 0; i < teams.length; i++) {
      if (
        teams[i].name === '' ||
        teams[i].nik === '' ||
        teams[i].teamStructure === null ||
        teams[i].workingLocation === '' ||
        teams[i].unit === ''
      ) {
        isCompleted = false;
        break;
      }
    }
    onUpdate(isCompleted);
  }, [teams]);

  useEffect(() => {
    if (onNextReff !== undefined) {
      onNextReff.current = () => onNextRequest(teams);
    }
  }, [teams]);

  return (
    <>
      {teams.map((item, index) => {
        return (
          <>
            <CardCreateIdeaSession
              title={index === 0 ? 'Teams' : undefined}
              mandatory={index === 0 ? true : false}>
              <CreateTeamsField
                title={`Team Member ${index + 1}`}
                withSelfDelete={teams.length > 1 ? true : false}
                nikValue={item.nik}
                onNikChange={newNik => {
                  let tempTeams = [...teams];
                  tempTeams[index].nik = newNik;
                  setTeams(tempTeams);
                }}
                nameValue={item.name}
                onNameChange={newName => {
                  let tempTeams = [...teams];
                  tempTeams[index].name = newName;
                  setTeams(tempTeams);
                }}
                workingLocationValue={item.workingLocation}
                onWorkingLocationChange={newWorkingLocation => {
                  let tempTeams = [...teams];
                  tempTeams[index].workingLocation = newWorkingLocation;
                  setTeams(tempTeams);
                }}
                unitValue={item.unit}
                onUnitChange={newUnit => {
                  let tempTeams = [...teams];
                  tempTeams[index].unit = newUnit;
                  setTeams(tempTeams);
                }}
                teamStructureItem={[
                  {label: 'Hipster', value: 'Hipster'},
                  {label: 'Hustler', value: 'Hustler'},
                  {label: 'Hacker', value: 'Hacker'},
                ]}
                selectedTeamStructure={item.teamStructure}
                onTeamStructureChange={newTeamStructure => {
                  let tempTeams = [...teams];
                  tempTeams[index].teamStructure = newTeamStructure;
                  setTeams(tempTeams);
                }}
                onSelfDelete={() => {
                  let tempTeams = [...teams];
                  tempTeams.splice(index, 1);
                  setTeams(tempTeams);
                }}
              />
              {index === teams.length - 1 && (
                <>
                  <Gap height={16} />
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      onPress={() => {
                        let tempTeams = [...teams];
                        tempTeams.push({
                          name: '',
                          nik: '',
                          teamStructure: null,
                          workingLocation: '',
                          unit: '',
                        });
                        setTeams(tempTeams);
                      }}>
                      <IcAdd />
                      <Gap width={8} />
                      <Text style={styles.addAnotherMemberText}>
                        Add another member
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </CardCreateIdeaSession>
            {index !== teams.length - 1 && <Gap height={16} />}
          </>
        );
      })}
    </>
  );
};

export default CreateTeams;

const styles = StyleSheet.create({
  fieldTitle: {
    marginBottom: 8,
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    lineHeight: 17,
  },
  addAnotherMemberText: {
    fontFamily: fonts.secondary[600],
    fontSize: 12,
    lineHeight: 15,
    color: colors.primary,
  },
});
