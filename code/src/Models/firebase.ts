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