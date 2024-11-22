import React, { useState, useCallback } from 'react';
import { Text, View, ScrollView, StatusBar, TouchableOpacity, Image, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import axios from 'axios';
import Constants from "expo-constants";
import { IP_BASE } from "../../config/ip";
import { useRouter } from 'expo-router';
import { Search } from "../../components/search";

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

export default function FavoriteScreen() {
    const [favoritos, setFavoritos] = useState([]);
    const [filteredProdutos, setFilteredProdutos] = useState([]);
    const router = useRouter();

    const fetchFavorites = async () => {
        try {
            const response = await axios.get(`${IP_BASE}/favoritos`);
            setFavoritos(response.data);
            setFilteredProdutos(response.data); 
        } catch (error) {
            console.error("Erro ao buscar favoritos:", error);
        }
    };

    const removerFavorito = async (id_produto) => {
        try {
            await axios.delete(`${IP_BASE}/favoritos`, {
                data: { id_produto }
            });
            setFavoritos(favoritos.filter(favorito => favorito.id !== id_produto));
            setFilteredProdutos(filteredProdutos.filter(favorito => favorito.id !== id_produto)); 
        } catch (error) {
            console.error("Erro ao remover favorito:", error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [])
    );

    const handleProductClick = (produto) => {
        router.push(`/product/${produto.id}`);
    };

    const handleSearch = (text) => {
        const filtered = favoritos.filter(produto =>
            produto.titulo.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProdutos(filtered);
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


    return (
        <ScrollView style={{ flex: 1 }} className="bg-slate-50" showsVerticalScrollIndicator={false}>
            <View className="w-full px-4" style={{ marginTop: statusBarHeight + 8 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <Text className="font-extrabold text-2xl drop-shadow-2xl my-5 self-start" style={{ color: '#0286EA' }}>
                    Favoritos
                </Text>
                <Search onSearch={handleSearch} />
                {filteredProdutos.length > 0 ? (
                    filteredProdutos.map(favorito => (
                        <TouchableOpacity key={favorito.id} onPress={() => handleProductClick(favorito)}
                        className=' mb-5 mt-5 drop-shadow-2xl'>
                            <View style={{}} className='flex flex-row rounded-xl gap-3 border border-gray-400'>
                                <Image
                                    className=' w-44 h-37 rounded-l-lg'
                                    source={{ uri: favorito.imagem }}
                                />
                                <View className='flex flex-col items-start mt-2 flex-1 justify-between'>
                                <View className="items-start justify-start">
                                    <Text style={{ maxWidth: '100%' }}
                                    numberOfLines={2}
                                    ellipsizeMode='tail'
                                    className='font-semibold text-xl'>{favorito.titulo}</Text>
                                    <Text className=' text-gray-500 text-base leading-6' numberOfLines={3}>{favorito.descricao}</Text>
                                </View>
                                
                                <View className=' w-full items-center justify-center'>
                                    <View className='flex flex-row items-center justify-start pb-2'>
                                    <TouchableOpacity onPress={() => removerFavorito(favorito.id)} className="mt-2 bg-red-500 p-2 rounded">
                                    <Text className="text-white text-center">Remover favorito</Text>
                                    </TouchableOpacity> 
                                    </View>
                                </View>
                                </View>                          
                                
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>Nenhum produto favoritado.</Text>
                )}
            </View>
        </ScrollView>
    );
}
