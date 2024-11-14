import React, { useState, useCallback } from 'react';
import { Text, View, ScrollView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import Constants from "expo-constants";
import { IP_BASE } from "../ip";
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
                        <TouchableOpacity key={favorito.id} onPress={() => handleProductClick(favorito)}>
                            <View className="my-2 p-4 bg-white rounded-lg shadow-md">
                            <Image
                                    style={styles.imagemProduto}
                                    source={{ uri: favorito.imagem }}
                                />
                                <Text className="text-lg font-bold">{favorito.titulo}</Text>
                                <Text className="text-sm text-gray-500">{favorito.descricao}</Text>
                                <Text className="text-sm text-blue-500">{favorito.categoria}</Text>
                                <Text className="text-lg text-green-600">R$ {parseFloat(favorito.preco).toFixed(2)}</Text>
                                <TouchableOpacity onPress={() => removerFavorito(favorito.id)} className="mt-2 bg-red-500 p-2 rounded">
                                    <Text className="text-white text-center">Remover favorito</Text>
                                </TouchableOpacity> 
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
