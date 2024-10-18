import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import React from 'react';
import { Ionicons, Feather } from "@expo/vector-icons";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Entre em sua conta</Text>

      {/* Campo de e-mail com ícone de cartinha */}
      <View style={styles.inputContainer}>
        <TextInput style={styles.formInput} placeholder='E-mail' />
        <Ionicons name="mail-outline" size={24} color="#014BDB" style={styles.icon} />
      </View>

      {/* Campo de senha com ícone de cadeado */}
      <View style={styles.inputContainer}>
        
        <TextInput style={styles.formInput} placeholder='Senha' secureTextEntry={true}/>
        <Feather name="lock" size={24} color="#014BDB" style={styles.icon} />
      </View>

      <View style={styles.subContainer}>
        {/* Botão de "Esqueci minha senha" */}
        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton}>Esqueci minha senha</Text>
        </Pressable>
      </View>

      <View style={styles.bottomInputsContainer}>
        {/* Botão de "Entrar" */}
        <Pressable style={styles.blueInput} onPress={() => alert('Entrar Pressionado')}>
          <Text style={styles.textButton}>Entrar</Text>
        </Pressable>

        {/* Botão de "Cadastre-se" com texto azul */}
        <Pressable style={styles.blueBorderInput} onPress={() => alert('Cadastre-se Pressionado')}>
          <Text style={styles.blueTextButton}>Cadastre-se</Text>
        </Pressable>

        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton02}>Navegar sem uma conta</Text>
        </Pressable>
      </View>
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
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0273F0',
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row', 
    alignItems: 'center',
    borderColor: '#014BDB',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    margin: 10,
  },
  icon: {
    marginRight: 10, 
  },
  formInput: {
    flex: 1, 
    fontSize: 22,
  },
  subContainer: {
    width: '80%', 
    alignItems: 'flex-end', 
    marginBottom: 20,  
  },
  subTextButton: {
    color: '#0273F0',
    fontSize: 15,
  },
  bottomInputsContainer: {
    width: '80%',
    marginTop: 20,
    alignItems: 'center',
  },
  blueInput: {
    fontSize: 22,
    backgroundColor: 'blue',
    borderRadius: 10,
    color: 'white',
    width: '100%',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  blueBorderInput: {
    fontSize: 22,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  blueTextButton: {
    color: '#014BDB',
    fontSize: 20,
    fontWeight: 'bold',
  },

  subTextButton02: {
    color: '#0273F0',
    fontSize: 20,
  },
});
