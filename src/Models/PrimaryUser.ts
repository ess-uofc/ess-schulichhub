import { UserDoc } from './DocTypes';
import { FirebaseUser, Firestore } from './firebase';
import User from './User';

export default class PrimaryUser extends User {
    private user?: FirebaseUser;

    constructor(user: FirebaseUser, details: UserDoc) {
        super(details);
        this.user = user;
    }

    static async fromUser(user: FirebaseUser): Promise<PrimaryUser | undefined> {
        try {
            const details = (await Firestore.collection('users').withConverter(User).doc(user.uid).get()).data();
            return new PrimaryUser(user, details as UserDoc);
        } catch (e) {}
    }

    public async delete(): Promise<void> {
        await this.user?.delete();
    }
    public async verifyEmail(): Promise<void> {
        await this.user?.sendEmailVerification();
    }
}
