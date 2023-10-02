import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0OVJPLnShbUq9ADxuMVVF_uepBI9jf6c",
  authDomain: "movies-3fd3e.firebaseapp.com",
  projectId: "movies-3fd3e",
  storageBucket: "movies-3fd3e.appspot.com",
  messagingSenderId: "225163436124",
  appId: "1:225163436124:web:80e55dfcc03d64254c8699"
};

 initializeApp(firebaseConfig);

const app = createApp(App)

app.use(router)

app.mount('#app')
