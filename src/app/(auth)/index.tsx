import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { template } from "@babel/core";
import { useNavigation } from '@react-navigation/native';


const Index = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require("../../../assets/constant/Idea.png")}
          style={styles.image}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.textOne}>
            The best way to manage your attendance efficiently and effectively
          </Text>
          <Text style={styles.textTwo}>Get started</Text>
        </View>

        <Pressable
          style={styles.buttonOne}
          onPress={() => navigation.navigate('(attendance)' as never)}
        >
          <Text style={styles.buttonText}>Student</Text>
        </Pressable>
        <Pressable
          style={styles.buttonTwo}
          onPress={() => navigation.navigate('(attendance)' as never)}
        >
          <Text style={styles.buttonTextTwo}>Educator</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: -20,
  },
  textWrapper: {
    flexDirection: "column",
    paddingHorizontal: 20,
    marginBottom: 20,
  },  
  textOne: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 20,
  },
  textTwo: {
    fontSize: 20,
    textAlign: "center",
  },
  buttonOne: {
    backgroundColor: "#f2575d",
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonTwo: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 30,
    borderColor: "#f2575d",
    borderWidth: 2,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  buttonTextTwo: {
    color: "black",
    fontSize: 18,
  },
});
