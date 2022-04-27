import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../utils/ColorsConfig/Colors';
import fonts from '../utils/FontsConfig/Fonts';
import Gap from '../components/Gap';
import {IcScrollArrowUp, IcScrollArrowDown} from '../assets/icon';

const MultilineTextView = ({text, height = 100}) => {
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
    <View style={styles.wrapper(height)}>
      <ScrollView
        style={styles.scrollView}
        nestedScrollEnabled={true}
        contentContainerStyle={{paddingHorizontal: 8, paddingVertical: 12.5}}
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          setContentOffset(e.nativeEvent.contentOffset);
        }}
        onLayout={e => {
          setScrollViewHeight(e.nativeEvent.layout.height);
        }}
        onContentSizeChange={(_, height) => {
          setContentSize(height);
        }}>
        <Text style={styles.text}>{text}</Text>
      </ScrollView>
      <View style={styles.indicatorWrapper}>
        <Gap height={10} />
        <IcScrollArrowUp />
        <View style={{flex: 1, width: '100%', marginVertical: 5}}>
          <View
            style={styles.indicator(scrollPerc, scrollElementHeightPercent)}
          />
        </View>
        <IcScrollArrowDown />
        <Gap height={10} />
      </View>
    </View>
  );
};

export default MultilineTextView;

const styles = StyleSheet.create({
  wrapper: height => ({
    height: height,
    flexDirection: 'row',
    backgroundColor: '#FAFAFB',
    borderRadius: 16,
    overflow: 'hidden',
  }),
  scrollView: {
    flex: 1,
  },
  text: {
    color: colors.text.secondary,
    fontFamily: fonts.primary[400],
    fontSize: 12,
    lineHeight: 22,
    textAlign: 'justify',
  },
  indicatorWrapper: {
    width: 20,
    backgroundColor: '#F7F4FF',
    borderRadius: 16,
    alignItems: 'center',
  },
  indicator: (deltaTop, heightPercent) => ({
    width: 4,
    backgroundColor: '#CAB6FF',
    position: 'absolute',
    top: `${Number(deltaTop || 0).toFixed(0)}%`,
    left: 8,
    height: `${heightPercent}%`,
    borderRadius: 2,
  }),
});
