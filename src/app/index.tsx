
import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Logo from '../../assets/svg/logo.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');


const WelcomeScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0);
  
  useEffect(() => {

    const checkIfNewUser = async () => {
      const isNewUser = await AsyncStorage.getItem('isNewUser');
      if (isNewUser === null) {
        await AsyncStorage.setItem('isNewUser', 'false');
        navigation.navigate('onboarding' as never);
      } else {
        setTimeout(() => {
          navigation.navigate('(attendance)' as never);
        }, 3000);
      }
    };

    checkIfNewUser();
  

    fadeAnim.value = withTiming(1, {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });

    scaleAnim.value = withTiming(10, {
      duration: 3000,
      easing: Easing.out(Easing.exp),
    });

    const timeout = setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: '(attendance)' }],
        })
      );
    }, 3000);

    return () => clearTimeout(timeout);
  }, [fadeAnim, scaleAnim, navigation]);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const animatedLogoStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
    };
  });


  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, animatedBackgroundStyle]} />
      <StatusBar hidden={true} />
      <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
        <Logo style={styles.logo} />
      </Animated.View>
      <StatusBar style='auto' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  background: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#213756',
    top: height / 2 - 50,
    left: width / 2 - 50,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default WelcomeScreen;
