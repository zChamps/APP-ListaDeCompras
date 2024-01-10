import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { getDatabase, ref, onValue, set, remove, child, push, update } from "firebase/database"

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../Context/UserContext';


const ListItem = ( item ) => {
    const db = getDatabase();
    
    const dadosItem = Object.values(item)[0]

    const { uid } = useContext(UserContext)
    const handleCheckItem = () => {
        
        const updates = {};
        updates[`users/${uid}/products/${dadosItem.id}/isChecked`] = !dadosItem.isChecked;
        // console.log(updates)

        return update(ref(db), updates)
    }

    const handleDeleteItem = () => {
        remove(ref(db, `users/${uid}/products/${dadosItem.id}`))
    }

    // console.log(dadosItem)
    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                {dadosItem.isChecked ? <MaterialCommunityIcons onPress={handleCheckItem} name="checkbox-outline" size={26} color="black" style={styles.checkBox}/> : <MaterialCommunityIcons onPress={handleCheckItem} name="checkbox-blank-outline" size={26} color="black" style={styles.checkBox}/>}
                <Text style={{paddingLeft: 15, fontSize: 18,  }}>{dadosItem.name}</Text>
            </View>
            <Ionicons onPress={handleDeleteItem} name="trash-outline" size={24} color="black" />
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
        paddingVertical: 15,
        paddingHorizontal: 15,
        alignItems: "center",
        marginBottom: 10
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