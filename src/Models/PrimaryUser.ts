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
            const details = (await Firestore.collection('users').doc(user.uid).get()).data() as UserDoc;
            return new PrimaryUser(user, details);
        } catch (e) {}
    }

    public async delete() {
        await this.user?.delete();
    }
    public async verifyEmail() {
        await this.user?.sendEmailVerification();
    }
}
