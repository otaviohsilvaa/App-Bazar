import { View, Pressable, Text, Image } from 'react-native';
import { ProductProps } from "..";
import { Ionicons } from "@expo/vector-icons";

export function CardProduct({product}: {product: ProductProps }) {
 return (
  //Card do produto
    <Pressable 
    onPress={() => console.log("Ir para a pagina do produto")} //Adicionar ação de enviar as informações do produto para a outra página
    style={{}} className='flex flex-row rounded-xl gap-3 border border-gray-400'>
    <Image //Imagem do produto
    source={{ uri: product.image }}
    className=' w-44 h-36 rounded-l-lg'
    />
    <View className='flex flex-col items-start mt-2 flex-1 justify-between'>
      <View className="items-start justify-start">
        <Text style={{ maxWidth: '100%' }}
          numberOfLines={2}
          ellipsizeMode='tail'
          className='font-semibold text-xl'>{product.name}</Text>
      </View>
      

      <View>

        <View className='flex flex-row gap-1 items-center justify-center'>
        <Image //Perfil do vendedor
        className='w-6 h-6 bg-black rounded-full'
        />
        <Text className='text-sm'>Nome do vendedor</Text>
        </View>

        <View className='flex flex-row items-center justify-start pb-2'>
          <Text className='text-2xl opacity-30'>Por: </Text>
        <Text className='font-medium text-2xl' style={{color: '#30A851'}}>R$ {product.price}</Text>
        </View>
        

      </View>
    </View>
   </Pressable>

   
  );
}