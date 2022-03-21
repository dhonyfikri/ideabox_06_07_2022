import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailIdeaUser from '../../modules/talentapproval/screen/DetailIdeaUser.screen';
import DetailStoryBehind from '../../modules/talentapproval/screen/DetailStoryBehind.screen';
import DetailLeanCanvas from '../../modules/talentapproval/screen/DetailLeanCanvas.screen';
import DetailTeams from '../../modules/talentapproval/screen/DetailTeams.screen';
import TalentApproval from '../../modules/talentapproval/screen/TalentApproval.screen';
import ProfileUser from '../../modules/profileuser/screen/ProfileUser.screen';

const Stack = createNativeStackNavigator();

const RoutesTalentApproval = () => {
  return (
    <Stack.Navigator
      initialRouteName="TalentApproval"
      screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="TalentApproval"
        component={TalentApproval}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailIdeaUser"
        component={DetailIdeaUser}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailStoryBehind"
        component={DetailStoryBehind}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailLeanCanvas"
        component={DetailLeanCanvas}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailTeams"
        component={DetailTeams}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileUser"
        component={ProfileUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesTalentApproval;
