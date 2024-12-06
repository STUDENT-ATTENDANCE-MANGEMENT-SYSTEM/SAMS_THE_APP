import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { useSignUpMutation } from '../../features/auth/authApISlice';
import { useDispatch } from 'react-redux';
import { setUser, setSession, setRole } from '../../features/auth/authSlice';
import Toast from 'react-native-toast-message';
import { Formik } from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';

const colorPalette = {
  primary: '#f2575d', // cherry red
  secondary: '#213655', // dark blue
  accent: '#d4c4b4', // light brown
  background: '#f4ece4', // light peach
  textPrimary: '#4c749c', // light blue
  textSecondary: '#243454', // dark blue
  highlight: '#b8dce8', // very light blue
};

const SignUp = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'sign-up'>>();
  const { role } = route.params;
  const [signUp, { isLoading }] = useSignUpMutation();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Mr.', value: 'Mr.' },
    { label: 'Mrs.', value: 'Mrs.' },
    { label: 'Dr.', value: 'Dr.' },
    { label: 'Prof.', value: 'Prof.' },
    { label: 'Miss', value: 'Miss' },
    { label: 'Engr.', value: 'Engr.' },
  ]);

  const signUpSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&#.]/,
        'Password must contain at least one special character'
      )
      .required('Password is required'),
    institutionCode:
      role === 'admin'
        ? yup.string().required('Institution Code is required')
        : yup.string(),
    matricNumber:
      role === 'user'
        ? yup.string().required('Matric Number is required')
        : yup.string(),
    title:
      role === 'admin'
        ? yup.string().required('Title is required')
        : yup.string(),
  });

  const handleSignUp = async (values: any) => {
    try {
      const response = await signUp({
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        role,
        institutionCode: values.institutionCode,
        matricNumber: values.matricNumber,
        title: values.title,
      }).unwrap();
      dispatch(setUser(response.user));
      dispatch(setSession(response.session));
      dispatch(setRole(role));
      await AsyncStorage.setItem('session', JSON.stringify(response.session));
      Toast.show({
        type: 'success',
        text1: 'Sign Up Successful',
        text2: 'Welcome!',
      });
      navigation.navigate('(attendance)');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign Up Failed',
        text2: (error as any).message,
      });
      console.error('Failed to sign up:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colorPalette.background,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              institutionCode: '',
              matricNumber: '',
              title: '',
            }}
            validationSchema={signUpSchema}
            onSubmit={handleSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isValid,
              dirty,
            }) => (
              <FlatList
                data={[{ key: 'form' }]}
                renderItem={() => (
                  <SafeAreaView style={styles.container}>
                    <Text style={styles.title}>
                      Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      {role === 'admin' && (
                        <>
                          <View style={styles.pickerContainer}>
                            <DropDownPicker
                              open={open}
                              value={values.title}
                              items={items}
                              setOpen={setOpen}
                              setValue={(callback) => {
                                const value = callback(values.title);
                                setFieldValue('title', value);
                              }}
                              setItems={setItems}
                              style={styles.dropdown}
                              dropDownContainerStyle={styles.dropdownContainer}
                              placeholder='Select your title'
                            />
                          </View>
                          {touched.title && errors.title && (
                            <Text style={styles.errorText}>{errors.title}</Text>
                          )}
                          <TextInput
                            style={styles.input}
                            placeholder='First Name'
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.firstName && errors.firstName && (
                            <Text style={styles.errorText}>
                              {errors.firstName}
                            </Text>
                          )}
                          <TextInput
                            style={styles.input}
                            placeholder='Last Name'
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.lastName && errors.lastName && (
                            <Text style={styles.errorText}>
                              {errors.lastName}
                            </Text>
                          )}
                          <TextInput
                            style={styles.input}
                            placeholder='Institution Code'
                            onChangeText={handleChange('institutionCode')}
                            onBlur={handleBlur('institutionCode')}
                            value={values.institutionCode}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.institutionCode &&
                            errors.institutionCode && (
                              <Text style={styles.errorText}>
                                {errors.institutionCode}
                              </Text>
                            )}
                          <TextInput
                            style={styles.input}
                            placeholder='Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.email && errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                          )}
                          <View style={styles.passwordContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder='Password'
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              value={values.password}
                              secureTextEntry={!showPassword}
                              placeholderTextColor={colorPalette.textSecondary}
                            />
                            <TouchableOpacity
                              style={styles.showPasswordButton}
                              onPress={() => setShowPassword(!showPassword)}
                            >
                              <Ionicons
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={24}
                                color={colorPalette.primary}
                              />
                            </TouchableOpacity>
                          </View>
                          {touched.password && errors.password && (
                            <Text style={styles.errorText}>
                              {errors.password}
                            </Text>
                          )}
                          <TouchableOpacity
                            style={[
                              styles.button,
                              (!isValid || !dirty) && styles.buttonDisabled,
                            ]}
                            onPress={() => handleSubmit()}
                            disabled={!isValid || !dirty || isLoading}
                          >
                            {isLoading ? (
                              <ActivityIndicator color='#fff' />
                            ) : (
                              <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      {role === 'user' && (
                        <>
                          <TextInput
                            style={styles.input}
                            placeholder='First Name'
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            value={values.firstName}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.firstName && errors.firstName && (
                            <Text style={styles.errorText}>
                              {errors.firstName}
                            </Text>
                          )}
                          <TextInput
                            style={styles.input}
                            placeholder='Last Name'
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            value={values.lastName}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.lastName && errors.lastName && (
                            <Text style={styles.errorText}>
                              {errors.lastName}
                            </Text>
                          )}
                          <TextInput
                            style={styles.input}
                            placeholder='Matric Number'
                            onChangeText={handleChange('matricNumber')}
                            onBlur={handleBlur('matricNumber')}
                            value={values.matricNumber}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.matricNumber && errors.matricNumber && (
                            <Text style={styles.errorText}>
                              {errors.matricNumber}
                            </Text>
                          )}
                          <TextInput
                            style={styles.input}
                            placeholder='Email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholderTextColor={colorPalette.textSecondary}
                          />
                          {touched.email && errors.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                          )}
                          <View style={styles.passwordContainer}>
                            <TextInput
                              style={styles.input}
                              placeholder='Password'
                              onChangeText={handleChange('password')}
                              onBlur={handleBlur('password')}
                              value={values.password}
                              secureTextEntry={!showPassword}
                              placeholderTextColor={colorPalette.textSecondary}
                            />
                            <TouchableOpacity
                              style={styles.showPasswordButton}
                              onPress={() => setShowPassword(!showPassword)}
                            >
                              <Ionicons
                                name={showPassword ? 'eye' : 'eye-off'}
                                size={24}
                                color={colorPalette.primary}
                              />
                            </TouchableOpacity>
                          </View>
                          {touched.password && errors.password && (
                            <Text style={styles.errorText}>
                              {errors.password}
                            </Text>
                          )}
                          <TouchableOpacity
                            style={[
                              styles.button,
                              (!isValid || !dirty) && styles.buttonDisabled,
                            ]}
                            onPress={() => handleSubmit()}
                            disabled={!isValid || !dirty || isLoading}
                          >
                            {isLoading ? (
                              <ActivityIndicator color='#fff' />
                            ) : (
                              <Text style={styles.buttonText}>Sign Up</Text>
                            )}
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('sign-in')}
                    >
                      <Text style={styles.signInText}>
                        Already have an account? Sign in
                      </Text>
                    </TouchableOpacity>
                  </SafeAreaView>
                )}
                keyExtractor={(item) => item.key}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'center',
                }}
                showsVerticalScrollIndicator={false}
              />
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colorPalette.background,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colorPalette.primary,
  },
  input: {
    height: 40,
    borderColor: colorPalette.secondary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: colorPalette.textPrimary,
    width: '100%',
  },
  passwordContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  showPasswordButton: {
    position: 'absolute',
    right: '4%',
  },
  button: {
    backgroundColor: colorPalette.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  signInText: {
    color: colorPalette.primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
  },
  pickerContainer: {
    // marginBottom: 10,
  },
  dropdown: {
    borderColor: colorPalette.secondary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: colorPalette.textPrimary,
    backgroundColor: colorPalette.background,
    width: '100%',
  },
  dropdownContainer: {
    borderColor: colorPalette.secondary,
    backgroundColor: colorPalette.background,
  },
});

export default SignUp;
