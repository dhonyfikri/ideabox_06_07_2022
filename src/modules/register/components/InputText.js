import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'

export default function InputText(props) {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.labelForm}> {props.name} <Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry}
                onChange={props.onChanges}
            />
            <Text style={[styles.invalid, { opacity: props.value ? 0 : 1, }]}>Incorrect {props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 12,
    },

    labelForm: {
        fontFamily: 'Poppins-SemiBold',
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 20,
        color: 'black',
        marginLeft: -3,
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        borderColor: '#BDBDBD',
        borderRadius: 5,
        marginHorizontal: 0,
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 17,
        marginBottom: 0,
    },
    invalid: {
        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        lineHeight: 15,
        color: '#EE4443',
        marginTop: 4,

    },
})

