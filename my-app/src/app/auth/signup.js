import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function CadastroScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Realize seu cadastro</Text>

      {/* Campo de Nome com ícone de pessoa */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.formInput} placeholder="Nome" />
        <Ionicons name="person-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Campo de Sobrenome com ícone de pessoa */}
      <View style={styles.inputContainer}>        
        <TextInput style={styles.formInput} placeholder="Sobrenome" />
        <Ionicons name="person-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Campo de CPF com ícone de documento */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.formInput} placeholder="CPF" />
        <Ionicons name="document-text-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Campo de Celular com ícone de telefone */}
      <View style={styles.inputContainer}>        
        <TextInput style={styles.formInput} placeholder="Celular" />
        <Feather name="phone" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Campo de E-mail com ícone de caixa de mensagem */}
      <View style={styles.inputContainer}>        
        <TextInput style={styles.formInput} placeholder="E-mail" />
        <Ionicons name="mail-outline" size={24} color="#045CF1B2" style={styles.icon} />
      </View>

      {/* Botão de enviar */}
      <Pressable style={styles.formButton} onPress={() => alert('Cadastro enviado')}>
        <Text style={styles.textButton}>Continuar</Text>
      </Pressable>
    </View>
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
