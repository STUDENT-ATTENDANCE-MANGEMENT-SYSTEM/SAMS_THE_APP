import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    id: 1,
    title: 'Effortless Attendance Process',
    description:
      'Never worry about attendance again. Lecturers can easily manage and students can quickly submit attendance with a few clicks. ',
    image: require('../../assets/constant/Time.png'),
  },
  {
    id: 2,
    title: 'Real-Time Verification',
    description:
      'Say farewell to inaccurate and unreliable means of taking attendance. Our cutting-edge geolocation technology and proximity verification ensure only students physically present in your class can submit attendance.',
    image: require('../../assets/constant/Share.png'),
  },
  {
    id: 3,
    title: 'Insights and Reporting',
    description:
      'Gain valuable insights into attendance trends and patterns and make data-driven decisions to enhance student engagement and classroom dynamics.',
    image: require('../../assets/constant/data-visualization.png'),
  },
];

const buttonLabel = (label: string) => {
  return (
    <View style={{ backgroundColor: '#F02A4B', borderRadius: 15, padding: 10 }}>
      <Text style={{ color: 'white', width: 50, textAlign: 'center' }}>
        {label}
      </Text>
    </View>
  );
};

const onboarding = () => {
  const [showMorePage, setShowMorePage] = useState(false);
  const navigation = useNavigation();

  const onDone = async () => {
    await AsyncStorage.setItem('isNewUser', 'false');
    navigation.navigate('(auth)' as never);
    setShowMorePage(true);
  };

  if (!showMorePage) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        onDone={onDone}
        activeDotStyle={{ backgroundColor: '#F02A4B', width: 30 }}
        renderNextButton={() => buttonLabel('Next')}
        renderSkipButton={() => buttonLabel('Skip')}
        renderDoneButton={() => buttonLabel('Done')}
      />
    );
  }

  // return (
  //   <View>
  //     <Text>onboarding</Text>
  //   </View>
  // );
};

export default onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'gray',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
