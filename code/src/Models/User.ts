import app from "firebase"

export class UserError extends Error{
    /**
     * Defines and handles errors that occur with user authentication
     */

    static userNotFound = new UserError("Please Sign Up for an account")
    static emailAlreadyExists = new UserError("Look's like you already have an account")
    static externalError = new UserError("External Error Occured")

    /**
     * @param error - firebase error code from  [https://firebase.google.com/docs/auth/admin/errors]
     * converts error to user friendly string
     * @throw Error with user friendly string wrapped
     */
        
    constructor(message:string){
        super(message)
    }
    static hanlde(res:app.FirebaseError):void{

        const code = res.code
        switch (code){
            case "auth/email-already-exists":
                throw UserError.emailAlreadyExists
            case "auth/user-not-found":
                throw UserError.userNotFound // Routing user would be cool
            default:
                console.log(code)
                throw new UserError("Internal error occured "+code)
        }
    
    }


} 

interface UserDoc {
    firstName: string;
    lastName: string;
    [key:string]:any;
    // Add other user fields here
}

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
    // Add user attributes here

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


    /**
     * method on User
     * adds user fields to a unique document in firestore using uid
     * 
    */
    private async addToDb():Promise<void>{
     
        try{
            await app.firestore().collection('users').doc(this.uid).set(
                {
                firstName:this.firstName,
                lastName:this.lastName,
            }
            )
        }catch(e){
            console.log(e)
        }
    
    }


    /**
     * fetches user informaiton from firestore
     * private as its only used in the static login method
     * 
    */
    private async fetchUserDetails():Promise<void>{
        const doc = await app.firestore().collection('users').doc(this.uid).get()
        try{
            const test = {a:1,b:2}

        const data= <UserDoc>doc.data()

            this.firstName = data.firstName
            this.lastName = data.lastName
     
        }catch(e){
            console.log(e)
        }
    }


    /**
     * @param firstName: user's firstname
     * @param lastName:user's lastname
     * @param email: user's email
     * @param password: user's password
     * creates a new user from email and password.
     * adds user information to firestore
     * @return returns User object if successfull otherwise null 
    */
    static async signUp(firstName:string,lastName:string, email:string,password:string):Promise<User|undefined>{
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

    
    /**
     * @param email:user's email
     * @param password:user's password
     * logs user in
     * @return User object if successful otherwise null
    */
    static async login(email:string,password:string):Promise<User|undefined>{
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

