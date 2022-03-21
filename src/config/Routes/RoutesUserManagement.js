import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserManagement from '../../modules/administrator/screen/UserManagement.screen';
import EditUserAdministrator from '../../modules/administrator/screen/EditUserManagement.screen';
import DetailUser from '../../modules/administrator/screen/DetailUser.screen';

const Stack = createNativeStackNavigator();
const RoutesUserManagement = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserManagementDetail"
      screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="UserManagementDetail"
        component={UserManagement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditUserAdministrator"
        component={EditUserAdministrator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailUser"
        component={DetailUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesUserManagement;
