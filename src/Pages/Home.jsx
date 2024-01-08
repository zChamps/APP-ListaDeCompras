import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { getDatabase, ref, onValue, set, remove, child, push, update } from "firebase/database"


import { UserContext } from '../Context/UserContext';

const Home = ({ navigation }) => {
  const { uid, setUid } = useContext(UserContext)
  const [nome, setNome] = useState("")

  useEffect(() => {
    const db = getDatabase()
    async function Dados(){
        ////// "Nome" é um nó principal criado no firebase, caso precise de outro, importar outro
        // const nome = ref(db, "Nome")

        //////Aqui, nome é um sub nó que contem varios atributos
        const usuarios = ref(db, `users/${uid}`)

        await onValue(usuarios, snapshot => {
          /////Caso seja somente 1 atributo na consulta, acessar assim
          // const data = snapshot.val()


          /////Caso tenha mais de um atributo na consulta, acessar assim, colocando .NomeDaChave depois do .val()
          const nome = snapshot.val().nome
          setNome(nome)

      })
      }
      Dados()

  }, [])










  return (
    <View style={styles.container}>
      <View>
        <Text style={{color: "#169C89", fontSize: 32, fontWeight: "bold", marginBottom: "15%"}}>Olá, {nome} :)</Text>
        <Text style={{color: "#169C89", fontSize: 20, fontWeight: "600", marginBottom: "5%"}}>Minhas listas de compras:</Text>
        <View>
          <TouchableOpacity style={styles.botoesListas}>
            <Text style={styles.textoBotao}>Lista de Compras Completa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botoesListas}>
            <Text style={styles.textoBotao}>Listas de Compras Secundárias</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{color: "#169C89", fontSize: 15, fontWeight: "bold", marginBottom: "10%"}}>Sair da conta!</Text>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
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