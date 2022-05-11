import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { windowWidth } from '../../../components/WindowDimensions';
import slides from './slides';

export default function OnboardingItem({ item }) {
  const { width } = useWindowDimensions();
  return (
    <View>
      <Image
        source={item.image}
        style={[styles.image, { width }]}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    marginTop: -20.2,
    fontFamily: 'Poppoins-Bold',
    lineHeight: 33.6,
  },
  description: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 17,
    color: 'white',
    width: windowWidth,
    marginTop: 16,
  },
});
