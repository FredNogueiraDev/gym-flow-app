import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import 'react-native-reanimated';
import 'react-native-url-polyfill/auto';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0c1018' }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0c1018' }, 
          animation: 'slide_from_right', 
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
      </Stack>

      <StatusBar style="light" backgroundColor="#0c1018" />
    </View>
  );
}