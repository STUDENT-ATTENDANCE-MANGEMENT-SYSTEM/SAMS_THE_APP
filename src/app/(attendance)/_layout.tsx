import React, { useEffect } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

function AnimatedTabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  size?: number;
  focused: boolean;
}) {
  const scale = useSharedValue(1);

  const colorPalette = {
    primary: '#f2575d', //cherry red
    secondary: '#213655', //dark blue
    accent: '#d4c4b4', //light brown
    background: '#f4ece4', //light peach
    textPrimary: '#4c749c', //light blue
    textSecondary: '#243454', //dark blue
    highlight: '#b8dce8', // very light blue
  };

  React.useEffect(() => {
    scale.value = withTiming(props.focused ? 1.2 : 1, {
      duration: 300,
    });
  }, [props.focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Ionicons
        size={props.size || 24}
        name={props.name}
        color={colorPalette.primary}
        style={{ color: props.color }}
      />
    </Animated.View>
  );
}

const TabsLayout = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#243454');
    }
  }, []);

  return (
    <SafeAreaView
      edges={['top']}
      style={{ flex: 1, backgroundColor: '#f4ece4' }}
    >
      <StatusBar style='auto' backgroundColor='#d4c4b4' />

      <Tabs
        initialRouteName='screens/index'
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#f2575d',
          tabBarInactiveTintColor: '#d4c4b4',
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            ...Platform.select({
              android: {
                paddingBottom: 24,
                height: 70,
                backgroundColor: '#4c749c',
              },
              ios: { height: 90, backgroundColor: '#4c749c' },
            }),
          },

          headerShown: false,
        }}
      >
        <Tabs.Screen
          name='screens/index'
          options={{
            title: 'Attendance',
            tabBarIcon: ({ focused, size }) => (
              <AnimatedTabBarIcon
                name={focused ? 'home' : 'home-outline'}
                color={focused ? '#f2575d' : '#d4c4b4'}
                size={size}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='screens/timetable'
          options={{
            title: 'timetable',
            tabBarIcon: ({ focused, color, size }) => (
              <AnimatedTabBarIcon
                name={focused ? 'calendar' : 'calendar-outline'}
                color={focused ? '#f2575d' : '#d4c4b4'}
                size={size}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name='screens/insights'
          options={{
            title: 'insights',
            tabBarIcon: ({ focused, color, size }) => (
              <AnimatedTabBarIcon
                name={focused ? 'stats-chart' : 'stats-chart-outline'}
                color={focused ? '#f2575d' : '#d4c4b4'}
                size={size}
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='screens/dashboard'
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ focused, color, size }) => (
              <AnimatedTabBarIcon
                name={focused ? 'person' : 'person-outline'}
                color={focused ? '#f2575d' : '#d4c4b4'}
                size={size}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default TabsLayout;
