import { Stack } from 'expo-router';

export default function UserLayout() {
  return (
    <Stack screenOptions={{
        headerStyle: {
            backgroundColor: "#0286EA"
        },
        headerTintColor: "#FFFFFF"
    }}>
      <Stack.Screen name="index" options={{ title: 'Perfil', headerShown: false}} />
      <Stack.Screen name="myproducts" options={{ title: '' }} />
      <Stack.Screen name="newproduct" options={{ title: '' }} />
      <Stack.Screen name="userinfo" options={{ title: 'Informações' }} />
      <Stack.Screen name="Login" options={{ headerShown: false}} />
    </Stack>
  );
}
