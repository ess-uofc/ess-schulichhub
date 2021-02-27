import { UserDoc } from './DocTypes';
import { Auth, FirebaseUser, Firestore, Timestamp } from './firebase';
import FireStoreDB from './firestore';

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

export default class User implements UserDoc {
    /**
     * User class contains uid, firstName, lastName
     * @author Mohamad Abdel Rida
     *
     *
     */

    firstName: string;
    lastName: string;
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

    constructor(uid: string, firstName: string, lastName: string, email: string,) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.uid = uid;
        this.email = email;
    }


}
