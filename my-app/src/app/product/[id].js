import { View, StyleSheet, Text, StatusBar, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function product() {
  const {id, name, price, description, image } = useLocalSearchParams();
 return (
  <ScrollView 
  style={{flex: 1}} 
  className="bg-slate-50" 
  showsVerticalScrollIndicator={false}
  >
  
  <View className="w-full">
    <Image
    source={{uri: image}}
    style={{width: 360, height: 330}}
    />

        <View className='px-4'>
          <Text style={{ color: '#30A851'}} className='text-5xl font-light'>
            R$ {price}
          </Text>

          <Text className='text-2xl font-medium'>
            {name}
          </Text>

          <Text style={{ color: '#3B3B3D'}} className='text-xl leading-6'>
            {description}
          </Text>
        </View>

  

  </View>
  
  </ScrollView>
  );
}