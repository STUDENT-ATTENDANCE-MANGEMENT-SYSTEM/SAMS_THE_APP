import { Redirect, Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} {...props} style={{ color: '#1BC464' }} />;
}

const TabsLayout = () => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#1BC464',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name='screens/index'
          options={{
            title: 'attendance',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name='check-circle' />;
            },
          }}
        />
        <Tabs.Screen
          name='screens/dashboard'
          options={{
            title: 'dashboard',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name='dashboard' />;
            },
          }}
        />
        <Tabs.Screen
          name='screens/timetable'
          options={{
            title: 'timetable',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name='calendar' />;
            },
          }}
        />
        <Tabs.Screen
          name='screens/insights'
          options={{
            title: 'insights',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name='bar-chart' />;
            },
          }}
        />
        <Tabs.Screen
          name='screens/settings'
          options={{
            title: 'settings',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name='cog' />;
            },
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
});
