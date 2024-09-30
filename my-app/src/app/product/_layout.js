// app/product/_layout.js
import { Stack } from 'expo-router';

export default function ProductLayout() {
  return (
    
    <Stack screenOptions={{
      headerStyle: {
          backgroundColor: "#0286EA"
      },
      headerTintColor: "#FFFFFF",
      title: ''
  }}>
      {/* Aqui você pode definir outras configurações se necessário */}
    </Stack>
  );
}
