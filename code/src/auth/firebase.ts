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

    //Creates a user in firebase using email and password auth
    //returns a string with error code in sentence case
    //

    try{
        const res = await app.auth().createUserWithEmailAndPassword(email,password)
        if (res){
            return res.user
        }else{
            return null //
        }
    }catch(e){
        return parseError(e.code)
    }
    
    
}

async function getUserDetails(uid:string):Promise<User|undefined>{
    //get's user information from firebase
    // returns Promise with User model if transaction completed
    // TODO Add props to list and iterate instead of getting each 
    // field line by line?
    const doc = await app.firestore().collection('users').doc(uid).get()
    const firstName = await doc.get("firstName")
    const lastName = await doc.get("lastName")

    const data = doc.data

    if(firstName && lastName) {
        return new User(firstName,lastName,doc.id)
    }
}

async function addUserToDB(uid:string,firstName:string,lastName:string){
    //Adds the user to the users colleciton 
    
    const doc = await app.firestore().collection('users').doc(uid).set(
        {
            firstName:firstName,
            lastName:lastName,
            //TOOD add other fields
        }
    )

}


class User{
    firstName:string
    lastName:string
    uid:string
    // TODO add other attributes
    constructor(firstName:string, lastName:string,uid:string){
        this.firstName = firstName
        this.lastName =lastName
        this.uid = uid
    }
    signUp(){
        // Todo Implement signup as a class mehtod??
    }
}

function parseError(error:string){
    //example error auth/email-already-exists to Email Already Exists
    // Could be used to communicate with user in front end
    return error.split('/')[1].split('-').map((e)=>(e.charAt(0).toUpperCase()+e.slice(1)))
}