import { View, Pressable, Text, TextInput, Button } from 'react-native';
import { Ionicons, Feather } from "@expo/vector-icons";



export function Header() {
  return (
    <View className='flex items-start justify-center w-full'>

      <View className='w-full flex-row border border-slate-500 h-14 rounded-full items-center gap-2 px-4 bg-transparent'>
          <Feather name='search' size={24} color='#045CF1'/>

          <TextInput placeholder='Pesquisar...' className='w-72 flex:1 h-full bg-transparent' />

      </View>

      <View className='flex flex-row pt-4 gap-1 mb-5'>
        <Feather name='map-pin' size={17} color='#3B3B3D'/>
        <Text className='text-lg font-bold '>Caxias - MA</Text>
      </View>

    </View>
  )
}