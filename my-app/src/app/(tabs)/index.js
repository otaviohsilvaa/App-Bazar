import { Text, View, ScrollView, SafeAreaView, StatusBar } from "react-native";
import { Header } from "../../components/header";
import { Banner } from "../../components/banner";
import Constants from "expo-constants";
import { NewsProducts } from "../../components/news";

const statusBarHeight = Constants.statusBarHeight;

export default function () {
    return(
        <ScrollView 
        style={{flex: 1}} 
        className="bg-slate-50" 
        showsVerticalScrollIndicator={false}
        >
        
        <View className=" w-full px-4"
        style={{marginTop: statusBarHeight + 8}}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
            <Header/>

            <Banner/>

            <Text className="font-extrabold text-2xl drop-shadow-2xl my-5 self-start" style={{ color: '#0286EA' }}
            >Novidades</Text>
            
            <NewsProducts/>


        </View>
        
        </ScrollView>
        
    )
}