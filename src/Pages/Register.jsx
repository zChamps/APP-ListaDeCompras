import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated, SafeAreaView, Keyboard, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigate } from 'react-router-dom';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['@firebase/auth']);

import database from "../Firebase/FirebaseConnection"
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import {getDatabase, ref, onValue, set, remove, child, push, update} from "firebase/database"


import { UserContext } from '../Context/UserContext';


import AsyncStorage from '@react-native-async-storage/async-storage'


const Register = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const db = getDatabase()
  

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


  // console.log("UID: ",uid)



  useEffect(() => {
    if(uid){
      navigation.navigate("Home")
    }
  }, [uid])











  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  // console.log("Width", windowWidth)
  // console.log("Height", windowHeight)


  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")




  
  const handleRegister = async () => {
    const auth = getAuth();

    const newUserKey = push(child(ref(db), "users")).key;

    if(senha === confirmarSenha){
      await createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert(`Usuário criado com sucesso: ${user.email}`)
        // console.log(user)

        const uidRegister = user.uid;
        setUid(uidRegister)
        set(ref(db, `users/${uidRegister}`), {
          nome: nome,
          email: email
          
        });



        try {
          // Armazena os dados no AsyncStorage
          AsyncStorage.setItem('uid', uidRegister);
    
        } catch (error) {
          console.error('Erro ao armazenar os dados:', error);
        }








      })
      .catch((error) => {
        console.log("ERRO_CATCH: ", error)
        // ..
      });










      
      


    }else{
      Alert.alert("As senhas devem ser iguais!")
    }



  }










  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerCriarContaEDados}>
          <View>
            <Text style={styles.criarConta}>Criar Conta!</Text>
            <Text style={styles.textoRegistrar}>Se registre para utilizar o APP.</Text>
          </View>
          <View style={{ display: 'flex', gap: 8 }}>
            <View style={styles.containerInput}><AntDesign name="user" size={24} color="#B1B1B1" /><TextInput onChangeText={valor => setNome(valor)} style={styles.TextInput} value={nome} placeholder='Primeiro Nome' /></View>
            <View style={styles.containerInput}><MaterialIcons name="email" size={24} color="#B1B1B1" /><TextInput onChangeText={valor => setEmail(valor)} style={styles.TextInput} value={email} placeholder='Endereço de Email' /></View>
            <View style={styles.containerInput}><AntDesign name="lock" size={24} color="#B1B1B1" /><TextInput onChangeText={valor => setSenha(valor)} style={styles.TextInput} value={senha} placeholder='Senha' /></View>
            <View style={styles.containerInput}><AntDesign name="lock" size={24} color="#B1B1B1" /><TextInput onChangeText={valor => setConfirmarSenha(valor)} style={styles.TextInput} value={confirmarSenha} placeholder='Confirme sua senha' /></View>
          </View>
        </View>

        {!isKeyboardVisible && (<View style={{ display: "flex", alignItems: "center", gap: 25 }}>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>Registrar</Text>
          </TouchableOpacity>

        </View>
        
        
        )}
        

      </SafeAreaView>
        
        {!isKeyboardVisible && <Text style={{ backgroundColor: "#e0e2e2", color: "#999999", paddingVertical: 18, width: "100%", textAlign: "center", paddingHorizontal: 25, marginTop: 25 }}>Já tem conta? <Text onPress={()=> { navigation.navigate("Login") }} style={{color:"#169C89", textDecorationLine: "underline", fontSize: 16 }}>Login</Text></Text>}
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
  containerCriarContaEDados: {
    flex: 1,
    gap: 30
  },

  criarConta: {
    fontSize: 26,
    color: "#169C89"
  },

  textoRegistrar: {
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

export default Register