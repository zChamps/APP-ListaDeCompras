// Criar o context
import {createContext, useEffect, useState} from 'react'


export const UserContext = createContext()

import AsyncStorage from '@react-native-async-storage/async-storage'

// criar o provider, é o elemento que "abraça" os outros
export const UserContextProvider = ({children}) => {
    
    const [uid, setUid] = useState("")
    const [uidArmazenado, setUidArmazeado] = useState("")

    useEffect(() => {
        const carregarDados = async () => {
         try {
           // Recupera os dados do AsyncStorage
           const uidArmazenado = await AsyncStorage.getItem('uid')
           
           // Atualiza o estado com os dados recuperados
           setUidArmazeado(uidArmazenado || ''); // Use '' se não houver dados armazenados
           uidArmazenado && setUid(uidArmazenado)
        //    console.log("uidArmazenado: ", uidArmazenado)
         } catch (error) {
           console.error('Erro ao recuperar os dados:', error);
         }
     
     
        }
     
        carregarDados()
       }, [])



    return(
        // Definir os valores disponiveis dentro do context provider
        <UserContext.Provider value={{uid, setUid}}>
            {children}
        </UserContext.Provider>
    )


}