// src/app/WelcomeScreen.tsx
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Animated, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Logo from "../../assets/svg/logo.svg";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("(attendance)" as never);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Logo style={styles.logo}/>
      <StatusBar style="auto"/>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: "30%",
    
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100, 
    height: 100, 
  },
});

export default WelcomeScreen;
