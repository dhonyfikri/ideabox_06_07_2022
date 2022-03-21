import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventContent from '../../modules/event/screen/EventContent.screen';
import DetailEventCategory from '../../modules/event/screen/DetailEventCategory.screen';

const Stack = createNativeStackNavigator();

const RoutesEvent = () => {
  return (
    <Stack.Navigator initialRouteName="EventContent">
      <Stack.Screen
        name="EventContent"
        component={EventContent}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailEventContent"
        component={DetailEventCategory}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesEvent;
