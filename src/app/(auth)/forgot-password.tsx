import React from 'react';
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
import Toast from 'react-native-toast-message';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import { Formik } from 'formik';
import * as yup from 'yup';

const colorPalette = {
  primary: '#f2575d', // cherry red
  secondary: '#213655', // dark blue
  accent: '#d4c4b4', // light brown
  background: '#f4ece4', // light peach
  textPrimary: '#4c749c', // light blue
  textSecondary: '#243454', // dark blue
  highlight: '#b8dce8', // very light blue
};

const ForgotPassword = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const handleForgotPassword = async (values: any) => {
    try {
      // Implement password reset logic here
      Toast.show({
        type: 'success',
        text1: 'Password Reset Email Sent',
        text2: 'Please check your email to reset your password.',
      });
      navigation.navigate('sign-in');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Password Reset Failed',
        text2: (error as any).message,
      });
      console.error('Failed to reset password:', error);
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
            initialValues={{ email: '' }}
            validationSchema={forgotPasswordSchema}
            onSubmit={handleForgotPassword}
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
                <Text style={styles.title}>Forgot Password</Text>
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
                <TouchableOpacity
                  style={[
                    styles.button,
                    (!isValid || !dirty) && styles.buttonDisabled,
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={!isValid || !dirty}
                >
                  <Text style={styles.buttonText}>Reset Password</Text>
                </TouchableOpacity>
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
    marginBottom: 10,
    color: colorPalette.textPrimary,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 12,
  },
});

export default ForgotPassword;
