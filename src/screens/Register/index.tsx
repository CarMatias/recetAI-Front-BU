import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors';
import qs from 'qs';
import axios from 'axios';
import {Input} from '@rneui/base';
import {ceil, Value} from 'react-native-reanimated';
import {useAuth} from '../../components/providers/AuthProvider';
import Text from '../../components/ui/Text';

type Props = {};

let ScreenHeight = Dimensions.get('window').height;

const baseUrl = 'https://recet-ai-back-end.vercel.app/newuser/';

const RegisterScreen = (props: Props) => {
  const {register} = useAuth();
  let [form, setForm] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const createUser = async () => {
    register(form);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Image style={styles.logo} source={require('./logo/logo.png')} />
      <View style={styles.card}>
        <Text>EMAIL</Text>
        <Input onChangeText={e => setForm({...form, email: e})}></Input>
        <Text>CONTRASEÑA</Text>
        <Input
          secureTextEntry
          onChangeText={e => setForm({...form, password: e})}></Input>
        <Text>NOMBRE</Text>
        <Input onChangeText={e => setForm({...form, first_name: e})}></Input>
        <Text>APELLIDO</Text>
        <Input onChangeText={e => setForm({...form, last_name: e})}></Input>
        <TouchableOpacity style={styles.btn} onPress={createUser}>
          <Text>Registrarse</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.globo}></Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    borderColor: colors.primary,
    borderRadius: 2,
    borderWidth: 2,
    padding: 15,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  new: {
    bottom: -90,
    right: -100,
  },
  title: {
    position: 'absolute',
    width: 300,
    fontSize: 80,
    top: -190,
    right: -100,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: -20,
    left: -50,
  },
  card: {
    top: -50,
    height: 300,
    alignItems: 'center',
    width: 200,
  },
  globo: {
    position: 'absolute',
    backgroundColor: '#FEAB3F',
    width: 350,
    height: 350,
    bottom: -100,
    right: -200,
    borderRadius: 500,
  },

  icono: {
    position: 'absolute',
    height: 100,
    width: 100,
    top: -50,
  },
});
