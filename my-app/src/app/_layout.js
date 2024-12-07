import "../styles/global.css";
import { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <Stack>
      {/* Configurando as rotas principais */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{ headerShown: false }} />
      
      {/* Incluindo o diretório "auth" e desabilitando o cabeçalho */}
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
};

export default StackLayout;
