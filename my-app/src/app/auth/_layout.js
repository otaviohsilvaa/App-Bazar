import { Stack } from 'expo-router';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';



export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="signup" options={{ title: 'Cadastro', headerShown: false }} />
    </Stack>

  
  );
}
