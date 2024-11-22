import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, Pressable, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { IP_BASE } from './../../../config/ip';

export default function MyProducts() {
  const [produtos, setProdutos] = useState([]);

  const fetchProdutos = () => {
    axios.get(`${IP_BASE}/meusprodutos`)
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        Alert.alert('Erro ao buscar produtos', 'Tente novamente mais tarde');
      });
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${IP_BASE}/meusprodutos/${id}`)
      .then(response => {
        Alert.alert('Sucesso', response.data.message);
        fetchProdutos(); 
      })
      .catch(error => {
        Alert.alert('Erro ao excluir produto', 'Tente novamente mais tarde');
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image
        style={styles.imagemProduto}
        source={{ uri: item.imagem }}/>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text>{item.descricao}</Text>
      <Text>Categoria: {item.categoria}</Text>
      <Text>Preço: R$ {item.preco}</Text>

      <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.buttonText}>Excluir</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Meus Produtos</Text>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#014BDB',
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  imagemProduto: {
    width: '100%',         
    height: 200,           
    resizeMode: 'cover',   
    borderRadius: 10,      
    marginVertical: 10,    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
