import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// import React, { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RootLayout from './_layout';

// const App = () => {
//   const [isFirstLaunch, setIsFirstLaunch] = useState(null);

//   useEffect(() => {
//     const checkFirstLaunch = async () => {
//       const hasLaunched = await AsyncStorage.getItem('hasLaunched');
//       if (hasLaunched === null) {
//         await AsyncStorage.setItem('hasLaunched', 'true');
//         setIsFirstLaunch(true);
//       } else {
//         setIsFirstLaunch(false);
//       }
//     };

//     checkFirstLaunch();
//   }, []);

//   if (isFirstLaunch === null) {
//     return null; // or a loading spinner
//   }

//   return <RootLayout />;
// };

// export default App;
