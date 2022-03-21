import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeContent from '../../modules/home/screen/HomeContent';

const Stack = createNativeStackNavigator();

const RoutesHome = () => {
    return (
        <Stack.Navigator initialRouteName="HomeContent">
            <Stack.Screen
                name="HomeContent"
                component={HomeContent}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default RoutesHome;
