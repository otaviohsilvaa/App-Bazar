import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Pressable, Linking, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { IP_BASE } from '../../config/ip';

export default function Produto() {
  const { id } = useLocalSearchParams();
  const [produto, setProduto] = useState(null);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  const fetchProduto = async () => {
    try {
      const response = await axios.get(`${IP_BASE}/produtos/${id}`);
      if (response.data) {
        setProduto(response.data);
      } else {
        setError("Produto não encontrado.");
      }
    } catch (error) {
      setError("Erro ao buscar produto: " + error.message);
    }
  };

  const fetchFavoritos = async () => {
    try {
      const response = await axios.get(`${IP_BASE}/favoritos`);
      setFavoritos(response.data.map(fav => fav.id)); // Ajusta favoritos com IDs
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
    fetchProduto();
    fetchFavoritos(); // Carrega favoritos ao montar o componente
  }, []);

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!produto) {
    return <Text>Nenhum produto encontrado</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        className="bg-slate-50"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}
      >
        <Image style={styles.profileImage} source={{ uri: produto.imagem }} />

        <View className="w-full px-4">
          <View className="mt-3 gap-1">
            <View style={styles.precoContainer}>
              {/* Preço */}
              <Text style={{ color: "#30A851" }} className="text-5xl font-light">
                R$ {parseFloat(produto.preco).toFixed(2)}
              </Text>

              {/* Ícone de favorito */}
              <TouchableOpacity
                onPress={() => handleFavoriteClick(produto.id)}
                style={styles.iconeFavorito}
              >
                <Ionicons
                  name={favoritos.includes(produto.id) ? "heart" : "heart-outline"}
                  size={35}
                  color={favoritos.includes(produto.id) ? "red" : "gray"}
                />
              </TouchableOpacity>
            </View>

            <Text className="text-2xl font-medium">{produto.titulo}</Text>

            <Text
              style={{ color: "#3B3B3D" }}
              className="text-xl leading-6"
              numberOfLines={expanded ? undefined : 3}
            >
              {produto.descricao}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Text className="text-blue-500">
                {expanded ? "Ler menos" : "Ler mais"}
              </Text>
            </TouchableOpacity>

            <Text>Publicado em (data)</Text>
          </View>

          <Text className="font-bold text-2xl mt-5 mb-1 self-start">
            Anunciante
          </Text>

          <View className="flex-row gap-2 items-center justify-center rounded w-full h-20 bg-slate-200">
            <Image
              className="w-14 h-14 bg-black rounded-full"
              source={{ uri: produto.foto_perfil }}
            />
            <Text className="text-xl font-bold">{produto.nome_usuario}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          className="flex-row items-center justify-center bg-blue-800 p-3 rounded-2xl w-3/5 gap-2"
          onPress={() => Linking.openURL(`https://wa.me/55${produto.celular}`)}
        >
          <Text className="text-white font-extrabold text-2xl">Comprar</Text>
          <Ionicons className="mt-1" name="logo-whatsapp" size={24} color={"#FFFF"} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  precoContainer: {
    flexDirection: "row", // Organiza em linha
    alignItems: "center", // Centraliza verticalmente
    justifyContent: "space-between", // Espaçamento entre preço e ícone
  },
  iconeFavorito: {
    marginLeft: 10, // Espaçamento entre o preço e o ícone
  },
});
