import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
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
export type SetOptions = firebase.firestore.SetOptions;
export type DocumentReference = firebase.firestore.DocumentReference;
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
export const analytics = firebase.analytics(); //UserEvent analytics such as login/creation page view etc...
export const messaging = firebase.messaging(); //Push notifications and in app messaging
firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});
firebase.firestore().enablePersistence({ synchronizeTabs: true });
export const Firestore = app.firestore();
export class Auth {
    private static auth = app.auth();
    protected static user = Auth.auth.currentUser;
    /**
     * @author Mohamad Abdel Rida
     * signs a user in using google redirect. Doesn't acutally work
     * @todo implement cordova google sign in
     */
    static signInWithGoogle = async (): Promise<PrimaryUser | void> => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        try {
            const res = await Auth.auth.signInWithPopup(googleProvider);
            if (res.user) {
                console.log(res.user);
                return await PrimaryUser.fromUser(res.user);
            } else {
            }
        } catch (e) {}
    };
    /**
     * @author Mohamad Abdel Rida
     *
     * @param email:string user email address
     * @param password:string user password
     * @returns <PrimaryUser|undefined>: a primary user instance that has fully extended firebase functionality
     *
     */
    static async signInWithEmail(email: string, password: string): Promise<PrimaryUser | undefined> {
        try {
            const res = await this.auth.signInWithEmailAndPassword(email, password);
            const user = res.user;
            if (user) {
                return PrimaryUser.fromUser(user);
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @author Mohamad Abdel Rida
     *
     * Sign out current primary user
     */
    static async signOut(): Promise<void> {
        try {
            await this.auth.signOut();
        } catch (e) {
            console.log(e);
        }
    }
    /**
     * @param email:string
     * @param password:string
     * @param details Partial UserDocument that includes user details
     */
    static async createWithEmail(
        email: string,
        password: string,
        details: { firstName: string; lastName: string; major: string; [key: string]: string },
    ): Promise<PrimaryUser | undefined> {
        try {
            const res = await this.auth.createUserWithEmailAndPassword(email, password);
            res.additionalUserInfo;
            if (res.user) {
                const user = res.user;
                await user.updateProfile({ displayName: [details.firstName, details.lastName].join(' ') });
                const docRef = Firestore.collection('users').doc(user.uid).withConverter(PrimaryUser);
                const primaryUser = new PrimaryUser(user, { uid: user.uid, email: email, ref: docRef, ...details });
                console.log(primaryUser);
                try {
                    await docRef.set(primaryUser);
                } catch (e) {
                    console.log(e);
                }
                return primaryUser;
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * @author Mohamad Abdel Rida
     *
     * Handles auth state changes, i.e. sign in, sign out
     * converts user
     * @callback function that handles a user object and converts it to primary user
     * @error function handles
     * @completed function what to do after action is completed
     */
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
