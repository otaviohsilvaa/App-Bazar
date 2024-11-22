import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Button, Alert, SafeAreaView, StatusBar, Image } from "react-native";
import { useFocusEffect } from 'expo-router';
import axios from "axios";
import { Header } from "../../components/header";
import Constants from "expo-constants";
import { IP_BASE } from "../../config/ip";
import { useRouter } from 'expo-router';

const statusBarHeight = Constants.statusBarHeight;

const styles = {
    imagemProduto: {
        width: '100%',        
        height: 200,           
        resizeMode: 'cover',  
        borderRadius: 10,      
        marginVertical: 10,    
    },
};

export default function HomeScreen() {
    const [produtos, setProdutos] = useState([]);
    const [filteredProdutos, setFilteredProdutos] = useState([]);
    const [favoritos, setFavoritos] = useState([]);
    const router = useRouter();

    const fetchProdutos = async () => {
        try {
            const response = await axios.get(`${IP_BASE}/todosprodutos`);
            setProdutos(response.data);
            setFilteredProdutos(response.data); 
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const fetchFavoritos = async () => {
        try {
            const response = await axios.get(`${IP_BASE}/favoritos`);
            setFavoritos(response.data.map(fav => fav.id));
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
        }
    };

    const handleFavoriteClick = async (produtoId) => {
        try {
            if (favoritos.includes(produtoId)) {
                await axios.delete(`${IP_BASE}/favoritos`, { data: { id_produto: produtoId } });
                setFavoritos(favoritos.filter(id => id !== produtoId));
                Alert.alert("Favoritos", "Produto removido dos favoritos!");
            } else {
                await axios.post(`${IP_BASE}/adicionar_favorito`, { id_produto: produtoId });
                setFavoritos([...favoritos, produtoId]);
                Alert.alert("Favoritos", "Produto adicionado aos favoritos!");
            }
        } catch (error) {
            console.error("Erro ao gerenciar favorito:", error);
            Alert.alert("Erro", "Não foi possível atualizar os favoritos.");
        }
    };

    useEffect(() => {
        fetchProdutos();
        fetchFavoritos();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchProdutos();
            fetchFavoritos();
        }, [])
    );

    const handleProductClick = (produto) => {
        router.push(`/product/${produto.id}`);
    };

    const handleSearch = (text) => {
        setFilteredProdutos(
            produtos.filter(produto =>
                produto.titulo.toLowerCase().includes(text.toLowerCase())
            )
        );
    };

    return (
        <ScrollView
            style={{ flex: 1 }}
            className="bg-slate-50"
            showsVerticalScrollIndicator={false}
        >
            <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <Header onSearch={handleSearch} />


                {filteredProdutos.length > 0 ? (
                    filteredProdutos.map(produto => (
                        <TouchableOpacity key={produto.id} onPress={() => handleProductClick(produto)}
                        className=' mb-5 drop-shadow-2xl'>
                            <View style={{}} className='flex flex-row rounded-xl gap-3 border border-gray-400'>
                                <Image
                                    className=' w-44 h-37 rounded-l-lg'
                                    source={{ uri: produto.imagem }}
                                />
                                <View className='flex flex-col items-start mt-2 flex-1 justify-between'>
                                <View className="items-start justify-start">
                                    <Text style={{ maxWidth: '100%' }}
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                    className='font-semibold text-xl'>{produto.titulo}</Text>
                                    <Text className=' text-gray-500 text-base leading-6' numberOfLines={3}>{produto.descricao}</Text>
                                </View>
                                

                                <View>
                                    <View className='flex flex-row items-center justify-start pb-2'>
                                    <Text className='text-2xl opacity-30'>Por: </Text>
                                    <Text className='font-normal text-2xl' style={{color: '#30A851'}}>R$ {produto.preco}</Text>
                                    </View>
                                </View>
                                </View>                          
                                {/*<Button 
                                    title={favoritos.includes(produto.id) ? "Remover Favorito" : "Favoritar"} 
                                    onPress={() => handleFavoriteClick(produto.id)} 
                                /> */}
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>Nenhum produto encontrado</Text>
                )}
            </View>
        </ScrollView>
    );
}
