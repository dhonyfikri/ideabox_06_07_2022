import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../modules/profile/screen/Profile.screen';
import InputProfile from '../../modules/profile/screen/Input.screen';

const Stack = createNativeStackNavigator();

const RoutesProfile = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InputProfile"
        component={InputProfile}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
};

export default RoutesProfile;
