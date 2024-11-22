import React, { useState } from 'react';
import { StatusBar, Button, TextInput, Text, View, StyleSheet, Pressable, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { router } from 'expo-router'; 
import axios from 'axios';
import { IP_BASE } from './../../../config/ip';
import * as ImagePicker from 'expo-image-picker';

export default function newProduct() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('Selecione');
  const [preco, setPreco] = useState('');
  const [imagemP, setImagemP] = useState(null);

  const data = [
    { key: 'eletronicos', label: 'Eletrônicos' },
    { key: 'roupas', label: 'Roupas' },
    { key: 'acessorios', label: 'Acessórios' },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagemP(result.assets[0].uri); 
    } else {
      console.log('Nenhuma imagem selecionada');
    }
  };

  const handleSubmit = () => {
    axios.post(`${IP_BASE}/novoproduto`, { titulo, descricao, categoria, preco, imagem: imagemP })
      .then(response => {
        Alert.alert(response.data.message);    
        router.back();
      })
      .catch(error => {
        Alert.alert('Algo deu errado, tente novamente');
      });
  };

  return (
    <ScrollView style={{ flex: 1 }} className="bg-slate-50" showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Inserir Produto</Text>

        <View style={styles.line} />

        {/* TÍTULO DO ANÚNCIO */}
        <Text style={styles.fieldLabel}>Título do Anúncio</Text>
        <TextInput style={styles.inputField} placeholder="Ex.: Iphone usado " value={titulo} onChangeText={setTitulo} />

        {/* DESCRIÇÃO */}
        <Text style={styles.fieldLabel}>Descrição</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Ex: Iphone 15 usado com 256gb de armazenamento, acompanha caixa e carregador, sem marca de uso."
          multiline={true}
          value={descricao} onChangeText={setDescricao}
        />

        {/* CATEGORIA */}
        <Text style={styles.fieldLabel}>Categoria</Text>
        <ModalSelector
          data={data}
          initValue="Selecione"
          onChange={(option) => setCategoria(option.label)}
          style={styles.modalSelector}
          initValueTextStyle={styles.initValueTextStyle}
        >
          <TextInput
            editable={false}
            placeholder="Selecione"
            value={categoria}
          />
        </ModalSelector>

        {/* PREÇO */}
        <Text style={styles.fieldLabel}>Preço (R$)</Text>
        <TextInput style={styles.inputField} placeholder="Digite o valor" keyboardType="numeric" value={preco} onChangeText={setPreco} />

        {/* IMAGEM */}
        <Text style={styles.fieldLabel}>Imagem do Produto</Text>
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
        </TouchableOpacity>
        {imagemP && <Image source={{ uri: imagemP }} style={styles.productImage} />}

        {/* BOTÃO */}
        <View className="items-center">
          <Pressable style={styles.formButton} onPress={handleSubmit}>
            <Text style={styles.textButton}>Publicar</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 10,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#045CF1', 
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalSelector: {
    borderWidth: 1,
    borderColor: '#045CF1',
    borderRadius: 5,
    marginBottom: 20,
    padding: 15,
  },
  initValueTextStyle: {
    color: '#000', 
  },
  imageButton: {
    backgroundColor: '#045CF1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  formButton: {
    padding: 10,
    backgroundColor: '#014BDB',
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',  
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
