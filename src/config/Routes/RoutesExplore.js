import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExploreContent from '../../modules/explore/screen/ExploreContent.screen';
import DetailExplore from '../../modules/explore/screen/DetailExplore.screen';
import DetailStoryBehind from '../../modules/explore/screen/DetailStoryBehind.screen';
import DetailLeanCanvas from '../../modules/explore/screen/DetailLeanCanvas.screen';
import DetailTeams from '../../modules/explore/screen/DetailTeams.screen';
import ProfileUser from '../../modules/profileuser/screen/ProfileUser.screen';
import TopTabNavigation from '../../modules/riset/TopTabNavigation';

const Stack = createNativeStackNavigator();

const RoutesExplore = () => {
  return (
    <Stack.Navigator
      initialRouteName="ExploreContent"
      screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="ExploreContent"
        component={ExploreContent}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="DetailIdeaUser"
        component={DetailExplore}
        options={{headerShown: false}}
      /> */}
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
      <Stack.Screen
        name="TopTabNavigation"
        component={TopTabNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesExplore;
