import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SubmittedIdea from '../../modules/myidea/screen/SubmittedIdea.screen';
import DetailIdeaUser from '../../modules/myidea/screen/DetailIdeaUser.screen';
import DetailStoryBehind from '../../modules/myidea/screen/DetailStoryBehind.screen';
import DetailLeanCanvas from '../../modules/myidea/screen/DetailLeanCanvas.screen';
import DetailTeams from '../../modules/myidea/screen/DetailTeams.screen';
import MyAction from '../../modules/myidea/screen/JoinIdea.screen';
import ProfileUser from '../../modules/myidea/screen/ProfileUser.screen';
import ProfileUserMyIdea from '../../modules/myidea/screen/ProfileUser.screen';

const Stack = createNativeStackNavigator();

const RoutesMyIdea = () => {
  return (
    <Stack.Navigator
      initialRouteName="SubmittedIdea"
      screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="SubmittedIdea"
        component={SubmittedIdea}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyAction"
        component={MyAction}
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
        component={ProfileUserMyIdea}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesMyIdea;
