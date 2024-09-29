import { Link, router } from 'expo-router';
import { Text, View, Button } from 'react-native';

export default function profileScreen() {
 return (
   <View className="items-center justify-center flex w-full h-full">
    <Text className="mb-4">Tela de Perfil</Text>
    <Link href={'/user/myproducts'}>Meus produtos</Link>
    <Link href={'/user/newproduct'}>Novo Produto</Link>
    <Link href={'/user/userinfo'}>Meu Perfil</Link>
    <Button title='Login' onPress={() => router.push('/auth/login')} />
    <Button title='Cadastro' onPress={() => router.push('/auth/signup')} />
   </View>
  );
}