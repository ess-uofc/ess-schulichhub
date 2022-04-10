import { sendEmailVerification, User as FirebaseUser } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { IUser } from './DocTypes';
import { db } from './firebase';
import User from './User';

export default class PrimaryUser extends User {
    private user: FirebaseUser;
    getPhotoUrl = (): string | null => this.user.photoURL;

    get isEmailVerified(): boolean {
        return this.user.emailVerified;
    }

    constructor(user: FirebaseUser, details: IUser) {
        super(details);
        this.user = user;
    }

    /**
     * @param {FirebaseUser} user: firebase user
     * create Primary User from Firebase User object
     *
     */
    static async fromUser(user: FirebaseUser): Promise<PrimaryUser | undefined> {
        try {
            const usersRef = collection(db.db, 'users').withConverter(User);
            const details = (await getDoc(doc(usersRef, user.uid))).data();
            return new PrimaryUser(user, details as IUser);
        } catch (e) {}
    }

    /**
     * delete just the firebase instance of the user
     * doesn't delete any information associated with the user, such as user docs, comments posts, etc
     */
    async delete(): Promise<void> {
        await this.user?.delete();
    }

    /**
     * Verify user email
     * @param {string} continueUrl where to send user after verification is completed
     */
    async verifyEmail(continueUrl = 'https://hub.essucalgary.com/'): Promise<void> {
        console.log(await sendEmailVerification(this.user, { url: continueUrl }));
    }
}
