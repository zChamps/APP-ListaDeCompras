import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated, SafeAreaView, Keyboard } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigate } from 'react-router-dom';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { UserContext } from '../Context/UserContext';

import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import {getDatabase, ref, onValue, set, remove, child, push, update} from "firebase/database"





const Login = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const {uid, setUid} = useContext(UserContext)




  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Remove os listeners quando o componente é desmontado
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []); // Adicionando setKeyboardVisible como dependência



  useEffect(() => {
    if(uid){
      navigation.navigate("Home")
    }
  }, [uid])














  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  // console.log("Width", windowWidth)
  // console.log("Height", windowHeight)


  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")


  console.log("UID: ",uid)

  const handleLogin = () => {
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        const uidRegister = user.uid;
        setUid(uidRegister)


        alert("Login realizado com sucesso!")

        setEmail("")
        setSenha("")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });




  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerSaudacaoELogin}>
          <View>
            <Text style={styles.saudacaoLogin}>Bem vindo de volta!</Text>
            <Text style={styles.textoLogin}>Insira seus dados para continuar.</Text>
          </View>
          <View style={{ display: 'flex', gap: 8 }}>
            
            <View style={styles.containerInput}><MaterialIcons name="email" size={24} color="#B1B1B1" /><TextInput onChangeText={valor => setEmail(valor)} style={styles.TextInput} value={email} placeholder='Endereço de Email' /></View>
            <View style={styles.containerInput}><AntDesign name="lock" size={24} color="#B1B1B1" /><TextInput onChangeText={valor => setSenha(valor)} style={styles.TextInput} value={senha} placeholder='Senha' /></View>
            
          </View>
        </View>

        {!isKeyboardVisible && (<View style={{ display: "flex", alignItems: "center", gap: 25 }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Login</Text>
          </TouchableOpacity>

        </View>
        
        
        )}
        

      </SafeAreaView>
        
        {!isKeyboardVisible && <Text style={{ backgroundColor: "#e0e2e2", color: "#999999", paddingVertical: 18, width: "100%", textAlign: "center", paddingHorizontal: 25, marginTop: 25 }}>Já tem conta? <Text onPress={()=> { navigation.navigate("Register") }} style={{color:"#169C89", textDecorationLine: "underline", fontSize: 16 }}>Registrar</Text></Text>}
    </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  containerSaudacaoELogin: {
    flex: 1,
    gap: 30
  },

  saudacaoLogin: {
    fontSize: 26,
    color: "#169C89"
  },

  textoLogin: {
    fontSize: 18,
    color: "#999999"
  },

  containerInput: {
    display: 'flex',
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 10,
    alignItems: "center",
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "F8F8F8"
  },

  TextInput: {
    fontSize: 18
  },

  button: {
    backgroundColor: "#169C89",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10
  }



});

export default Login