// js/firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ==============================
   CONFIGURAÇÃO DO FIREBASE
============================== */
const firebaseConfig = {
  apiKey: "AIzaSyCTUJ7RDWfG-Lrye36z5diaW8AMBMMJ3Dk",
  authDomain: "mamo-ia.firebaseapp.com",
  projectId: "mamo-ia",
  storageBucket: "mamo-ia.firebasestorage.app",
  messagingSenderId: "1027169066241",
  appId: "1:1027169066241:web:422afa947ae0e665320f00",
  measurementId: "G-8863JNRDY7"
};

/* ==============================
   INICIALIZA
============================== */
const app = initializeApp(firebaseConfig);

/* ==============================
   EXPORTA O FIRESTORE
============================== */
export const db = getFirestore(app);

console.log("Firebase inicializado com sucesso");
