import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Alert,
  Platform,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
  Pressable,
  Animated,
  RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AppLoading from 'expo-app-loading';
import userdata from '../../../../assets/data/userdata.json';

type Role = 'admin' | 'user';

type Course = {
  course_code: string;
  course_title: string;
  course_admin: string;
  locked: boolean;
};

const colorPalette: {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
  highlight: string;
} = {
  primary: '#f2575d',
  secondary: '#213655',
  accent: '#d4c4b4',
  background: '#fff',
  textPrimary: '#4c749c',
  textSecondary: '#243454',
  highlight: '#b8dce8',
};
const Home = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<Course[]>(userdata);
  // const [adminCourses, setAdminCourses] = useState<Course[]>(admindata);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  // add lecturer's name dynamically
  const [role, setRole] = useState<Role>('admin');
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const refreshAnim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );

      return () => backHandler.remove();
    }, [navigation])
  );
  const removeCourse = (courseCode: string) => {
    setCourses(courses.filter((course) => course.course_code !== courseCode));
  };

  const addCourse = () => {
    const newCourse: Course = {
      course_code: newCourseCode,
      course_title: newCourseTitle,
      course_admin: 'Admin',
      locked: false,
    };
    setCourses([...courses, newCourse]);
    setModalVisible(false);
    setNewCourseTitle('');
    setNewCourseCode('');
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Animated.spring(refreshAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Simulate a network request
    setTimeout(() => {
      // Refresh the data here
      setCourses(userdata); // Replace with your data fetching logic
      setRefreshing(false);
      Animated.spring(refreshAnim, {
        toValue: 0,
        friction: 5,
        useNativeDriver: true,
      }).start();
    }, 2000);
  }, [refreshAnim]);

  const filteredCourses = courses.filter(
    (course) =>
      course.course_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.course_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.course_admin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = useCallback(
    ({ item }: { item: Course }) => (
      <CourseItem
        course={item}
        onRemoveCourse={removeCourse}
        colorPalette={colorPalette}
        role={role}
      />
    ),
    [courses]
  );

  return (
    <View style={styles.container}>
      <>
        <BlurView intensity={5} style={styles.welcomeWrapper}>
          <Image source={require('../../../../assets/images/logo.png')} />
          <View style={styles.NotificationWrapper}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name='add' size={24} color='black' />
            </TouchableOpacity>
            <Ionicons name='notifications' size={24} color='black' />
          </View>
        </BlurView>

        <BlurView intensity={5} style={styles.welcomeWrapper}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for attendance"
            placeholderTextColor="#ccc"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        </BlurView>
      </>
      <FlatList
        data={filteredCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.course_code}
        numColumns={1}
        contentContainerStyle={styles.grid}
        // ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * index,
          index,
        })}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colorPalette.primary}
            title='Refreshing...'
            titleColor={colorPalette.primary}
            progressViewOffset={50}
            progressBackgroundColor={colorPalette.background}
            colors={[colorPalette.primary, colorPalette.secondary]}
          />
        }
      />

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurView intensity={50} style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add New Course</Text>
            {role === 'user' ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder='Attendance code'
                  value={newCourseTitle}
                  onChangeText={setNewCourseTitle}
                />

                <View style={styles.buttonContainer}>
                  <Button title='Add Course' />
                  <Button
                    title='Cancel'
                    onPress={() => setModalVisible(false)}
                    color='#f2575d'
                  />
                </View>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder='Course Title'
                  value={newCourseTitle}
                  onChangeText={setNewCourseTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder='Course Code'
                  value={newCourseCode}
                  onChangeText={setNewCourseCode}
                />
                <View style={styles.buttonContainer}>
                  <Button title='Add Course' onPress={addCourse} />
                  <Button
                    title='Cancel'
                    onPress={() => setModalVisible(false)}
                    color='red'
                  />
                </View>
              </>
            )}
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

const CourseItem = React.memo(
  ({
    course,
    onRemoveCourse,
    colorPalette,
    role,
  }: {
    course: Course;
    onRemoveCourse: (courseCode: string) => void;
    colorPalette: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      textPrimary: string;
      textSecondary: string;
      highlight: string;
    };
    role: Role;
  }) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleValue, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const handlePressOut = () => {
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    if (role === 'admin') {
      return (
        <View style={styles.card}>
          <Text style={styles.courseCode}>{course.course_code}</Text>
          <Text style={styles.courseTitle}>{course.course_title}</Text>
          
          <Ionicons
            name={course.locked ? 'lock-closed' : 'lock-open'}
            size={24}
            color={
              course.locked ? colorPalette.primary : colorPalette.highlight
            }
          />

          <>
            <TouchableOpacity
              onPress={() => onRemoveCourse(course.course_code)}
            >
              <Ionicons name='trash' size={24} color={'red'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log('copied to clipboard')}
            >
              <Ionicons name='copy' size={24} color={colorPalette.accent} />
            </TouchableOpacity>
          </>
        </View>
      );
    } else {
      return (
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ scale: scaleValue }],
            },
          ]}
        >
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => {
              console.log(
                'Please wait for the professor to unlock the course!'
              );
            }}
          >
            <Text style={styles.courseCode}>{course.course_code}</Text>
            <Text style={styles.courseTitle}>{course.course_title}</Text>
            <View style={styles.lock}>
            <Ionicons
              name={course.locked ? 'lock-closed' : 'lock-open'}
              size={24}
              color={
                course.locked ? colorPalette.primary : colorPalette.highlight
              }
            />
            </View>
            
            <Text style={styles.admin}>{course.course_admin}</Text>
          </Pressable>
        </Animated.View>
      );
    }
  },
  (prevProps, nextProps) => {
    return (
      prevProps.course === nextProps.course && prevProps.role === nextProps.role
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPalette.background,
    paddingHorizontal: '5%',
    // fontFamily: 'Roboto-Regular',
  },
  welcomeWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
  },
  NotificationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingLeft: 40,
    color: '#000',
  },
   searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    position: 'relative',
    borderWidth: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },

  grid: {
    // justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 150,
    // alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'relative',
  },
  courseCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  courseTitle: {
    fontSize: 14,
    color: '#888',
    paddingTop: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  lock: {
    position: 'absolute',
    top: -5,
    left: 280,

  },

  admin: {
    fontSize: 14,
    color: '#999',
    marginTop: 55,
  },
});

export default Home;
