import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Pressable, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; 
import axios from 'axios';
import { IP_BASE } from './../../../config/ip';
import * as ImagePicker from 'expo-image-picker';

export default function UserInfos() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [senha, setSenha] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri); 
    } else {
      console.log('Nenhuma imagem selecionada');
    }
  };

  const handleUpdate = () => {
    const updatedData = {};

    if (nome) updatedData.nome = nome;
    if (email) updatedData.email = email;
    if (cpf) updatedData.cpf = cpf;
    if (celular) updatedData.celular = celular;
    if (senha) updatedData.senha = senha;
    if (profileImage) updatedData.foto_perfil = profileImage;

    if (Object.keys(updatedData).length === 0) {
      Alert.alert('Nenhuma informação foi modificada');
      return;
    }
    
    axios.post(`${IP_BASE}/atualizarusuario`, updatedData)
      .then(response => {
        Alert.alert(response.data.message); 
        router.back();
      })
      .catch(error => {
        Alert.alert('Erro ao atualizar os dados, tente novamente');
      });
  };

  return (
    <ScrollView style={{ flex: 1 }} className="bg-slate-50" showsVerticalScrollIndicator={false}>
      <View style={styles.container}>

        {/* IMAGEM DE PERFIL */}
        <View style={styles.profileContainer}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>Foto</Text>
            </View>
          )}
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Alterar Imagem de Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* CAMPOS DE ATUALIZAÇÃO */}
        <View style={styles.teste}>
          <View style={styles.containerInformations}>
            <TextInput 
              style={styles.TextInput} 
              placeholder='Atualizar Nome' 
              value={nome} 
              onChangeText={setNome}
            />
            <TextInput 
              style={styles.TextInput} 
              placeholder='Atualizar Email' 
              value={email} 
              onChangeText={setEmail}
            />
            <TextInput 
              style={styles.TextInput} 
              placeholder='Atualizar CPF' 
              value={cpf} 
              onChangeText={setCpf}
            />
            <TextInput 
              style={styles.TextInput} 
              placeholder="Atualizar Celular" 
              value={celular} 
              onChangeText={setCelular}
            />
            <TextInput 
              style={styles.TextInput} 
              placeholder="Atualizar Senha" 
              value={senha} 
              onChangeText={setSenha}
              secureTextEntry={true}  
            />
          </View>
        </View>

        {/* BOTÃO DE ATUALIZAÇÃO */}
        <Pressable style={styles.formButton} onPress={handleUpdate}>
          <Text style={styles.textButton}>Atualizar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  placeholderImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#757575',
    fontSize: 18,
  },
  imageButton: {
    backgroundColor: '#045CF1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  teste: {
    width: '80%',
  },
  TextInput: {
    fontSize: 18,
    borderColor: '#045CF1B2',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    color: '#979797',
  },
  formButton: {
    padding: 9,
    backgroundColor: '#014BDB',
    borderRadius: 10,
    alignItems: 'center',
    width: '50%',
    marginTop: 20,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
