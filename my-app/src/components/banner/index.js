import { View, Text, Pressable, Image } from 'react-native';
import PagerView  from "react-native-pager-view";

export function Banner() {
 return (
   <View className='w-full h-36 md:h-60 rounded-2xl mb-4'>
    <PagerView style={{ flex:1 }} initialPage={0} pageMargin={14}>

        <Pressable className='w-full h-36 md:h-60 rounded-2xl' key="1" onPress={() => console.log("Clicou no banner 1")}>
            <Image
            source={require("../../assets/images/banner1.jpg")}
            className='w-full h-36 md:h-60 rounded-2xl'
            />
        </Pressable>
        <Pressable className='w-full h-36 md:h-60 rounded-2xl' key="2" onPress={() => console.log("Clicou no banner 2")}>
            <Image
            source={require("../../assets/images/banner2.jpg")}
            className='w-full h-36 md:h-60 rounded-2xl'
            />
        </Pressable>
        <Pressable className='w-full h-36 md:h-60 rounded-2xl' key="3" onPress={() => console.log("Clicou no banner 2")}>
            <Image
            source={require("../../assets/images/banner3.jpeg")}
            className='w-full h-36 md:h-60 rounded-2xl'
            />
        </Pressable>
        

    </PagerView>
   </View>
  );
}