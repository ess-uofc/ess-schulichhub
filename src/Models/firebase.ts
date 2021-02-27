import firebase from 'firebase';
import { UserDoc } from './DocTypes';
import PrimaryUser from './PrimaryUser';

export const Timestamp = firebase.firestore.Timestamp;
export type Timestamp = firebase.firestore.Timestamp;
export type DocumentData = firebase.firestore.DocumentData;
export type WhereFilterOp = firebase.firestore.WhereFilterOp;
export type FirebaseUser = firebase.User;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
export type QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;
export type SnapshotOptions = firebase.firestore.SnapshotOptions;
export type FirestoreDataConverter<T> = firebase.firestore.FirestoreDataConverter<T>;

const firebaseConfig = {
    apiKey: 'AIzaSyD9mulwyPhAR7tUp0MdZ31_RodyAhIMdpk',
    authDomain: 'project-hub-116d7.firebaseapp.com',
    databaseURL: 'https://project-hub-116d7.firebaseio.com',
    projectId: 'project-hub-116d7',
    storageBucket: 'project-hub-116d7.appspot.com',
    messagingSenderId: '60966505195',
    appId: '1:60966505195:web:c1cd5d9a1b2e1befa8ccae',
    measurementId: 'G-K08FLKLRRG',
};
const app: firebase.app.App = firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});
firebase.firestore().enablePersistence({ synchronizeTabs: true });

export class Auth {
    private static auth = app.auth();
    protected static user = Auth.auth.currentUser;

    static signInWithGoogle = async (): Promise<PrimaryUser | void> => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        try {
            const res = await Auth.auth.signInWithPopup(googleProvider);
            if (res.user) {
                return await PrimaryUser.fromUser(res.user);
            } else {
            }
        } catch (e) {}
    };
    static async signInWithEmail(email: string, password: string): Promise<PrimaryUser | undefined> {
        try {
            const res = await this.auth.signInWithEmailAndPassword(email, password);
            const user = res.user;
            if (user) {
                const details = await Auth.fetchUserDetails(user);
                if (details) {
                    return new PrimaryUser(user, details);
                } else {
                    Auth.signOut();
                }
            }
        } catch (e) {
            console.log(e);
        }
    }
    static async fetchUserDetails(user: firebase.User): Promise<UserDoc | undefined> {
        const res = (await Firestore.collection('users').doc(user.uid).get()).data();
        if (res) {
            return res as UserDoc;
        }
    }
    static async signOut(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (e) {
            console.log(e);
        }
    }
    static async createWithEmail(
        email: string,
        password: string,
        details: { firstName: string; lastName: string; major: string },
    ): Promise<PrimaryUser | undefined> {
        try {
            const res = await this.auth.createUserWithEmailAndPassword(email, password);
            if (res.user) {
                const user = res.user;
                user.updateProfile({ displayName: [details.firstName, details.lastName].join(' ') });
                const primaryUser = new PrimaryUser(user, { uid: user.uid, email: email, ...details });
                console.log(primaryUser);
                try {
                    await Firestore.collection('users').doc(user.uid).withConverter(PrimaryUser).set(primaryUser);
                } catch (e) {
                    console.log(e);
                }
                return primaryUser;
            }
        } catch (e) {
            console.log(e);
        }
    }
    static onAuthStateChange(
        callback: (user: PrimaryUser | undefined) => void,
        error?: (e: firebase.auth.Error) => void,
        completed?: firebase.Unsubscribe,
    ): firebase.Unsubscribe {
        return Auth.auth.onAuthStateChanged(
            async (user) => {
                if (user) {
                    const primaryUser = await PrimaryUser.fromUser(user);
                    console.log(primaryUser);
                    callback(primaryUser);
                }
            },
            error,
            completed,
        );
    }
}

export const Firestore = app.firestore();
export default app;
