import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { getDatabase, ref, onValue, set, remove, child, push, update } from "firebase/database"

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../Context/UserContext';
import { ProductsContext } from '../Context/ProductsContext';

const ListItem = ({ item, nomeLista, setLocalListData }) => {
    const { secondaryLists, setSecondaryLists } = useContext(ProductsContext)
    const db = getDatabase();
    const { uid } = useContext(UserContext)
    
    const [dadosItem, setDadosItem] = useState([])

    useEffect(() => {
        const db = getDatabase();

        async function Dados() {
            const listas = ref(db, `users/${uid}/secondaryLists/${nomeLista}/products/${item.id}`);

            await onValue(listas, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setDadosItem(data);
                }
            });
        }

        Dados();
    }, []);

    const handleCheckItem = () => {
        const updates = {};

        updates[`users/${uid}/products/${item.id}/isChecked`] = !dadosItem.isChecked;
        updates[`users/${uid}/secondaryLists/${nomeLista}/products/${item.id}/isChecked`] = !dadosItem.isChecked;

        return update(ref(db), updates);
    }

    
    
    const handleDeleteItem = () => {
        console.log('Tentando excluir item:', item);
        remove(ref(db, `users/${uid}/secondaryLists/${nomeLista}/products/${item.id}`))
            .then(() => {
                console.log('Item excluído no Firebase com sucesso!');
                setSecondaryLists((prevLists) => {
                    const updatedLists = prevLists.map((list) => {
                        if (list.id === nomeLista) {
                            return {
                                ...list,
                                products: list.products.filter((product) => product.id !== item.id),
                            };
                        }
                        return list;
                    });
                    return updatedLists;
                });
    
                // Atualiza o estado local usando a função passada como propriedade
                setLocalListData((prevData) => {
                    const updatedData = { ...prevData };
                    delete updatedData[item.id];
                    return updatedData;
                });
            })
            .catch((error) => {
                console.error('Erro ao excluir o item:', error);
            });
    };









    // console.log("Dados Item:",dadosItem.name)

    return (
        <View style={styles.container}>
            <View style={styles.subcontainer}>
                {dadosItem.isChecked ? (
                    <MaterialCommunityIcons
                        onPress={handleCheckItem}
                        name="checkbox-outline"
                        size={26}
                        color="black"
                        style={styles.checkBox}
                    />
                ) : (
                    <MaterialCommunityIcons
                        onPress={handleCheckItem}
                        name="checkbox-blank-outline"
                        size={26}
                        color="black"
                        style={styles.checkBox}
                    />
                )}
                <Text style={{ paddingLeft: 15, fontSize: 18 }}>{item.name}</Text>
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