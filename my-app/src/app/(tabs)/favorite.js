import { Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import Constants from "expo-constants";
import { Search } from "../../components/search";

const statusBarHeight = Constants.statusBarHeight;

export default function favoriteScreen() {
 return (
    <ScrollView 
    style={{flex: 1}} 
    className="bg-slate-50" 
    showsVerticalScrollIndicator={false}
    >
    
    <View className="w-full px-4"
    style={{marginTop: statusBarHeight + 8}}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Search/>

      <Text>Aqui será listado os itens favoritados</Text>

    </View>
    
    </ScrollView>
  );
}