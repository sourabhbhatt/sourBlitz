import curvedNavigation from "../assets/curvedNavigation.png";
import curvedNavigationGif from "../assets/curvedNavigation.gif";
import otpTracker from "../assets/otpTracker.png";
import otpTrackerGif from "../assets/otpTracker.gif";
import pullToRefresh from "../assets/pullToRefresh.png";
import pullToRefreshGif from "../assets/pullToRefreshGif.gif";

import demo1Gif from "../assets/demo1.gif";
// import demoGif from "../assets/demo.gif";
// import eyeGif from "../assets/otp-eye.gif";
// import pullGif from "../assets/pull-refresh.gif";
// import dropGif from "../assets/object-drop.gif";
// import fruitNinjaGif from "../assets/fruit-ninja.gif";

const blogData = [
  {
    id: 1,
    title: "Bringing Life to Navigation – One Curve at a Time",
    disabled: false,
    thumbnail: curvedNavigation,
    image: curvedNavigationGif,
    overview: `🌀 Custom Bottom Navigation Bar in React Native using Tab Stack, Reanimated 3 & SVGs
▶️ 5 tabs – each with a satisfying pop-up animation
🌟 A floating center tab for that elevated action
⚡ A dynamic animated highlighter that glides across tabs in a curved path`,
    components: [
      {
        name: "BottomTabNavigator.tsx",
        description: "Handles the navigation and dynamic scroll-based styling.",
        code: `const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // header: () => <Header />,
      }}
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Referrals" component={ReferralsStackNavigator} />
      <Tab.Screen name="MyGames" component={MyGamesStackNavigator} />
      <Tab.Screen name="Wallet" component={WalletStackNavigator} />
      <Tab.Screen name="Account" component={DrawerNavigator} />
    </Tab.Navigator>
  );
};`,
      },
      {
        name: "MyTabBar.tsx",
        description: "custom Tab bar handler",
        code: `import React, {memo} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';

import TabBarBg from './TabBarBg';
import {CustomTheme} from '../../theme';
import {getIconSource} from './navigationHelper';
import {useAppTheme} from '../../hooks/useAppTheme';

const MyTabBar: React.FC<BottomTabBarProps> = memo(({state, descriptors, navigation}) => {
  const {colors, dark} = useAppTheme();
  const styles = dynamicStyles(colors);

  return (
    <TabBarBg
      currentIndex={state.index}
      color="#D9D9D9"
      strokeColor={colors.NAVIGATION_CONTAINER_BORDER}
      svgStyle={{backgroundColor: colors.NAVIGATION_CONTAINER_BG}}
      totalTabs={5}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const iconSource = getIconSource(route.name, isFocused, dark);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{scale: withSpring(isFocused ? (route.name === 'MyGames' ? 1.1 : 1.3) : 1)}],
        }));

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.6}
            onLongPress={onLongPress}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            accessibilityState={isFocused ? {selected: true} : {}}
            testID={options.tabBarButtonTestID || tab-route.name}
            accessibilityLabel={options.tabBarAccessibilityLabel || route.name}
            style={route.name === 'MyGames' ? styles.floatingButtonContainer : styles.tabItem}>
            <Animated.Image
              source={iconSource}
              style={[route.name === 'MyGames' ? styles.floatingIcon : styles.icon, animatedStyle]}
            />
            <Text
              style={[
                route.name === 'MyGames' ? styles.centerLabel : styles.label,
                {color: isFocused ? colors.NAVIGATION_ACTIVE : colors.NAVIGATION_INACTIVE},
              ]}>
              {route.name === 'MyGames' ? 'My Games' : label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </TabBarBg>
  );
});

export default MyTabBar;

const dynamicStyles = (colors: CustomTheme['colors']) =>
  StyleSheet.create({
    highlighter: {
      position: 'absolute',
      top: 0,
      height: 4,
      backgroundColor: colors.PRIMARY,
      borderRadius: 1,
      transform: [{rotateX: '50deg'}],
    },

    tabItem: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
    },
    floatingButtonContainer: {
      flex: 1,
      width: 60,
      height: 60,
      bottom: 25,
      alignItems: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.3,
          shadowRadius: 4,
        },
        android: {elevation: 8},
      }),
    },
    floatingIcon: {
      ...StyleSheet.absoluteFillObject,
      transform: [{rotate: '-1deg'}],
    },
    icon: {
      width: 23,
      height: 20,
      resizeMode: 'contain',
    },
    label: {
      fontSize: 12,
      marginTop: 4,
    },
    centerLabel: {
      position: 'absolute',
      bottom: -16,
      fontSize: 12,
      marginTop: 4,
    },
  });
`,
      },
      {
        name: "TabBarBg.tsx",
        description: "",
        code: `import Svg, {Path} from 'react-native-svg';
import React, {FC, useEffect, useMemo} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import Animated, {
  withSpring,
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {CustomTheme} from '../../theme';
import {width} from '../../utils/helper';
import {useAppTheme} from '../../hooks/useAppTheme';

interface TabBarProps {
  color?: string;
  children: React.ReactNode;
  currentIndex: number;
  totalTabs?: number;
  strokeColor?: string;
  svgStyle?: ViewStyle;
}

const TabBarBg: FC<TabBarProps> = ({
  color,
  children,
  currentIndex,
  totalTabs = 5,
  strokeColor,
  svgStyle,
}) => {
  const tabWidth = width / totalTabs;
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const {colors} = useAppTheme();
  const styles = useMemo(() => dynamicStyles(colors, tabWidth), [colors, tabWidth]);
  const highlighterOpacity = useSharedValue(1);

  /*  Bezier curve function matching the SVG path */
  const calculateY = (x: number) => {
    'worklet';
    const controlY = 3; // Max dip depth in the middle
    const t = x / width; // Normalize x position from 0 to 1
    return (1 - t) * (1 - t) * 0 + 2 * (1 - t) * t * controlY + t * t * 0;
  };

  useEffect(() => {
    const newX = tabWidth * currentIndex;
    translateX.value = withSpring(newX, {damping: 15, stiffness: 120});
    translateY.value = withSpring(calculateY(newX), {damping: 15, stiffness: 120});
    highlighterOpacity.value = withTiming(currentIndex === 2 ? 0 : 1, {duration: 300});
  }, [currentIndex, tabWidth, translateX, translateY, highlighterOpacity]);

  const rotationAngle = useDerivedValue(() =>
    withSpring(
      {
        0: 2,
        1: 1.2,
        2: 0,
        3: -1.2,
        4: -2,
      }[currentIndex] || 0,
      {damping: 10, stiffness: 100},
    ),
  );

  const highlighterStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {rotate: 'rotationAngle.value deg'},
      ],
      opacity: highlighterOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={'100%'} height={81} viewBox={'0 0 width 88'} style={[styles.svg, svgStyle]}>
        <Path
          d={'M 0 0 Q width * 0.5 15 width 0 L width 0 L 0 0 Z'}
          fill={color}
          stroke={strokeColor}
          strokeWidth={1}
        />
      </Svg>
      {/* Highlighter */}

      <Animated.View style={[styles.slider, highlighterStyle]}>
        <View style={[styles.notch, {borderTopColor: colors.PRIMARY}]} />
      </Animated.View>

      <View style={styles.tabContent}>{children}</View>
    </View>
  );
};

export default TabBarBg;

const dynamicStyles = (colors: CustomTheme['colors'], tabWidth: number) =>
  StyleSheet.create({
    container: {
      bottom: 0,
      height: 81,
      width: '100%',
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: '#D9D9D9',
    },
    svg: {
      bottom: 0,
      width: '100%',
      position: 'absolute',
    },
    slider: {
      width: tabWidth,
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.PRIMARY,
      height: 6,
      alignItems: 'center',
      borderTopEndRadius: 320,
      borderBottomEndRadius: 320,
    },
    notch: {
      width: 15,
      height: 10,
      borderTopWidth: 6,
      borderTopColor: 'transparent',
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      position: 'absolute',
      bottom: -9,
      left: '50%',
      transform: [{translateX: -8}],
    },

    tabContent: {
      bottom: 0,
      height: 75,
      width: '100%',
      paddingBottom: 10,
      alignItems: 'center',
      position: 'absolute',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
  });
`,
      },
    ],
  },

  {
    id: 2,
    title: "👁️ OTP Input Tracker – Animated Eyes Following You",
    disabled: false,
    thumbnail: otpTracker,
    image: otpTrackerGif,
    overview: `A fun and engaging OTP input screen where cartoon eyes follow the user's input.
🎯 Built with SVGs + Reanimated 3
👀 Eyes animate with focus and blink on blur
💡 Smooth UX while typing your OTP`,
    components: [
      {
        name: "OTPInputEyes.tsx",
        description:
          "Eye animation follows the current OTP field being focused.",
        code: `import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
} from 'react-native';
import {useSharedValue, withTiming, Easing} from 'react-native-reanimated';
import Face from './Face';

const OtpEyesScreen = () => {
  const otpLength = 4;
  const inputs = useRef<RNTextInput[]>([]);
  const [_, forceUpdate] = useState(false); // Force re-render for manual input updates

  const eyeX = useSharedValue(20);
  const eyeY = useSharedValue(20);
  const mouthState = useSharedValue(0);

  const values = useRef<string[]>(Array(otpLength).fill(''));

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  const getPupilPosition = useCallback(
    (index: number) => {
      const minX = 16;
      const maxX = 24;
      const stepX = (maxX - minX) / (otpLength - 1);
      const x = minX + index * stepX;

      const center = (otpLength - 1) / 2;
      const distance = Math.abs(index - center);
      const y = 24 + (1 - distance / center) * 2;

      return {x, y};
    },
    [otpLength],
  );

  const updateEye = (index: number) => {
    const pos = getPupilPosition(index);
    eyeX.value = withTiming(pos.x);
    eyeY.value = withTiming(pos.y);
  };

  const handleFocus = (index: number) => {
    updateEye(index);
  };

  const handleChange = (text: string, index: number) => {
    // Replace or clear value
    values.current[index] = text;

    if (text && index < otpLength - 1) {
      inputs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      // On delete, move back
      inputs.current[index - 1]?.focus();
    }

    forceUpdate(x => !x); // Trigger re-render to show cleared value

    const code = values.current.join('');
    if (code.length === otpLength && !code.includes('')) {
      const isValid = code === '1234';

      mouthState.value = withTiming(isValid ? 1 : -1, {
        duration: 400,
        easing: Easing.out(Easing.exp),
      });

      setTimeout(() => {
        mouthState.value = withTiming(0);
      }, 1000);

      // Optionally: trigger OTP submission
      if (isValid) {
        console.log('✅ OTP verified:', code);
      } else {
        console.log('❌ Invalid OTP');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'padding', android: undefined})}
      style={styles.container}>
      <Face
        eyeX={eyeX}
        eyeY={eyeY}
        mouthState={mouthState}
        faceWidth={110}
        faceHeight={90}
      />

      <View style={styles.otpContainer}>
        {Array.from({length: otpLength}).map((_, i) => (
          <TextInput
            key={i}
            ref={ref => (inputs.current[i] = ref!)}
            style={styles.input}
            keyboardType="number-pad"
            maxLength={1}
            value={values.current[i]} // ✅ bind value
            onFocus={() => handleFocus(i)}
            onChangeText={text => handleChange(text, i)}
            placeholder="-"
            placeholderTextColor="#aaa"
            // caretHidden={true}
          />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    width: 44,
    height: 56,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 22,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#000',
    alignItems: 'center',
  },
});

export default OtpEyesScreen;
`,
      },
      {
        name: "Face.tsx",
        description:
          "Eye animation follows the current OTP field being focused.",
        code: `import React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg, {Circle, Path} from 'react-native-svg';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

type FaceProps = {
  eyeX: SharedValue<number>;
  eyeY: SharedValue<number>;
  mouthState: SharedValue<number>;
  faceWidth?: number;
  faceHeight?: number;
};

const Eye: React.FC<{x: SharedValue<number>; y: SharedValue<number>}> = ({
  x,
  y,
}) => (
  <Svg height="40" width="40">
    <Circle
      cx="20"
      cy="20"
      r="15"
      stroke="black"
      strokeWidth="2"
      fill="white"
    />
    <AnimatedCircle cx={x} cy={y} r="6" fill="black" />
  </Svg>
);

const Eyebrow: React.FC<{isLeft: boolean}> = ({isLeft}) => (
  <Svg height="10" width="40">
    <Path
      d={isLeft ? 'M10 10 Q 20 0 30 10' : 'M10 10 Q 20 0 30 10'}
      stroke="white"
      strokeWidth="2"
      fill="none"
    />
  </Svg>
);

const Face: React.FC<FaceProps> = ({
  eyeX,
  eyeY,
  mouthState,
  faceWidth = 110,
  faceHeight = 90,
}) => {
  const mouthWidth = faceWidth * 0.9;
  const mouthHeight = faceHeight * 0.3;

  const animatedEyeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: eyeX.value - 20}, {translateY: eyeY.value - 20}],
  }));

  const mouthPath = useDerivedValue(() => {
    const controlY = 25 + mouthState.value * 10;
    console.log('controlY', controlY);
    return M5 25 Q 25 controlY 45 25;
  });

  const animatedMouthProps = useAnimatedProps(() => ({
    d: mouthPath.value,
  }));

  return (
    <View style={[styles.faceBox, {width: faceWidth, height: faceHeight}]}>
      <View style={styles.eyesRow}>
        <View style={styles.eyeColumn}>
          <Eyebrow isLeft />
          <Animated.View style={animatedEyeStyle}>
            <Eye x={eyeX} y={eyeY} />
          </Animated.View>
        </View>
        <View style={styles.eyeColumn}>
          <Eyebrow isLeft={false} />
          <Animated.View style={animatedEyeStyle}>
            <Eye x={eyeX} y={eyeY} />
          </Animated.View>
        </View>
      </View>

      <View style={styles.mouthWrapper}>
        <Svg width={mouthWidth} height={mouthHeight} viewBox="0 0 50 50">
          <AnimatedPath
            animatedProps={animatedMouthProps}
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  faceBox: {
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  eyesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  eyeColumn: {
    alignItems: 'center',
  },
  mouthWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Face;
`,
      },
    ],
  },

  {
    id: 3,
    title: "🌊 Custom Pull-to-Refresh with Animated Feedback",
    disabled: false,
    thumbnail: pullToRefresh,
    image: pullToRefreshGif,
    overview: `Ditch the boring spinner — here's how you can animate your own refresh behavior.
🔄 Built with Reanimated 3 and SVGs
🌀 Ripple effect, smiley face, or rocket blast-off animations
✅ Enhances user delight and brand personality`,
    components: [
      {
        name: "pullToRefresh.tsx",
        description: "Custom Animation",
        code: `import { useRef, useState } from "react";
import { PanResponder, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

import data from "../assets/data.json";
import Card from "../components/Card";
import ASSETS from "../assets/AssetManager";
import refreshIcon from "../assets/images/refresh-icon.png";
import colors from "../utils/colors";
import Header from "../components/Header";

const MAX_PULL_DISTANCE = 150; // Maximum pull distance for refresh
const REFRESH_THRESHOLD = MAX_PULL_DISTANCE / 2; // Threshold to trigger refresh
const REFRESH_ANIMATION_DURATION = 180; // Duration for animations
const REFRESH_ICON_SIZE = 36; // Refresh icon dimensions

const PullToRefreshAnimation = () => {
  // Shared values for animation
  const scrollPosition = useSharedValue(0);
  const pullDownPosition = useSharedValue(0);
  const isReadyToRefresh = useSharedValue(false);

  const [refreshing, setRefreshing] = useState(false);

  // Function to simulate refreshing data
  const onRefresh = (done = () => {}) => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      done();
    }, 2000); // Simulated refresh duration
  };

  // Handles release of the pull-down gesture
  const onPanRelease = () => {
    // Animate pull-down position back to original state
    pullDownPosition.value = withTiming(
      isReadyToRefresh.value ? REFRESH_ICON_SIZE * 2 : 0,
      { duration: REFRESH_ANIMATION_DURATION }
    );

    if (isReadyToRefresh.value) {
      isReadyToRefresh.value = false;

      const onRefreshComplete = () => {
        pullDownPosition.value = withTiming(0, {
          duration: REFRESH_ANIMATION_DURATION,
        });
      };

      onRefresh(onRefreshComplete);
    }
  };

  // Gesture recognizer for handling pull-down interactions
  const panResponderRef = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) =>
        scrollPosition.value <= 0 && gestureState.dy > 0,
      onPanResponderMove: (event, gestureState) => {
        // Update pull-down position within allowed range
        pullDownPosition.value = Math.min(
          MAX_PULL_DISTANCE,
          Math.max(0, gestureState.dy)
        );

        // Update refresh readiness state
        isReadyToRefresh.value = pullDownPosition.value >= REFRESH_THRESHOLD;
      },
      onPanResponderRelease: onPanRelease,
      onPanResponderTerminate: onPanRelease,
    })
  );

  // Track scroll position
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollPosition.value = event.contentOffset.y;
    },
  });

  // Animated styles for pull-down effect
  const pullDownStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: pullDownPosition.value }],
  }));

  // Animated styles for refresh container height
  const refreshContainerStyles = useAnimatedStyle(() => ({
    height: pullDownPosition.value,
  }));

  // Animated styles for refresh icon
  const refreshIconStyles = useAnimatedStyle(() => {
    const scale = Math.min(1, pullDownPosition.value / REFRESH_ICON_SIZE);
    return {
      opacity: refreshing
        ? withDelay(100, withTiming(0, { duration: 20 }))
        : Math.max(0, pullDownPosition.value - 25) / 50,
      transform: [
        { scaleX: refreshing ? withTiming(0.15, { duration: 120 }) : scale },
        { scaleY: scale },
        { rotate: {pullDownPosition.value * 3}deg },
      ],
      backgroundColor: refreshing ? "#fff" : "transparent",
    };
  });

  return (
    <>
      <Header title={"Pull to refresh demo"} />
      <View
        pointerEvents={refreshing ? "none" : "auto"}
        style={styles.container}
      >
        {/* Pull-down refresh container */}
        <Animated.View
          style={[styles.refreshContainer, refreshContainerStyles]}
        >
          {refreshing ? (
            <LottieView
              source={ASSETS.animatedLogo}
              autoPlay
              loop
              style={styles.logo}
            />
          ) : (
            <Animated.Image
              source={refreshIcon}
              style={[styles.refreshIcon, refreshIconStyles]}
            />
          )}
        </Animated.View>

        {/* Main content area with pull-down effect */}
        <Animated.View
          style={[styles.contentWrapper, pullDownStyles]}
          {...panResponderRef.current.panHandlers}
        >
          <Animated.FlatList
            data={data}
            keyExtractor={(item) => item.id}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            contentContainerStyle={styles.flatListContent}
            renderItem={({ item, index }) => (
              <Card
                loading={refreshing}
                index={index}
                image={item.image}
                title={item.title}
                likes={item.likes}
              />
            )}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
          />
        </Animated.View>
      </View>
    </>
  );
};

export default PullToRefreshAnimation;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pulltoRef,
  },
  refreshContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 280,
    height: "100%",
  },
  refreshIcon: {
    position: "absolute",
    width: REFRESH_ICON_SIZE,
    height: REFRESH_ICON_SIZE,
    borderRadius: REFRESH_ICON_SIZE / 2,
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: colors.pulltoRef,
  },
  itemSeparator: {
    height: 20,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
});
`,
      },
    ],
  },

  {
    id: 4,
    title: "🍬 Seamless Object Rain – A Animation Loop",
    disabled: true,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSggawijyetRIBWtigdHBPg2SfluPVO6VGf9Q&s",
    image: demo1Gif,
    overview: `Animate objects or emojis falling from the top in a smooth endless loop.
🍭 Great for celebrations, gamified apps, or subtle UI delight
⚙️ Skia-powered with constant frame-rate
🔁 Repeats infinitely without frame drops`,
    components: [],
  },

  {
    id: 5,
    title: "⚔️ Fruit Ninja – React Native Game (Coming Soon)",
    disabled: true,
    thumbnail:
      "data:image/jpeg;base64,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",
    image: demo1Gif,
    overview: `Yes, we're doing it! 🍉 A complete Fruit Ninja-style game built in React Native.
✂️ Swipe to slice
🎮 Score tracking & sound effects
🔥 Coming soon with Reanimated 3 + Skia magic`,
    components: [],
  },
];

export default blogData;
