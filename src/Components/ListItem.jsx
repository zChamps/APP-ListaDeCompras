import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const ListItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                {item.isChecked ? <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" style={styles.checkBox}/> : <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color="black" style={styles.checkBox}/>}
                <Text style={{paddingLeft: 15, fontSize: 16,  }}>{item.nomeProduto}</Text>
            </View>
            <Ionicons name="trash-outline" size={24} color="black" />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        //   paddingTop: 50,
        //   paddingHorizontal: 25,
        justifyContent: "space-between",
        flexDirection: "row",
        borderColor: "#DDDDDD",
        borderWidth: 2,
        paddingVertical: 7,
        paddingHorizontal: 15,
        alignItems: "center"
    },
    subcontainer:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    checkBox:{
        paddingRight: 15,
        borderRightColor: "#000000",
        borderRightWidth: 0.5
    }

})


export default ListItem