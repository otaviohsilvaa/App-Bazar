import { Text, View, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { Header } from "../../components/header";
import Constants from "expo-constants";
import { NewsProducts } from "../../components/news";

const statusBarHeight = Constants.statusBarHeight;

export default function searchScreen() {
 return (
    <ScrollView 
    style={{flex: 1}} 
    className="bg-slate-50" 
    showsVerticalScrollIndicator={false}
    >
    
    <View className=" w-full px-4"
    style={{marginTop: statusBarHeight + 8}}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

        <Header/>

        <NewsProducts/>


    </View>
    
    </ScrollView>
  );
}