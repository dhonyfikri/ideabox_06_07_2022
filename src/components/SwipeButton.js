import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {colors} from '../utils/ColorsConfig/Colors';

const BUTTON_WIDTH = 60;
const BUTTON_HEIGHT = 29;
const BUTTON_PADDING = 2;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SwipeButton = ({onToggle, value}) => {
  // Animated value for X translation
  const X = useSharedValue(value ? BUTTON_WIDTH / 2 : 0);

  // Fires when animation ends
  const handleComplete = isToggled => {
    onToggle(isToggled);
  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = value;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    swipeCont: useAnimatedStyle(() => {
      return {};
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,

        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          [colors.success, colors.white],
        ),
        transform: [{translateX: X.value}],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [0, 0.7],
          Extrapolate.CLAMP,
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [
                BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS,
                0 - SWIPEABLE_DIMENSIONS / 2,
              ],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onToggle(!value);
        X.value = value ? 0 : BUTTON_WIDTH / 2;
      }}>
      <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont]}>
        <AnimatedLinearGradient
          style={[AnimatedStyles.colorWave, styles.colorWave]}
          colors={[colors.success, colors.success]}
          start={{x: 0.0, y: 0.5}}
          end={{x: 1, y: 0.5}}
        />
        <PanGestureHandler onGestureEvent={animatedGestureHandler}>
          <Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]} />
        </PanGestureHandler>
        <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
          YES
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: colors.tertiary,
    borderRadius: BUTTON_HEIGHT,
    padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: 'absolute',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 12,
    lineHeight: 15,
    fontWeight: 'bold',
    zIndex: 2,
    color: colors.white,
  },
});
