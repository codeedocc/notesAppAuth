import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_SECRET_KEY,
  authDomain: 'todo-app-3eb70.firebaseapp.com',
  databaseURL:
    'https://todo-app-3eb70-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'todo-app-3eb70',
  storageBucket: 'todo-app-3eb70.appspot.com',
  messagingSenderId: '287412106162',
  appId: '1:287412106162:web:a5438a3d1fc82afd6f6aab',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const auth = getAuth()
