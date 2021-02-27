import { UserDoc } from './DocTypes';
import { QueryDocumentSnapshot, SnapshotOptions } from './firebase';
import PrimaryUser from './PrimaryUser';

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
    major: string;

    // Add user attributes here

    /**
     *
     * @param uid user id used in firebase
     * @param firstName user's first name | from FireStore or user input
     * @param lastName user's last name | from FireStore user input
     * @param email user's email address
     */

    constructor(doc: UserDoc) {
        this.firstName = doc.firstName;
        this.lastName = doc.lastName;
        this.uid = doc.uid;
        this.email = doc.email;
        this.major = doc.major;
    }

    public static toFirestore = (user: User | PrimaryUser) => {
        return {
            uid: user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            major: user.major,
        };
    };

    public toJson(): UserDoc {
        return {
            uid: this.uid,
            major: this.major,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
        };
    }
    public static fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
        const doc = snapshot.data() as UserDoc;
        return new this(doc);
    }
}
