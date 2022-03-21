import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const EditUser = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.h2}>User Name :</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Nomor Induk Pegawai</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Email Company</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Email Public</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Password</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Nomor HP</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Perusahaan</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Team Structure</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Role</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Created By :</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Created Date :</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Updated By :</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>Updated Date</Text>
      <TextInput
        style={styles.input}
        // value={''}
        // onChangeText={() => { }}
      />
      <Text style={styles.h2}>About</Text>
      <View style={styles.inputAbout}>
        <TextInput
          style={styles.textInputAbout}
          multiline={true}
          // value={''}
          // onChangeText={() => { }}
        />
      </View>
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    borderColor: '#085D7A',
    marginBottom: 10,
    color: 'black',
    height: 30,
    fontSize: 9,
  },
  h2: {
    fontSize: 12,
    fontWeight: '200',
    fontFamily: 'Roboto',
  },
  inputAbout: {
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#085D7A',
    marginBottom: 10,
    color: 'black',
    height: 70,
    fontSize: 12,
    width: '100%',
  },
  textInputAbout: {
    width: '100%',
    fontSize: 9,
  },
});
