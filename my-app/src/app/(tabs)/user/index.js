import { Link, router } from 'expo-router';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { Ionicons, AntDesign,FontAwesome6} from "@expo/vector-icons";

export default function ProfileScreen() {
  return (
    <View style={styles.containerOne}>    
      <View style={styles.profileContainer}>
        <View style={styles.profileContent}>
          {/* Foto  */}
          <Image
            style={styles.profileImage}
            source={{ uri: 'https://as1.ftcdn.net/v2/jpg/04/81/85/46/1000_F_481854656_gHGTnBscKXpFEgVTwAT4DL4NXXNhDKU9.jpg' }} 
          />
          {/* Informações de perfil */}
          <View style={styles.profileInfoContainer}>
            <Text style={styles.profileName}>Fábio Ferreira</Text>
            <Text style={styles.profileInfo}>(99) 99999-9999</Text>
            <Text style={styles.profileInfo}>Caxias</Text>
          </View>
        </View>
      </View>

      
      <View style={styles.containerTwo}>
      {/* MEUS PRODUTOS */}
      <View style={styles.navRow}>
        <FontAwesome6 name="shop" size={24} color="#1C1C1C" />
        <Link href={'/user/myproducts'} style={styles.link}>Meus produtos</Link>
        <AntDesign name="right" size={24} color="#1C1C1C" />
      </View>

      {/* NOVO PRODUTO */}
      <View style={styles.navRow}>
        <AntDesign name="pluscircleo" size={24} color="#1C1C1C" />
        <Link href={'/user/newproduct'} style={styles.link}>Novo Produto</Link>
        <AntDesign name="right" size={24} color="#1C1C1C" />
      </View>

      {/* MEU PERFIL */}
      <View style={styles.navRow}>
        <Ionicons name="person-outline" size={24} color="#1C1C1C" />
        <Link href={'/user/userinfo'} style={styles.link}>Meu Perfil</Link>
        <AntDesign name="right" size={24} color="#1C1C1C" />
      </View>

      {/* SUPORTE */}
      <View style={styles.navRow}>
        <Ionicons name="person-outline" size={24} color="#1C1C1C" />
        <Link href={'/user/userinfo'} style={styles.link}>Suporte</Link>
        <AntDesign name="right" size={24} color="#1C1C1C" />
      </View>
    </View>
    
      {/*login e cadastro */}
      <Button title='Login' onPress={() => router.push('/auth/login')} />
      <Button title='Cadastro' onPress={() => router.push('/auth/signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerOne: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    backgroundColor: '#fff',
    width: '90%',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfoContainer: {
    flex: 1, 
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',    
    marginBottom: 10,
  },
  profileInfo: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },


  containerTwo:{
    width:'100%',
     padding:20,
    
  },
  navRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 20, 
    
     
  },
  link:{
    fontWeight: 'normal',
    fontSize:18,
     color: '#1C1C1C',
    flex: 1,
    marginHorizontal: 10,
    
  },
});
