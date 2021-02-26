import firebase from "firebase";
import { UserDoc } from "./DocTypes";
import FireStoreDB from "./firestore";
import User from "./User";

export default class PrimaryUser extends firebase.auth.TwitterAuthProvider implements UserDoc { 
    firstName: string
    lastName: string
    uid: string
    major?:string
    constructor(firstName: string, lastName: string, uid: string) { 
        super();

        this.firstName = firstName
        this.lastName = lastName
        this.uid = uid
    }
}