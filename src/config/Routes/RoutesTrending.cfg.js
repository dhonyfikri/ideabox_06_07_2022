import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopIdea from '../../modules/trending/screen/TopIdea.screen';

const Stack = createNativeStackNavigator();

const RoutesTrending = () => {
  return (
    <Stack.Navigator
      initialRouteName="TopIdea"
      screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="TopIdea"
        component={TopIdea}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesTrending;
