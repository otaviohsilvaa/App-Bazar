import React, { useEffect, useState } from 'react';
import { Link, router, useFocusEffect } from 'expo-router';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { Ionicons, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import axios from 'axios';
import { IP_BASE } from './../../../config/ip';

export default function ProfileScreen() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userCelular, setUserCelular] = useState('');
  const [userImage, setUserImage] = useState(null); 

  const checkLoginStatus = async () => {
    try {
      const response = await fetch(`${IP_BASE}/is_logged_in`);
      const data = await response.json();
      if (data.logged_in) {
        setLoggedIn(true);
        setUserName(data.user);
        setUserCelular(data.celular);
        setUserImage(data.foto_perfil);
                
      } else {
        setLoggedIn(false);
        setUserName('');
        setUserCelular('');
        setUserImage(null);
      }
    } catch (error) {
      console.error('Erro ao verificar o login:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      checkLoginStatus();
    }, [])
  );

  return (
    <View style={styles.containerOne}>
      {loggedIn ? (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.profileContent}>
              {/* Foto de Perfil */}
              <Image
                style={styles.profileImage}
                source={{ uri: userImage }} 
              />
              {/* Informações de perfil */}
              <View style={styles.profileInfoContainer}>
                <Text style={styles.profileName}>{userName}</Text>
                <Text style={styles.profileInfo}>{userCelular}</Text>
                <Text style={styles.profileInfo}>Caxias</Text>
              </View>
            </View>
          </View>

          <View style={styles.containerTwo}>
            {/* Navegação */}
            <View style={styles.navRow}>
              <FontAwesome6 name="shop" size={24} color="#1C1C1C" />
              <Link href={'/user/myproducts'} style={styles.link}>Meus produtos</Link>
              <AntDesign name="right" size={24} color="#1C1C1C" />
            </View>

            <View style={styles.navRow}>
              <AntDesign name="pluscircleo" size={24} color="#1C1C1C" />
              <Link href={'/user/newproduct'} style={styles.link}>Novo Produto</Link>
              <AntDesign name="right" size={24} color="#1C1C1C" />
            </View>

            <View style={styles.navRow}>
              <Ionicons name="person-outline" size={24} color="#1C1C1C" />
              <Link href={'/user/userinfo'} style={styles.link}>Meu Perfil</Link>
              <AntDesign name="right" size={24} color="#1C1C1C" />
            </View>

            <View style={styles.navRow}>
              <Ionicons name="person-outline" size={24} color="#1C1C1C" />
              <Link href={'/user/userinfo'} style={styles.link}>Suporte</Link>
              <AntDesign name="right" size={24} color="#1C1C1C" />
            </View>
            <View style={styles.navRow}>
              <Ionicons name="log-out-outline" size={25} color="#1C1C1C" />
              <Text style={styles.link}
              onPress={async () => {
                try {
                  const response = await axios.post(`${IP_BASE}/logout`);
                  if (response.status === 200) {
                    setLoggedIn(false);
                    setUserName('');
                    setUserCelular('');
                    setUserImage(null);
                  } else {
                    console.error("Erro no logout:", response.data.message);
                  }
                } catch (error) {
                  console.error("Erro ao fazer logout:", error);
                }
              }}
              >Logout</Text>
              <AntDesign name="right" size={25} color="#1C1C1C" />
            </View>
          </View>

          
        </>
      ) : (
        <>
          <Button title="Login" onPress={() => router.push('/auth/login')} />
          <Button title="Cadastro" onPress={() => router.push('/auth/signup')} />
        </>
      )}
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
  containerTwo: {
    width: '100%',
    padding: 20,
  },
  navRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between', 
    marginBottom: 20, 
  },
  link: {
    fontWeight: 'normal',
    fontSize: 18,
    color: '#1C1C1C',
    flex: 1,
    marginHorizontal: 10,
  },
});
