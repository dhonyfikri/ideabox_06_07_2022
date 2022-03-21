import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Back, EditData } from '../../../assets/icon';
import DetailUserManagement from '../../../components/DetailUserManagement';
import SearchHeader from '../../../components/SearchHeader';

const DetailUser = ({ navigation, route }) => {
    const data = route.params.data;
    return (
        <View style={styles.container}>
            <SearchHeader />
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Back />
                    </TouchableOpacity>
                    <Text style={styles.textEdit}>Detail User</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('EditUserAdministrator', { data: data })} >
                        <EditData />
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <View style={styles.inputContainer}>
                        <DetailUserManagement />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default DetailUser;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    contentContainer: {
        flex: 1,
        margin: 20,
        backgroundColor: '#EBEBEB',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    textEdit: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#085D7A',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        width: '35%',
        height: 35,
        borderRadius: 10,
        backgroundColor: '#085D7A',
        alignSelf: 'flex-end',
    },
    save: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
