import { UserDoc } from './DocTypes';
import app from './firebase';

export class UserError extends Error {
    /**
     * Defines and handles errors that occur with user authentication
     */

    static userNotFound = new UserError('Please Sign Up for an account');
    static emailAlreadyExists = new UserError("Look's like you already have an account");
    static externalError = new UserError('External Error Occurred');

    /**
     * @param error - firebase error code from  [https://firebase.google.com/docs/auth/admin/errors]
     * converts error to user friendly string
     * @throw Error with user friendly string wrapped
     */
    static handle(res: firebase.default.auth.Error): void {
        const code = res.code;
        switch (code) {
            case 'auth/email-already-exists':
                throw UserError.emailAlreadyExists;
            case 'auth/user-not-found':
                throw UserError.userNotFound; // Routing user would be cool
            default:
                console.log(code);
                throw new UserError('Internal error Occurred ' + code);
        }
    }
}



export default class User {
    /**
     * User class contains uid, firstName, lastName
     * @author Mohamad Abdel Rida
     *
     *
     */

    firstName?: string;
    lastName?: string;
    email: string;
    uid: string;

    // Add user attributes here

    /**
     *
     * @param uid user id used in firebase
     * @param firstName user's first name | from FireStore or user input
     * @param lastName user's last name | from FireStore user input
     * @param email user's email address
     */

    constructor(uid: string, email: string, firstName?: string, lastName?: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.uid = uid;
        this.email = email;
    }

    /**
     * method on User
     * adds user fields to a unique document in FireStore using uid
     *
     */
    private async addToDb(): Promise<void> {
        try {
            await app.firestore().collection('users').doc(this.uid).set({
                firstName: this.firstName,
                lastName: this.lastName,
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * fetches user information from FireStore
     * private as its only used in the static login method
     *
     */
    private async fetchUserDetails(): Promise<void> {
        const doc = await app.firestore().collection('users').doc(this.uid).get();
        try {
            const data = doc.data() as UserDoc;

            this.firstName = data.firstName;
            this.lastName = data.lastName;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @param firstName: user's first name
     * @param lastName:user's last name
     * @param email: user's email
     * @param password: user's password
     * creates a new user from email and password.
     * adds user information to FireStore
     * @return returns User object if successful otherwise null
     */
    public static async signUp(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
    ): Promise<User | undefined> {
        try {
            const res = await app.auth().createUserWithEmailAndPassword(email, password);
            if (res.user != null) {
                const user = new User(res.user.uid, email, firstName, lastName);
                user.addToDb();
                return user;
            } else {
                console.log(res); //
            }
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * @author Mohamad Abdel Rida
     * This method is to be called when a user
     * wishes to sign out from the application.
     * Can be called as a static on the User class
     *
     */
    public static async signOut(): Promise<void> {
        try {
            const res = await app.auth().signOut();
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * @param email:user's email
     * @param password:user's password
     * logs user in
     * @return User object if successful otherwise null
     */
    public static async login(email: string, password: string): Promise<User | undefined> {
        try {
            const res = await app.auth().signInWithEmailAndPassword(email, password);
            if (res.user) {
                const user = new User(res.user.uid, email);
                await user.fetchUserDetails();
                return user;
            } else {
                console.log(res); //
            }
        } catch (e) {
            console.log(e);
        }
    }
}
