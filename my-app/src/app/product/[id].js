import { View, StyleSheet, Text, StatusBar, ScrollView, Image, TouchableOpacity  } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';


export default function product() {
  //Função recebe os parâmetros passados pelo card do produto
  const {id, name, price, description, image } = useLocalSearchParams();

  const [expanded, setExpanded] = useState(false);
  
 return (
  
<View style={{flex: 1}} >
<ScrollView 
  className="bg-slate-50" 
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{paddingBottom:80}}
  >

  <Image
    source={{uri: image}}
    style={{width: 360, height: 330}}
    />

  <View className="w-full px-4">
    
        <View className='mt-3 gap-1'>
          <Text style={{ color: '#30A851'}} className='text-5xl font-light'>
            R$ {price}
          </Text>

          <Text className='text-2xl font-medium'>
            {name}
          </Text>

          <Text style={{ color: '#3B3B3D'}} className='text-xl leading-6' numberOfLines={expanded ? undefined : 3}>
            {description}
          </Text>
          {/* Botão para expandir/contrair o texto */}
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text className="text-blue-500">
              {expanded ? 'Ler menos' : 'Ler mais'}
            </Text>
          </TouchableOpacity>

          <Text>
            Publicado em (data)
          </Text>
        </View>

        <Text className="font-bold text-2xl mt-5 mb-1 self-start">
          Anunciante
        </Text>

        <View 
        className='flex-row gap-2 items-center justify-center rounded w-full h-20 bg-slate-200'>
          <Image //Perfil do vendededor
          className='w-14 h-14 bg-black rounded-full'
          />
          <View>
            <Text className='text-xl font-bold'>Nome do vendedor</Text>
            <Text className='text-base'>Usuário desde fevereiro de 2024</Text>
          </View>
        </View>
  </View>
  </ScrollView>

  <View style={styles.footer}>
    <TouchableOpacity className=' flex-row tems-center justify-center bg-blue-800 p-3 rounded-2xl w-3/5 gap-2'>
      <Text className='text-white font-extrabold text-2xl'>Comprar</Text>
      <Ionicons className='mt-1' name='logo-whatsapp' size={24} color={'#FFFF'}/>
    </TouchableOpacity>
  </View>

  </View>
  
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
});
