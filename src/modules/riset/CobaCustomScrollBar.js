import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';

const data = [
  {name: 'item 1'},
  {name: 'item 2'},
  {name: 'item 3'},
  {name: 'item 4'},
  {name: 'item 5'},
  {name: 'item 6'},
  {name: 'item 7'},
  {name: 'item 8'},
];

const CobaCustomScrollBar = () => {
  const [contentOffset, setContentOffset] = useState({x: 0, y: 0});
  const [scrollElementHeightPercent, setScrollElementHeightPercent] =
    useState(100);
  const [contentSize, setContentSize] = useState(0);
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  const scrollPerc =
    (contentOffset.y / (contentSize - scrollViewHeight)) *
    (100 - scrollElementHeightPercent);

  const updateScrollBar = () => {
    const heightPercent = (scrollViewHeight / contentSize) * 100;
    setScrollElementHeightPercent(heightPercent > 100 ? 100 : heightPercent);
  };

  useEffect(() => {
    updateScrollBar();
  }, [scrollViewHeight, contentSize]);

  return (
    <View style={styles.page}>
      <View style={styles.wrapper}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 20}}
          showsVerticalScrollIndicator={false}
          onScroll={e => {
            console.log('satu');
            setContentOffset(e.nativeEvent.contentOffset);
          }}
          onLayout={e => {
            // console.log('dua');
            setScrollViewHeight(e.nativeEvent.layout.height);
          }}
          onContentSizeChange={(_, height) => {
            // console.log('tiga');
            setContentSize(height);
          }}>
          {data.map(item => {
            return (
              <View style={styles.card}>
                <Text>{item.name}</Text>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorWrapper}>
          <View
            style={styles.indicator(scrollPerc, scrollElementHeightPercent)}
          />
        </View>
      </View>
    </View>
  );
};

export default CobaCustomScrollBar;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'purple',
    padding: 20,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green',
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  indicatorWrapper: {
    width: 40,
    backgroundColor: 'blue',
  },
  indicator: (deltaTop, heightPercent) => ({
    width: 20,
    // height: 80,
    backgroundColor: 'orange',
    position: 'absolute',
    top: `${Number(deltaTop || 0).toFixed(0)}%`,
    left: 10,
    height: `${heightPercent}%`,
  }),
  card: {
    backgroundColor: 'orange',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
