import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Back } from '../../../assets/icon';
import EditUser from '../../../components/EditUser';
import SearchHeader from '../../../components/SearchHeader';

const EditUserAdministrator = ({ navigation, route }) => {
    const data = route.params.data;
    return (
        <View style={styles.container}>
            <SearchHeader />
            <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.textEdit}>Edit User</Text>
                    <TouchableOpacity onPress={() => navigation.goBack({ data: data })} >
                        <Back />
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <View style={styles.inputContainer}>
                        <EditUser />
                    </View>
                </ScrollView>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('UserManagement', { data: data })} >
                        <Text style={styles.save}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default EditUserAdministrator;

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
