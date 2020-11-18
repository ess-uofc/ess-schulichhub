import app from "firebase"


export default class User{
    /**
     * User class contains uid, firstName, lastName
     * @author Mohamad Abdel Rida
     * 
     * 
     */


    firstName?:string
    lastName?:string
    email:string
    uid:string

    /**
     * 
     * @param uid user id used in firebase
     * @param firstName user's first name | from firestore or user input
     * @param lastName user's last name | from firestore user input
     * @param email user's email address
     */

    constructor(uid:string,email:string,firstName?:string, lastName?:string){
        this.firstName = firstName
        this.lastName =lastName
        this.uid = uid
        this.email = email
    }

    private async addToDb(){
        /**
         * method on User
         * adds user fields to a unique document in firestore using uid
         * 
        */
        try{
            await app.firestore().collection('users').doc(this.uid).set(
            {
                firstName:this.firstName,
                lastName:this.lastName,
               
            }
        )}catch(e){
            console.log(e)
        }
    
    }
    private async fetchUserDetails(){

        /**
         * fetches user informaiton from firestore
         * private as its only used in the static login method
         * 
        */
        
        const doc = await app.firestore().collection('users').doc(this.uid).get()
        const firstName = await doc.get("firstName")
        const lastName = await doc.get("lastName")
        
        if(firstName && lastName) {
            this.firstName = firstName
            this.lastName = lastName
        }else{
            throw new Error("firstName or lastName not found on ${this.uid}");
        }
    }

    static async signUp(firstName:string,lastName:string, email:string,password:string):Promise<User|undefined>{

        /**
         * @param firstName: user's firstname
         * @param lastName:user's lastname
         * @param email: user's email
         * @param password: user's password
         * creates a new user from email and password.
         * adds user information to firestore
         * @return returns User object if successfull otherwise null 
        */
    
        try{
            const res = await app.auth().createUserWithEmailAndPassword(email,password)
            if (res.user!=null){
                const user = new User(res.user.uid,email,firstName,lastName)
                user.addToDb()

                return user
            }else{
                console.log(res) //
            }
        }catch(e){
            console.log(e)
        }
        
        
    }
    static async login(email:string,password:string):Promise<User|undefined>{

        /**
         * @param email:user's email
         * @param password:user's password
         * logs user in
         * @return User object if successful otherwise null
        */
    
        try{
            const res = await app.auth().signInWithEmailAndPassword(email,password)
            if (res.user){
                const user = new User(res.user.uid,email)
                await user.fetchUserDetails()
                return user
            }else{
                console.log(res) //
            }
        }catch(e){
            console.log(e)
        }
        
    }
}

function parseError(error:string){
    /**
     * @param error - firebase error code from  [https://firebase.google.com/docs/auth/admin/errors]
     * converts error to user friendly string
     * @return user friendly string
     */
    switch (error){
        case "auth/email-already-exists":
            return "Look's like you already have an account"
        case "auth/user-not-found":
            return "Please signup for an account" // Routing user would be cool
        default:
            return "Internal error occured"
    }

}