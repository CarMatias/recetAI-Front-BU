import {
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import {color, Input} from '@rneui/base';

import {useAuth} from '../../components/providers/AuthProvider';
import colors from '../../assets/colors';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import Text from '../../components/ui/Text';

type Props = {
  navigation: any;
};

let ScreenHeight = Dimensions.get('window').height;

let email: string;
let pass: string;

const LoginScreen = (props: Props) => {
  const {login, isLoading, error} = useAuth();
  const handleLogin = () => {
    login(email, pass);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Login</Text>
          <Image style={styles.logo} source={require('./logo/logo.png')} />
          {error && <Text style={styles.error}>{error}</Text>}

          <Text>USUARIO</Text>
          <Input onChangeText={value => (email = value)}></Input>
          <Text>CONTRASEÑA</Text>
          <Input secureTextEntry onChangeText={value => (pass = value)}></Input>
          <TouchableOpacity onPress={handleLogin} style={styles.btn}>
            <Text>Iniciar Sesion</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.globo}></Text>
        <View style={styles.new}>
          <Text>No tienes una cuenta?</Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Register')}>
            <Text>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && (
        <FullScreenLoader
          text="Iniciando sesion"
          color="rgba(255,255,255,0.5)"
        />
      )}
    </>
  );
};

export default LoginScreen;

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
    left: -75,
    fontWeight: 'bold',
  },
  logo: {
    position: 'absolute',
    width: 200,
    height: 200,
    top: -190,
    right: -150,
  },
  card: {
    height: 300,
    alignItems: 'center',
    width: 200,
  },
  globo: {
    position: 'absolute',
    backgroundColor: colors.primary,
    width: 350,
    height: 350,
    bottom: -100,
    left: -150,
    borderRadius: 500,
  },

  icono: {
    position: 'absolute',
    height: 100,
    width: 100,
    top: -50,
  },
  error: {
    color: colors.danger,
  },
});
