import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {ArrowDown, ArrowUp, Trash} from '../assets/icon';
import style from '../config/Style/style.cfg';

const CardTalentApproval = props => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  return (
    <View style={styles.cardContent}>
      <View style={{flexDirection: 'row', height: 80}}>
        <View style={styles.email}>
          <Text
            numberOfLines={2}
            style={[style.h5, {textTransform: 'capitalize'}]}>
            {props.name}
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={style.h5}>{props.title}</Text>
        </View>
        {open === true ? (
          <TouchableOpacity style={styles.status} onPress={() => handleOpen()}>
            <ArrowUp />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.status} onPress={() => handleOpen()}>
            <ArrowDown />
          </TouchableOpacity>
        )}
      </View>
      {open === true ? (
        <View style={{width: '100%', paddingBottom: 15}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.title}>
              <Text style={[{color: '#085D7A'}]}>Notes</Text>
            </View>
            <View style={styles.email}>
              <Text style={[{color: '#085D7A'}]}>Request</Text>
            </View>
            <View style={styles.title} onPress={() => handleOpen()}>
              <Text style={[{color: '#085D7A'}]}>Request Date</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.title}>
              <Text style={style.h5}>{props.notes}</Text>
            </View>
            <View style={styles.email}>
              <Text style={[style.h5, {textTransform: 'capitalize'}]}>
                {props.request}
              </Text>
            </View>
            <View style={styles.title} onPress={() => handleOpen()}>
              <Text style={style.h5}>{props.date}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default CardTalentApproval;

const styles = StyleSheet.create({
  title: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 5,
  },
  email: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title2: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  email2: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  status: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
