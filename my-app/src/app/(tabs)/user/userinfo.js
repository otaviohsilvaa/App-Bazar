import { Text, View, StatusBar , StyleSheet, Image, TextInput, Pressable, ScrollView } from 'react-native';
import React from 'react';

export default function myProducts() {
  return (
    <ScrollView
    style={{flex: 1}} 
    className="bg-slate-50" 
    showsVerticalScrollIndicator={false}>

      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image style={styles.profileImage} source={{ uri: 'https://as1.ftcdn.net/v2/jpg/04/81/85/46/1000_F_481854656_gHGTnBscKXpFEgVTwAT4DL4NXXNhDKU9.jpg' }} />
        </View>
      
        <View style={styles.containerTwo}>
          <TextInput style={styles.textInputSmall} placeholder='Fabio'/>
          <TextInput style={styles.textInputSmall} placeholder='Ferreira'/>
        </View>

        <View style={styles.teste}>
          <View style={styles.containerInformations}>
            <TextInput style={styles.TextInput} placeholder='fabiozika@gmail.com'/>
            <TextInput style={styles.TextInput} placeholder='123.456.789.10'/>
            <TextInput style={styles.TextInput} placeholder="(99)9998877-16655"/>
            <Pressable>
              <Text style={styles.TextInput}>Nova senha</Text>
              <Text style={styles.TextInput}>Confirme a senha</Text>
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.formButton} onPress={() => alert('Alterações salvas')}>
          <Text style={styles.textButton}>Salvar</Text>
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
  profileContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor:'red',
  },
  containerTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  textInputSmall: {
    fontSize: 18,
    borderColor: '#045CF1B2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '48%', 
    color:'#979797',
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
    marginVertical: 10,
    color:'#979797',
  },
  formButton: {
    padding: 9,
    backgroundColor: '#014BDB',
    borderRadius: 10,
    alignItems: 'center',
    width: '50%', // O botão preenche 70% da página
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
