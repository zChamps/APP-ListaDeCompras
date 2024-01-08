import React from 'react'
import { ScrollView, StyleSheet, Text, View, FlatList, Switch, TextInput, Button, TouchableOpacity, Modal, Image, ActivityIndicator, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';


const About = ({ navigation }) => {
  const route = useRoute()

    const handleNavigate = () => {
        navigation.navigate("Login")
    }

  return (
    <View>
        <Text>About</Text>
        <Text>{route.params?.name}</Text>
        <Button title='Ir para Home' onPress={handleNavigate}/>
    </View>
  )
}

export default About