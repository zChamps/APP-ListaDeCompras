import firebase, { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Importar de acordo com cada projeto
const firebaseConfig = {
//   apiKey:
//   authDomain:
//   databaseURL:
//   projectId:
//   storageBucket:
//   messagingSenderId:
//   appId:
//   measurementId:
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app)

export default database;
