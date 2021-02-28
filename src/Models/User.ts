import { UserDoc } from './DocTypes';
import { DocumentReference, QueryDocumentSnapshot, SetOptions, SnapshotOptions } from './firebase';
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
     *
     *@property  {string} firstName users first name.
     *@property {string} lastName users last name.
     *@property {string} uid UUID firebase uid
     *@property {stirng} email user Email
     *@property {string} major user's U of C major
     *@property {string} photoUrl users profile picture
     */

    firstName: string;
    lastName: string;
    email: string;
    uid: string;
    major: string;
    photoUrl?: string;
    ref: DocumentReference;

    // Add user attributes here

    /**
     *
     * @param doc UserDoc
     */

    constructor(doc: UserDoc) {
        this.firstName = doc.firstName;
        this.lastName = doc.lastName;
        this.uid = doc.uid;
        this.email = doc.email;
        this.major = doc.major;
        this.ref = doc.docRef;
    }

    public static toFirestore = (user: User | PrimaryUser) => {
        return user.toJson();
    };
    /**
     * Converts User to UserDoc primitive-ish
     *
     */
    public toJson(): UserDoc {
        return {
            uid: this.uid,
            major: this.major,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            ref: this.ref,
        };
    }
    /**
     * @param {QueryDocumentSnapshot} snapshot: snapshot of user document
     * @param {SnapshotOptions} options tells firebase how to handle certain fields
     */
    public static fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions) {
        const doc = snapshot.data() as UserDoc;
        return new this(doc);
    }
}
