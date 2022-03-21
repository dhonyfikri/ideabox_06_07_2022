import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import EventContentManagement from '../../modules/eventmanagement/screen/EventContent.screen';
import DetailEventManagement from '../../modules/eventmanagement/screen/DetailEventCategory.screen';
import EventManagementIdea from '../../modules/eventmanagement/screen/EventManagementIdea';

const Stack = createNativeStackNavigator();

const RoutesEventManagement = () => {
  return (
    <Stack.Navigator initialRouteName="EventContent">
      <Stack.Screen
        name="EventContent"
        component={EventContentManagement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailEventContent"
        component={DetailEventManagement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EventManagementIdea"
        component={EventManagementIdea}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesEventManagement;
