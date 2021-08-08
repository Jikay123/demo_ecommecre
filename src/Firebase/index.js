import firebase from "firebase"
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDVyXxgPTEUgxYTK8XYVAtpbjLiS9F2i_Q",
    authDomain: "e-commerce-2cb9f.firebaseapp.com",
    projectId: "e-commerce-2cb9f",
    storageBucket: "e-commerce-2cb9f.appspot.com",
    messagingSenderId: "385396169212",
    appId: "1:385396169212:web:5caafb308daf1ea73fba79",
    measurementId: "G-BE7JC1EJ4R"
})
const db = firebaseApp.firestore();
export const storage = firebase.storage();
export const auth = firebase.auth();

export default db;