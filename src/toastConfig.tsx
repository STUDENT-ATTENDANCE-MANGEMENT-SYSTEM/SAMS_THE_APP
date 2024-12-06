import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';

const colorPalette = {
  primary: '#f2575d', // cherry red
  secondary: '#213655', // dark blue
  accent: '#d4c4b4', // light brown
  background: '#f4ece4', // light peach
  textPrimary: '#4c749c', // light blue
  textSecondary: '#243454', // dark blue
  highlight: '#b8dce8', // very light blue
};

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colorPalette.primary }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: colorPalette.textPrimary,
      }}
      text2Style={{
        fontSize: 13,
        color: colorPalette.textSecondary,
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colorPalette.primary }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: colorPalette.textPrimary,
      }}
      text2Style={{
        fontSize: 13,
        color: colorPalette.textSecondary,
      }}
    />
  ),
};

export default toastConfig;
