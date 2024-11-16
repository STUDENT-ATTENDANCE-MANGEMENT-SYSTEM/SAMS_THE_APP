import { Redirect, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dashboard from './screens/dashboard';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  style?: object;
  size?: number;
  focused: boolean;
}) {
  return (
    <Ionicons
      size={props.size || 24}
      {...props}
      style={[{ color: props.color }, props.style]}
    />
  );
}

const TabsLayout = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        initialRouteName='screens/index'
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#213655',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            position: 'absolute',
            ...Platform.select({
              android: {
                paddingBottom: 24,
                bottom: 20,
              },
              ios: {
                bottom: 40,
              },
            }),
            backgroundColor: '#fff',
            borderRadius: 20,
            height: 90,
            ...styles.shadow,
            width: '90%',
            marginHorizontal: '5%',
            paddingVertical: 0,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name='screens/dashboard'
          options={{
            title: 'Dashboard',
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TabBarIcon
                  name={focused ? 'home' : 'home-outline'}
                  color={focused ? '#F02A4B' : 'gray'}
                  size={size}
                  focused={focused}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='screens/timetable'
          options={{
            title: 'timetable',
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TabBarIcon
                  name={focused ? 'calendar' : 'calendar-outline'}
                  color={focused ? '#F02A4B' : 'gray'}
                  size={size}
                  focused={focused}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='screens/index'
          options={{
            title: 'Attendance',
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: '#F02A4B',
                  marginBottom: 80,
                }}
              >
                <TabBarIcon
                  name={'checkmark'}
                  color={'#fff'}
                  size={60}
                  focused={focused}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='screens/insights'
          options={{
            title: 'insights',
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TabBarIcon
                  name={focused ? 'bar-chart' : 'bar-chart-outline'}
                  color={focused ? '#F02A4B' : 'gray'}
                  size={size}
                  focused={focused}
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name='screens/settings'
          options={{
            title: 'settings',
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TabBarIcon
                  name={focused ? 'settings' : 'settings-outline'}
                  color={focused ? '#F02A4B' : 'gray'}
                  size={size}
                  focused={focused}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconStyle: {},
});
