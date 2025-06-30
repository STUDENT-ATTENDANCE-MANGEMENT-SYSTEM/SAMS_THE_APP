import React from 'react';
import {
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

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
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <StatusBar style='auto' />

      <Tabs
        initialRouteName='screens/index'
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#213655',
          tabBarInactiveTintColor: '#4c749c',
          tabBarButton: (props) => {
            const {
              onPress,
              onLongPress,
              children,
              style,
              accessibilityState,
            } = props;
            const focused = accessibilityState?.selected;

            return (
              <TouchableWithoutFeedback
                onPress={onPress}
                onLongPress={onLongPress || undefined}
              >
                <View
                  style={[
                    style,
                    {
                      backgroundColor: focused ? '#d4c4b4' : 'transparent',
                      borderRadius: 20,
                      marginHorizontal: 4,
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                    },
                  ]}
                >
                  {children}
                </View>
              </TouchableWithoutFeedback>
            );
          },
          tabBarStyle: {
            backgroundColor: '#f4ece4',
            borderTopWidth: 0,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            shadowColor: '#213655',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            ...Platform.select({
              android: {
                paddingBottom: 12,
                paddingTop: 10,
                height: 75,
                elevation: 20,
              },
              ios: {
                height: 95,
                paddingBottom: 25,
                paddingTop: 16,
              },
            }),
          },
          tabBarItemStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
            marginHorizontal: 4,
            borderRadius: 20,
          },

          headerShown: false,
        }}
      >
        <Tabs.Screen
          name='screens/index'
          options={{
            title: 'Attendance',
            tabBarLabel: 'Attendance',
            tabBarIcon: ({ focused, size }) => (
              <AnimatedTabBarIcon
                name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
                color={focused ? '#213655' : '#4c749c'}
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
            tabBarLabel: 'Timetable',
            tabBarIcon: ({ focused, color, size }) => (
              <AnimatedTabBarIcon
                name={focused ? 'calendar' : 'calendar-outline'}
                color={focused ? '#213655' : '#4c749c'}
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
                color={focused ? '#213655' : '#4c749c'}
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
                color={focused ? '#213655' : '#4c749c'}
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
