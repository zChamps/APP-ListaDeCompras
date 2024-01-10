// Criar o context

import database from "../Firebase/FirebaseConnection"
import {getDatabase, ref, onValue} from "firebase/database"

import { useEffect, useState, createContext, useContext } from 'react';
import { UserContext } from './UserContext';



export const ProductsContext = createContext()

// criar o provider, é o elemento que "abraça" os outros
export const ProductsContextProvider = ({children}) => {
    const {uid, setUid} = useContext(UserContext)

    const [data, setData] = useState([])
    const [secondaryLists, setSecondaryLists] = useState([])

    useEffect(() => {
        const db = getDatabase()
        async function Dados(){

    

            const usuarios = ref(db, `users/${uid}/products`)
    
            await onValue(usuarios, snapshot => {
              const data = snapshot.val()
    
                if(data){
                    const dataArray = Object.keys(data).map((key) => ({
                        id: key,
                        isChecked: data[key].isChecked,
                        name: data[key].name, 
                      }));
                      setData(dataArray)
                }            
              
          })
          }
          Dados()
    
      }, [uid])


    
      

      useEffect(() => {
        const db = getDatabase()
        async function Dados(){

    

            const listas = ref(db, `users/${uid}/secondaryLists`)
    
            await onValue(listas, snapshot => {
              const data = snapshot.val()
    
                
              if(data){
                const dataArray = Object.keys(data).map((key) => ({
                    id: key,
                    
                  }));
                  setSecondaryLists(dataArray)
            }        
              
          })
          }
          Dados()
    
      }, [uid])





console.log(secondaryLists)


    return(
        // Definir os valores disponiveis dentro do context provider
        <ProductsContext.Provider value={{data, setData, secondaryLists, setSecondaryLists}}>
            {children}
        </ProductsContext.Provider>
    )


}