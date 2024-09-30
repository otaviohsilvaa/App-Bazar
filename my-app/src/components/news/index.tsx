import { FlatList, View } from 'react-native';
import { useState, useEffect } from "react";
import { CardProduct } from "./product";


// Interface criada para receber e montar os atributos do produto
export interface ProductProps{
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;

}

// Capturando os produtos da API fake (db.json)
export function NewsProducts() {
  const [product, setProducts] = useState<ProductProps[]>([])

  //Verificar o endereço IPV4 no cmd e atualizar antes dos 2 pontos(:)
  useEffect(() => {
    async function getProducts() {
      const response = await fetch("http://192.168.1.10:3000/foods")
      const data = await response.json()
      setProducts(data);
    }

    getProducts();
  },[])

 return (
  //Listagem de todos os produtos da API
  <View className=' flex-1 w-full h-full mb-11 gap-4 drop-shadow-2xl'>
    {product.map( product => (
      <CardProduct product={product} key={product.id}/>
    ))}
  </View>
 
   
  );
}