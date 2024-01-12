// LCSecundariaComponent

import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getDatabase, ref, onValue, set, remove, child, push, update } from "firebase/database"
import ListItem from '../Components/ListItem';
import { ProductsContext } from '../Context/ProductsContext';
import { UserContext } from '../Context/UserContext';


const LCSecundariaComponent = ({ navigation }) => {
    const route = useRoute();
    const { dadosLista } = route.params;

    const productArray = Object.values(dadosLista.products);
    // console.log(productArray)

  const [modalControl, setModalCOntrol] = useState(false)
  const handleModal = () => setModalCOntrol(false)

  const [itemAdicionar, setItemAdicionar] = useState("")
  const { secondaryLists, setSecondaryLists } = useContext(ProductsContext)

  const db = getDatabase()

  const { uid, setUid } = useContext(UserContext)

  const [localListData, setLocalListData] = useState([]);
  const localListArray = Object.values(localListData);


  useEffect(() => {
    // Atualize o estado local quando secondaryLists mudar
    setLocalListData(secondaryLists.find(list => list.id === dadosLista.id)?.products || []);
}, [secondaryLists, dadosLista.id]);

  console.log("localListData:  ",localListData)





  const handleAdicionarProduto = () => {
    const newPostKey = push(child(ref(db), 'users')).key;
    set(ref(db, `users/${uid}/secondaryLists/${dadosLista.id}/products/${newPostKey}`), {
        id: newPostKey,
        name: itemAdicionar,
        isChecked: false
      });


    setModalCOntrol(false)
    setItemAdicionar("")
    const uidTeste = uid
    setUid("")
    setUid(uidTeste)
  }


  return (
    <View style={styles.container}>
      <Text style={{ color: "#169C89", fontSize: 30, fontWeight: "bold", marginBottom: "12%", marginTop: "6%" }}>Lista de compras: {dadosLista.id}</Text>
      <TouchableOpacity onPress={() => setModalCOntrol(true)} style={styles.botoesListas}>
        <Text style={styles.textoBotao}>Adicionar novo item!</Text>
      </TouchableOpacity>


      <Modal animationType='slide' visible={modalControl} transparent={true} >
        <View style={styles.modalContainer}>
          <View style={styles.modalStyle}>
            <Text style={styles.TextModal}>Escreva abaixo qual item deseja adicionar a lista:</Text>
            <TextInput onChangeText={valor => setItemAdicionar(valor)} style={styles.TextInput} value={itemAdicionar} placeholder='Produto...' />

            <TouchableOpacity onPress={handleAdicionarProduto} style={styles.botaoModalAdicionarProduto}>
              <Text style={styles.textoBotao}>Adicionar Produto!</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleModal} style={styles.botaoModalSair}>
              <Text style={styles.textoBotao}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ backgroundColor: "#F3F3F3", paddingVertical: 12, marginBottom: 30 }}>

        <Text style={{ paddingLeft: 8 }}> Observações:</Text>

        <Text style={styles.textoObs}>
          <Text> {'\u2022'}</Text>
          <Text >  Caso já tenha colocado o item no carrinho, marque o check box.</Text>
        </Text>

        <Text style={styles.textoObs}>
          <Text> {'\u2022'}</Text>
          <Text >  Utilize essa lista para itens especificos e/ou compras menores.</Text>
        </Text>

      </View>
      {/* {console.log(productArray)} */}
      {localListArray && <FlatList data={localListArray} keyExtractor={(item) => item.id} renderItem={({ item }) => {
        // console.log("Item: ",item)
        return <ListItem item={item} isChecked={item.isChecked} nomeLista={localListData.id} setLocalListData={setLocalListData}/>
      }} />}
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



export default LCSecundariaComponent