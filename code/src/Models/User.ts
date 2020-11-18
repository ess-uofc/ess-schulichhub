import app from "../auth/firebase"


export default class User{
    firstName?:string
    lastName?:string
    uid:string
    // TODO add other attributes
    constructor(uid:string,firstName?:string, lastName?:string){
        this.firstName = firstName
        this.lastName =lastName
        this.uid = uid
    }

    private async addToDb(){
        //Adds the user to the users colleciton 
        
        const doc = await app.firestore().collection('users').doc(this.uid).set(
            {
                firstName:this.firstName,
                lastName:this.lastName,
                //TOOD add other fields
            }
        )
    
    }
    async fetchUserDetails(){
        //get's user information from firebase
        // returns Promise with User model if transaction completed
        // TODO Add props to list and iterate instead of getting each 
        // field line by line?
        const doc = await app.firestore().collection('users').doc(this.uid).get()
        const firstName = await doc.get("firstName")
        const lastName = await doc.get("lastName")
    
        const data = doc.data
    
        if(firstName && lastName) {
            this.firstName = firstName
            this.lastName = lastName
        }
    }

    static async signUp(first:string,last:string, email:string,password:string):Promise<User|undefined>{

        //Creates a user in firebase using email and password auth
        //returns a string with error code in sentence case
        //
    
        try{
            const res = await app.auth().createUserWithEmailAndPassword(email,password)
            if (res.user!=null){
                // TODO transfrom to user Model
                const user = new User(first,last,res.user.uid.toString())
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
    
        try{
            const res = await app.auth().signInWithEmailAndPassword(email,password)
            if (res.user){
                //TODO call getUserDetails
                
                const user = new User(res.user.uid.toString())
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
    //example error auth/email-already-exists to Email Already Exists
    // Could be used to communicate with user in front end
    return error.split('/')[1].split('-').map((e)=>(e.charAt(0).toUpperCase()+e.slice(1)))
}