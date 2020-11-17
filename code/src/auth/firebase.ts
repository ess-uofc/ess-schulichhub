import firebase from "firebase"


const firebaseConfig = {
    apiKey: "AIzaSyBYZcULLDR2UcSVNcAyULdlX30-bzwhWJY",
    authDomain: "project-hub-116d7.firebaseapp.com",
    databaseURL: "https://project-hub-116d7.firebaseio.com",
    projectId: "project-hub-116d7",
    storageBucket: "project-hub-116d7.appspot.com",
    messagingSenderId: "60966505195",
    appId: "1:60966505195:web:c1cd5d9a1b2e1befa8ccae",
    measurementId: "G-K08FLKLRRG"
  };

const app = firebase.initializeApp(firebaseConfig)
export default app
export async function signUpUser(first:string,last:string, email:string,password:string){
    const res = await app.auth().createUserWithEmailAndPassword(email,password)

    
}

async function getUserDetails(uid:string){
    const doc = await app.firestore().collection('users').doc(uid).get()
    const firstName = await doc.get("firstName")
    const lastName = await doc.get("lastName")

    const data = doc.data

    if(firstName && lastName) {
        return new User(firstName,lastName,doc.id)
    }
}

class User{
    firstName:string
    lastName:string
    uid:string
    constructor(firstName:string, lastName:string,uid:string){
        this.firstName = firstName
        this.lastName =lastName
        this.uid = uid
    }
    signUp(){
        // Todo Implement signup as a class mehtod??
    }
}