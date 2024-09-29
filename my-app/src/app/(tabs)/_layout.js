import { Tabs, Stack } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function Layout(){
    return(
        <Tabs>
            <Tabs.Screen name="index" options={{
                title: "Inicial", 
                headerShown: false,
                tabBarIcon: ({focused, color, size }) => {
                    const iconColor = focused ? '#045CF1' : 'rgba(4, 92, 241, 0.5)';
                    return <Ionicons name="home" color={iconColor} size={size}/>
                }}}/>

            <Tabs.Screen name="search" options={{
                title: "Pesquisa",
                headerShown: false,
                tabBarIcon: ({focused, color, size }) => {
                    const iconColor = focused ? '#045CF1' : 'rgba(4, 92, 241, 0.5)';
                    return <Ionicons name="search" color={iconColor} size={size}/>
                }
                }}/>

            <Tabs.Screen name="favorite" options={{
                title: "Favoritos",
                headerShown: false,
                tabBarIcon: ({focused, color, size }) => {
                    const iconColor = focused ? '#045CF1' : 'rgba(4, 92, 241, 0.5)';
                    return <Ionicons name="heart" color={iconColor} size={size}/>
                }
                }}/>

            <Tabs.Screen name="user" options={{
                title: "Perfil",
                headerShown: false,
                tabBarIcon: ({focused, color, size }) => {
                    const iconColor = focused ? '#045CF1' : 'rgba(4, 92, 241, 0.5)';
                    return <Ionicons name="menu" color={iconColor} size={size}/>
                }
                }}/>
        </Tabs>
    )
}