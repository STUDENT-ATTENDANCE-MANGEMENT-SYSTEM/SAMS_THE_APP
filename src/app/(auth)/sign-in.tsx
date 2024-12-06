import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { useSignInMutation } from '../../features/auth/authApISlice';
import { useDispatch } from 'react-redux';
import { setUser, setSession, setRole } from '../../features/auth/authSlice';
import { Formik } from 'formik';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable } from 'react-native';

const colorPalette = {
  primary: '#f2575d', // cherry red
  secondary: '#213655', // dark blue
  accent: '#d4c4b4', // light brown
  background: '#f4ece4', // light peach
  textPrimary: '#4c749c', // light blue
  textSecondary: '#243454', // dark blue
  highlight: '#b8dce8', // very light blue
};

const SignIn = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [signIn, { isLoading }] = useSignInMutation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const signInSchema = yup.object().shape({
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
  });

  const handleSignIn = async (values: any) => {
    try {
      const response = await signIn({
        email: values.email,
        password: values.password,
      }).unwrap();
      dispatch(setUser(response.user));
      dispatch(setSession(response.session));
      dispatch(setRole(response.user.user_metadata.role));
      await AsyncStorage.setItem('session', JSON.stringify(response.session));
      Toast.show({
        type: 'success',
        text1: 'Sign In Successful',
        text2: 'Welcome back!',
      });
      navigation.navigate('(attendance)');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: (error as any).message,
      });
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: colorPalette.background,
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={signInSchema}
            onSubmit={handleSignIn}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              dirty,
            }) => (
              <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Sign In</Text>
                <View
                  style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                >
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
                    <Text style={styles.errorText}>{errors.password}</Text>
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
                      <Text style={styles.buttonText}>Sign In</Text>
                    )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={styles.signUpText}
                    onPress={() =>
                      navigation.navigate('sign-up', { role: 'user' })
                    }
                  >
                    Sign Up
                    {/* <Text>Sign up</Text> */}
                  </Text>
                  <Text
                    style={styles.forgotPasswordText}
                    onPress={() => navigation.navigate('forgot-password')}
                  >
                    Forgot password
                    {/* <Text>Forgot Password</Text> */}
                  </Text>
                </View>
              </SafeAreaView>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colorPalette.primary,
    textAlign: 'center',
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
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  forgotPasswordText: {
    marginTop: 10,
    color: colorPalette.primary,
    // textAlign: 'center',
    textDecorationLine: 'underline',
  },
  signUpText: {
    marginTop: 10,
    color: colorPalette.primary,
    // textAlign: 'center',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
  },
});

export default SignIn;
