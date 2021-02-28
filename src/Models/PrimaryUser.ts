import { UserDoc } from './DocTypes';
import { FirebaseUser, Firestore } from './firebase';
import User from './User';

export default class PrimaryUser extends User {
    private user: FirebaseUser;

    constructor(user: FirebaseUser, details: UserDoc) {
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
            return new PrimaryUser(user, details as UserDoc);
        } catch (e) {}
    }

    /**
     * delete just the firebase instance of the user
     * doesn't delete any information associated with the user, such as user docs, comments posts, etc
     */
    public async delete(): Promise<void> {
        await this.user?.delete();
    }

    /**
     * Verify user email
     * @param {string} continueUrl where to send user after verification is completed
     */
    public async verifyEmail(continueUrl = 'https://hub.essucalgary.com/'): Promise<void> {
        await this.user.sendEmailVerification({ url: continueUrl });
    }
}
