import { StatusBar, Button, TextInput, Text, View, StyleSheet, Pressable  } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function newProduct() {
 return (
  
      <View style={styles.container}>
        
        <Text style={styles.title}>Inserir Produto</Text>
  
        
        <View style={styles.line} />
  
        {/* TÍTULO DO ANÚNCIO */}
        <Text style={styles.fieldLabel}>Título do Anúncio</Text>
        <TextInput style={styles.inputField} placeholder="Ex.: Iphone usado " />
  
        {/* DESCRIÇÃO */}
        <Text style={styles.fieldLabel}>Descrição</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Ex: Iphone 15 usado com 256gb de armazenamento, acompanha caixa e carregador, sem marca de uso. "
        multiline={true} />
  
        {/* CATEGORIA */}
        <Text style={styles.fieldLabel}>Categoria</Text>
        <View style={styles.pickerContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="Selecione" val12ue="" />
          <Picker.Item label="Eletrônicos" value="eletronicos" />
          <Picker.Item label="Roupas" value="roupas" />
          <Picker.Item label="Acessórios" value="acessórios" />          
        </Picker>
        </View>
  
        {/* PREÇO */}
        <Text style={styles.fieldLabel}>Preço (R$)</Text>
        <TextInput style={styles.inputField} placeholder="Digite o valor" keyboardType="numeric" />
  
        {/* IMAGEM */}
        <Text style={styles.fieldLabel}>Imagem</Text>
        <TextInput style={styles.inputField} placeholder="Adicionar fotos" />
  
        {/* BOTÃO */}
        <View className='items-center'>
          <Pressable style={styles.formButton} onPress={() => alert('Produto Postado')}>
          <Text style={styles.textButton}>Publicar</Text>
        </Pressable>
        </View>
        
        
      </View>
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
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Linha quase transparente
      marginVertical: 10,
    },
    fieldLabel: {
      fontSize: 16,
      color: '#000',
      marginBottom: 10,
    },
    inputField: {
      borderWidth: 1,
      borderColor: '#045CF1', // Borda fina azul
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#045CF1', // Borda fina azul para o picker
      borderRadius: 5,
      marginBottom: 20,
    },
    picker: {
      width: '100%',
      height: 40,
    },
    formButton: {
      padding: 15,
      backgroundColor: '#014BDB',
      borderRadius: 10,
      alignItems: 'center',
      width: '70%', // O botão preenche 70% da página
    },
    textButton: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
  