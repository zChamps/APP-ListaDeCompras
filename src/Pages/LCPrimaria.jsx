import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { getDatabase, ref, onValue, set, remove, child, push, update } from "firebase/database"
import ListItem from '../Components/ListItem';


const LCPrimaria = ({ navigation }) => {




  return (
    <View style={styles.container}>
      <Text style={{ color: "#169C89", fontSize: 30, fontWeight: "bold", marginBottom: "12%", marginTop: "6%" }}>Sua lista de compras completa:</Text>
      <TouchableOpacity style={styles.botoesListas}>
        <Text style={styles.textoBotao}>Adicionar novo item!</Text>
      </TouchableOpacity>


      <View style={{ backgroundColor: "#F3F3F3", paddingVertical: 12, marginBottom: 30 }}>

        <Text style={{ paddingLeft: 8 }}> Observações:</Text>
        
        <Text style={styles.textoObs}>
          <Text> {'\u2022'}</Text>
          <Text >  Caso já tenha colocado o item no carrinho, marque o check box.</Text>
        </Text>

        <Text style={styles.textoObs}>
          <Text> {'\u2022'}</Text>
          <Text >  Lista de compras destinada as compras gerais do mês. para compras menores, acessar as listas de compras secundárias.</Text>
        </Text>

      </View>

      <ListItem item={{isChecked: true, nomeProduto: "Creatina"}}/>
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
    
  }
})



export default LCPrimaria