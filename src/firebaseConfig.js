// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Importa Firestore para usarlo

// Tu configuración de Firebase (credenciales generadas por Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAPAUl_UHqaB9L2PvHrP-npJqS7ojnftOc",
  authDomain: "citas-medicas-f00c2.firebaseapp.com",
  projectId: "citas-medicas-f00c2",
  storageBucket: "citas-medicas-f00c2.appspot.com",
  messagingSenderId: "925025886629",
  appId: "1:925025886629:web:be8b74b66b2f6bae4bc84c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };
