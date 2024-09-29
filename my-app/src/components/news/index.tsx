import { FlatList, View } from 'react-native';
import { useState, useEffect } from "react";
import { CardProduct } from "./product";


// Interface criada para receber e montar os atributos do produto
export interface ProductProps{
  id: string;
  name: string;
  price: number;
  time: string;
  delivery: string;
  rating: number;
  image: string;
  restaurantId: string;
}

// Capturando os produtos da API
export function NewsProducts() {
  const [product, setProducts] = useState<ProductProps[]>([])

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
  <FlatList
   data={product}
   renderItem={ ({item}) => <CardProduct product={item}/>}
   contentContainerStyle={{gap: 14}}
   showsVerticalScrollIndicator={false}
   />
 
   
  );
}