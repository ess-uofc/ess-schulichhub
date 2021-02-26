import firebase from 'firebase';
import { UserDoc } from './DocTypes';
import { FirebaseUser } from './firebase';
import User from './User';

export default class PrimaryUser extends User {
    firstName: string;
    lastName: string;
    uid: string;
    major?: string;
    private user: FirebaseUser;

    constructor(user: FirebaseUser) {
        if (user.displayName) {
            const [firstName, ...lastName] = user.displayName.split(' ');
            super(user.uid, firstName, lastName.join(), user?.email ?? '');

            this.firstName = firstName;
            this.lastName = lastName.join();
        } else {
            super(user.uid, '', '', user?.email ?? '');
            this.firstName = '';
            this.lastName = '';
        }
        this.uid = user.uid;
        this.user = user;
    }

    public async delete() {
        await this.user.delete();
    }
    public async verifyEmail() {
        await this.user.sendEmailVerification();
    }
}
