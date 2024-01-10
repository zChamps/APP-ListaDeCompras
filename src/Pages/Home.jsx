import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { getDatabase, ref, onValue, set, remove, child, push, update } from "firebase/database"

import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../Context/UserContext';

const Home = ({ navigation }) => {
  const { uid, setUid } = useContext(UserContext)
  const [nome, setNome] = useState("")

  useEffect(() => {
    const db = getDatabase()
    async function Dados(){
        const usuarios = ref(db, `users/${uid}`)

        await onValue(usuarios, snapshot => {
          const nome = snapshot.val().nome
          setNome(nome)

      })
      }
      Dados()

  }, [uid])



  useEffect(() => {
    if(uid === ""){
      navigation.navigate("Login")
    }
  })

  const handleExit = () => {
    setUid("")
    try {
      // Armazena os dados no AsyncStorage
      AsyncStorage.setItem('uid', "");

    } catch (error) {
      console.error('Erro ao armazenar os dados:', error);
    }


  }




  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: "#169C89", fontSize: 32, fontWeight: "bold", marginBottom: "15%"}}>Olá, {nome} :)</Text>
        <Text style={{color: "#169C89", fontSize: 20, fontWeight: "600", marginBottom: "5%"}}>Minhas listas de compras:</Text>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("LCPrimaria")} style={styles.botoesListas}>
            <Text style={styles.textoBotao}>Lista de Compras Completa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LCSecundaria")} style={styles.botoesListas}>
            <Text style={styles.textoBotao}>Listas de Compras Secundárias</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{color: "#169C89", fontSize: 15, fontWeight: "bold", marginBottom: "10%"}} onPress={handleExit}>Sair da conta!</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 25,
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  botoesListas:{
    paddingVertical: 20,
    width: "100%",
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 30

  },
  textoBotao:{
    color: "#169C89",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  }




})





export default Home