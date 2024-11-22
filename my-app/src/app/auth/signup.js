import { StyleSheet, View, Text, TextInput, Pressable, Alert, Image, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { router } from 'expo-router'; 
import { IP_BASE } from '../../config/ip';
import * as ImagePicker from 'expo-image-picker';

export default function CadastroScreen() {

  const [nomeUsuario, setNomeUsuario] = useState('');
  const [cpfUsuario, setCpfUsuario] = useState('');
  const [celularUsuario, setCelularUsuario] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaUsuario, setSenhaUsuario] = useState('');
  const [profileImage, setProfileImage] = useState(null);

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

  const handleSubmit = async () => {
    if (!profileImage) {
      console.error('Nenhuma imagem selecionada');
      Alert.alert('Selecione uma imagem de perfil!');
      return;
    }else{
      Alert.alert('Deu certo')
    };

    try {
      const response = await axios.post(`${IP_BASE}/cadastro`, {
        nomeUsuario,
        cpfUsuario,
        celularUsuario,
        emailUsuario,
        senhaUsuario,
        profile_image: profileImage,
      });
      
      
      if (response.status === 201) {
        Alert.alert(response.data.message);
        axios.post(`${IP_BASE}/login`, { emailUsuario, senhaUsuario });
        router.replace('/');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.formTitle}>Realize seu cadastro</Text>

      {/* Campo de Nome com ícone de pessoa */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.formInput} placeholder="Nome" value={nomeUsuario} onChangeText={setNomeUsuario} />
        <Ionicons name="person-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>      

      {/* Campo de CPF com ícone de documento */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.formInput} placeholder="CPF" value={cpfUsuario} onChangeText={setCpfUsuario} />
        <Ionicons name="document-text-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Campo de Celular com ícone de telefone */}
      <View style={styles.inputContainer}>        
        <TextInput style={styles.formInput} placeholder="Celular" value={celularUsuario} onChangeText={setCelularUsuario} />
        <Feather name="phone" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Campo de E-mail com ícone de caixa de mensagem */}
      <View style={styles.inputContainer}>        
        <TextInput style={styles.formInput} placeholder="E-mail" value={emailUsuario} onChangeText={setEmailUsuario} />
        <Ionicons name="mail-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Campo de Senha com ícone de chave */}
      <View style={styles.inputContainer}>        
        <TextInput style={styles.formInput} placeholder="Senha" value={senhaUsuario} onChangeText={setSenhaUsuario} secureTextEntry={true} />
        <Ionicons name="key-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Botão para selecionar imagem de perfil */}
      <Button title="Selecionar Imagem de Perfil" onPress={pickImage} />
      {profileImage && <Image source={{ uri: profileImage }} style={{ width: 100, height: 100, marginVertical: 10 }} />}

      {/* Botão de enviar */}
      <Pressable style={styles.formButton} onPress={handleSubmit}>
        <Text style={styles.textButton}>Cadastrar</Text>
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
  },
  formTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0273F0',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderColor: '#045CF1B2',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10, 
  },
  formInput: {
    flex: 1,  
    fontSize: 18,
  },
  formButton: {
    backgroundColor: '#014BDB',
    width: '80%',
    marginTop: 30,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
