import {
  Text,
  View,
  FlatList,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

import slides from '../components/slides';
import OnboardingItem from '../components/OnboardingItem';
import Paginator from '../components/Paginator';

import styles from '../style/Main.style';

const Main = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const { width } = Dimensions.get('window');

  useEffect(() => {
    let scrollValue = 0,
      scrolled = 0;

    const intervalId = setInterval(() => {
      scrolled++;
      if (scrolled < slides.length) { scrollValue = scrollValue + width; }
      else {
        scrollValue = 0;
        scrolled = 0;
      }

      slidesRef.current.scrollToOffset({ animated: true, offset: scrollValue });
    }, 3000);
    return () => clearInterval(intervalId);
  }, [width]);

  return (
    <View style={styles.container}>
      <View style={styles.flatlist}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
          style={{
            flexGrow: 0,
          }}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Login', { checked: false })}>
        <Text style={styles.getstarted}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
