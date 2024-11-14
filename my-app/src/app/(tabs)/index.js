import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Button, Alert, StatusBar, Image } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios";
import { Header } from "../../components/header";
import { Banner } from "../../components/banner";
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
            console.error("Não há usuário logado:", error);
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
            style={{ flex: 1, backgroundColor: '#f8fafc' }}
            showsVerticalScrollIndicator={false}
        >
            <View style={{ width: '100%', paddingHorizontal: 16, marginTop: statusBarHeight + 8 }}>
                <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
                <Header onSearch={handleSearch} />
                <Banner />
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#0286EA', marginVertical: 20 }}>
                    Novidades
                </Text>

                {filteredProdutos.length > 0 ? (
                    filteredProdutos.map(produto => (
                        <TouchableOpacity key={produto.id} onPress={() => handleProductClick(produto)}>
                            <View style={{ padding: 16, backgroundColor: 'white', borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, marginBottom: 10 }}>
                                <Image
                                    style={styles.imagemProduto}
                                    source={{ uri: produto.imagem }}
                                />
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{produto.titulo}</Text>
                                <Text style={{ fontSize: 14, color: '#6b7280' }}>{produto.descricao}</Text>
                                <Text style={{ fontSize: 14, color: '#3b82f6' }}>{produto.categoria}</Text>
                                <Text style={{ fontSize: 18, color: '#10b981' }}>R$ {parseFloat(produto.preco).toFixed(2)}</Text>                                
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
