import "../styles/global.css";
import { Slot, Stack } from "expo-router";

const StackLayout = () => {
    return(
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="product" options={{headerShown: false}}/>
      </Stack> 
    ) 
}

export default StackLayout;