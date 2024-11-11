// src/app/WelcomeScreen.tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('(attendance)' as never);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to SAMS_THE_APP</Text>
    </View>
  );

  // const navigation = useNavigation();
  // const fadeAnim = new Animated.Value(0);

  // useEffect(() => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 1,
  //     duration: 2000,
  //     useNativeDriver: true,
  //   }).start(() => {
  //     setTimeout(() => {
  //       navigation.replace('Home');
  //     }, 1000);
  //   });
  // }, [fadeAnim]);

  // return (
  //   <View style={styles.container}>
  //     <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
  //       <Text style={styles.logo}>SAMS_THE_APP</Text>
  //     </Animated.View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
