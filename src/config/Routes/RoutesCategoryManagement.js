import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CategoryManagement from '../../modules/administrator/screen/CategoryManagement.screen';
import DetailCategoryUserManagement from '../../modules/administrator/screen/DetailCategoryUserManagement.screen';

const Stack = createNativeStackNavigator();
const RoutesCategoryManagement = () => {
  return (
    <Stack.Navigator
      initialRouteName="CategoryManagementDetail"
      screenOptions={{animation: 'none'}}>
      <Stack.Screen
        name="CategoryManagementDetail"
        component={CategoryManagement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailCategory"
        component={DetailCategoryUserManagement}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default RoutesCategoryManagement;
