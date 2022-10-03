import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider, } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDZrc08sDMzaUxLfSoFip7Z1SlYZfJcYeI",
  authDomain: "whatsapp-clone-b6801.firebaseapp.com",
  projectId: "whatsapp-clone-b6801",
  storageBucket: "whatsapp-clone-b6801.appspot.com",
  messagingSenderId: "349683701020",
  appId: "1:349683701020:web:168e1877aae99edd1616d9"
};

 initializeApp(firebaseConfig)


const db = getFirestore();
const auth = getAuth();
const provider  = new GoogleAuthProvider()

export {db, auth, provider};