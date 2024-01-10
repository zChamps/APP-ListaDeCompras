import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { getDatabase, ref, onValue, set, remove, child, push, update } from "firebase/database"
import ListItem from '../Components/ListItem';
import { ProductsContext } from '../Context/ProductsContext';
import { UserContext } from '../Context/UserContext';


const db = getDatabase()
const LCSecundaria = ({ navigation }) => {
  const [modalControl, setModalCOntrol] = useState(false)
  const handleModal = () => setModalCOntrol(false)
  const [itemAdicionar, setItemAdicionar] = useState("")


  const { uid } = useContext(UserContext)
  const { secondaryLists } = useContext(ProductsContext)

  const handleAdicionarLista = () => {
    const newPostKey = push(child(ref(db), 'users')).key;
    set(ref(db, `users/${uid}/secondaryLists/${itemAdicionar}`), {
          id: itemAdicionar
      });

    console.log("Lista a ser adicionada: ", itemAdicionar)
    setModalCOntrol(false)
    setItemAdicionar("")
  }





  return (
    <View style={styles.container}>
      <View style={{ borderBottomColor: "#CFCFCF", borderBottomWidth: 3 }}>
        <Text style={{ color: "#169C89", fontSize: 30, fontWeight: "bold", marginBottom: "8%", marginTop: "6%" }}>Suas listas de compras secundárias:</Text>
        <TouchableOpacity onPress={() => setModalCOntrol(true)} style={styles.botoesListas}>
          <Text style={styles.textoBotao}>Adicionar nova lista!</Text>
        </TouchableOpacity>





        <Modal animationType='slide' visible={modalControl} transparent={true} >
        <View style={styles.modalContainer}>
          <View style={styles.modalStyle}>
            <Text style={styles.TextModal}>Escreva abaixo qual o nome da sua nova lista:</Text>
            <TextInput onChangeText={valor => setItemAdicionar(valor)} style={styles.TextInput} value={itemAdicionar} placeholder='Lista....' />

            <TouchableOpacity onPress={handleAdicionarLista} style={styles.botaoModalAdicionarProduto}>
              <Text style={styles.textoBotao}>Criar nova lista!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleModal} style={styles.botaoModalSair}>
              <Text style={styles.textoBotao}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>









      </View>
      
      {console.log(secondaryLists)}
      {secondaryLists ? <FlatList style={{marginTop: "10%"}} data={secondaryLists} keyExtractor={(item) => item.id} renderItem={ ({item}) => {
        return (<View style={{marginBottom: "1%"}}>
          <TouchableOpacity onPress={() => setModalCOntrol(true)} style={styles.botoesListas}>
            <Text style={styles.textoBotao}>{item.id}</Text>
          </TouchableOpacity>

        </View>)
      } } /> : <Text>Ainda não existem listas criadas.</Text>}

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "white"
  },
  botoesListas: {
    paddingVertical: 20,
    width: "100%",
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 30

  },
  botaoModalAdicionarProduto: {
    marginTop: "8%",
    paddingVertical: 10,
    width: "100%",
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 30

  },
  botaoModalSair: {
    marginTop: "8%",
    paddingVertical: 5,
    width: "50%",
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 50,
    marginBottom: 10

  },
  textoBotao: {
    color: "#169C89",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center"
  },
  textoObs: {
    paddingLeft: 15,
    fontSize: 11,
    paddingRight: 15,

  },
  modalContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginVertical: "50%",

  },

  modalStyle: {
    width: "80%",
    backgroundColor: "white",
    height: 400,
    paddingHorizontal: 30,
    borderWidth: 3,
    borderColor: "#DDDDDD",
    borderRadius: 25

  },
  TextModal: {
    marginTop: "10%",
    fontSize: 22,
    color: "#169C89"
  },
  TextInput: {
    marginTop: "8%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
    alignItems: "center",
    borderColor: "#DDDDDD",
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "#F8F8F8"
  }
})



export default LCSecundaria