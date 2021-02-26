import firebase from 'firebase';
import PrimaryUser from './PrimaryUser';

export const Timestamp = firebase.firestore.Timestamp;
export type Timestamp = firebase.firestore.Timestamp;
export type DocumentData = firebase.firestore.DocumentData;
export type WhereFilterOp = firebase.firestore.WhereFilterOp;
export type FirebaseUser = firebase.User;
export type QuerySnapshot = firebase.firestore.QuerySnapshot;
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
    static user = Auth.auth.currentUser;

    static signInWithGoogle = async () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        try {
            const res = await Auth.auth.signInWithPopup(googleProvider);
            if (res.user) {
                return new PrimaryUser(res.user);
            } else {
            }
        } catch (e) {}
    };
    static async signInWithEmail(email: string, password: string): Promise<PrimaryUser | undefined> {
        try {
            const res = await this.auth.signInWithEmailAndPassword(email, password);
            const user = res.user;
            if (user) {
                return new PrimaryUser(user);
            }
        } catch (e) {
            console.log(e);
        }
    }
    static async signOut() {
        try {
            await this.auth.signOut();
        } catch (e) {
            console.log(e);
        }
    }
    static async createWithEmail(
        email: string,
        password: string,
        displayNames: { firstName: string; lastName: string },
    ): Promise<PrimaryUser | undefined> {
        try {
            const res = await this.auth.createUserWithEmailAndPassword(email, password);
            if (res.user) {
                const user = res.user;
                user.updateProfile({ displayName: [displayNames.firstName, displayNames.lastName].join(' ') });
                return new PrimaryUser(user);
            }
        } catch (e) {
            console.log(e);
        }
    }
    onAuthStateChange(
        callback: (user: FirebaseUser | null) => void,
        error?: (e: firebase.auth.Error) => void,
        completed?:(firebase.Unsubscribe),
    ) {
        return Auth.auth.onAuthStateChanged(callback, error, completed);
    }
}

export const Firestore = app.firestore();
export default app;
