import { IUser } from './models/DocTypes.model';
import { FirebaseUser, Firestore } from './data/firebase';
import User from './User.service';

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
            const details = (await Firestore.collection('users').withConverter(User).doc(user.uid).get()).data();
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
        console.log(await this.user.sendEmailVerification({ url: continueUrl }));
    }
}
