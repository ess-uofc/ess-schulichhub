import firebase from "firebase"


const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_PROJECTID,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEEASURMENT_ID 
  };

const app = firebase.initializeApp(firebaseConfig)
export default app

export async function signUpUser(first:string,last:string, email:string,password:string){

    //Creates a user in firebase using email and password auth
    //returns a string with error code in sentence case
    //

    try{
        const res = await app.auth().createUserWithEmailAndPassword(email,password)
        if (res.user!=null){
            // TODO transfrom to user Model
            
            return new User(first,last,res.user.uid.toString())
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

async function loginUser(email:string,password:string){
    
    try{
        const res = await app.auth().signInWithEmailAndPassword(email,password)
        if (res){
            //TODO call getUserDetails
            return res.user
        }else{
            return null //
        }
    }catch(e){
        return parseError(e.code)
    }
    
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