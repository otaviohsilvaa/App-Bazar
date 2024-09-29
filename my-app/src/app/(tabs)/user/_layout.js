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
      <Stack.Screen name="myproducts" options={{ title: 'Meus Produtos' }} />
      <Stack.Screen name="newproduct" options={{ title: 'Novo Produto' }} />
      <Stack.Screen name="userinfo" options={{ title: 'Informações' }} />
    </Stack>
  );
}
