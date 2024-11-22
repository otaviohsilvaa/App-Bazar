import { Redirect } from "expo-router";

const StartPage = () => {
  // Redireciona para a home assim que o app inicia
  return <Redirect href="/(tabs)" />;
};

export default StartPage;
