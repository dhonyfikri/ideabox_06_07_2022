import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetailUserManagement = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.h2}>User Name :</Text>
            <Text style={styles.text}>Karyawan Telkom</Text>
            <Text style={styles.h2}>Nomor Induk Pegawai</Text>
            <Text style={styles.text}>7912</Text>
            <Text style={styles.h2}>Email Company</Text>
            <Text style={styles.text}>karyawan@gmail.com</Text>
            <Text style={styles.h2}>Email Public</Text>
            <Text style={styles.text}>-</Text>
            <Text style={styles.h2}>Password</Text>
            <Text style={styles.text}>-</Text>
            <Text style={styles.h2}>Nomor HP</Text>
            <Text style={styles.text}>0812222222</Text>
            <Text style={styles.h2}>Perusahaan</Text>
            <Text style={styles.text}>Amoeba</Text>
            <Text style={styles.h2}>Team Structure</Text>
            <Text style={styles.text}>Hipster</Text>
            <Text style={styles.h2}>Role</Text>
            <Text style={styles.text}>Talent</Text>
            <Text style={styles.h2}>About</Text>
            <Text style={styles.text}>IT Service Quality Management Team Leader</Text>
            <Text style={styles.h2}>Created By :</Text>
            <Text style={styles.textnoedit}>-</Text>
            <Text style={styles.h2}>Created Date :</Text>
            <Text style={styles.textnoedit}>2021-09-08 14:30:39</Text>
            <Text style={styles.h2}>Updated By :</Text>
            <Text style={styles.textnoedit}>Zaid Zamanda</Text>
            <Text style={styles.h2}>Updated Date</Text>
            <Text style={styles.textnoedit}>2021-09-28 15:00:39</Text>

        </View>
    );
};

export default DetailUserManagement;

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    text: {
        color: 'black',
        fontSize: 12,
        marginBottom: 10,
    },
    textnoedit: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#DBDBDB',
        borderColor: '#085D7A',
        marginBottom: 10,
        color: 'black',
        height: 20,
        fontSize: 12,
        paddingLeft: 7,
        paddingTop: 2,
    },
    h2: {
        fontSize: 14,
        fontWeight: '200',
        fontFamily: 'Roboto',
    },
});
