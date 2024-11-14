import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Button, Alert, SafeAreaView, StatusBar, Image } from "react-native";
import { useFocusEffect } from 'expo-router';
import axios from "axios";
import { Header } from "../../components/header";
import Constants from "expo-constants";
import { IP_BASE } from "../ip";
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
                        <TouchableOpacity key={produto.id} onPress={() => handleProductClick(produto)}>
                            <View className="my-2 p-4 bg-white rounded-lg shadow-md">
                                <Image
                                    style={styles.imagemProduto}
                                    source={{ uri: produto.imagem }}
                                />
                                <Text className="text-lg font-bold">{produto.titulo}</Text>
                                <Text className="text-sm text-gray-500">{produto.descricao}</Text>
                                <Text className="text-sm text-blue-500">{produto.categoria}</Text>
                                <Text className="text-lg text-green-600">R$ {parseFloat(produto.preco).toFixed(2)}</Text>                                
                                <Button 
                                    title={favoritos.includes(produto.id) ? "Remover Favorito" : "Favoritar"} 
                                    onPress={() => handleFavoriteClick(produto.id)} 
                                />
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
