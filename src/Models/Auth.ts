import { db, FirebaseAuth } from './firebase';
import {
    GoogleAuthProvider,
    OAuthProvider,
    Auth as FBAuth,
    User as FirebaseUser,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    Unsubscribe,
    getAdditionalUserInfo,
    onAuthStateChanged,
} from 'firebase/auth';
import PrimaryUser from './PrimaryUser';
import { collection, doc, setDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

export class Auth {
    private static auth: FBAuth = FirebaseAuth;
    protected static user = Auth.auth.currentUser;
    public static get googleProvider(): GoogleAuthProvider {
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar.events');
        return provider;
    }

    public static get microsoftProvider(): OAuthProvider {
        const provider = new OAuthProvider('microsoft.com');
        return provider;
    }

    /**
     * @author Mohamad Abdel Rida
     * signs a user in using google redirect. Doesn't work properly
     */
    static signInWithGoogle = async (): Promise<PrimaryUser | void> => {
        const googleProvider = Auth.googleProvider;

        try {
            const res = await signInWithPopup(Auth.auth, googleProvider);
            const user = res.user;
            if (getAdditionalUserInfo(res)?.isNewUser && user && user.displayName && user.email) {
                const [firstName, ...lastName] = user.displayName?.split(' ');
                const docRef = doc(collection(db.db, 'users'), user.uid);

                const details = {
                    firstName: firstName,
                    lastName: lastName.join(),
                    email: user.email,
                    uid: user.uid,
                    major: '',
                    ref: docRef,
                };
                const primaryUser = new PrimaryUser(user, details);
                await setDoc(details.ref.withConverter(PrimaryUser), primaryUser);
                return primaryUser;
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    };
    /**
     * @author Mohamad Abdel Rida
     * signs a user in using google redirect. Doesn't work properly
     */
    static signInWithMicrosoft = async (): Promise<PrimaryUser | void> => {
        const provider = Auth.microsoftProvider;

        try {
            const res = await signInWithPopup(FirebaseAuth, provider);
            const user = res.user;

            if (getAdditionalUserInfo(res)?.isNewUser && user && user.displayName && user.email) {
                const [firstName, ...lastName] = user.displayName?.split(' ');
                const docRef = doc(collection(db.db, 'users'), user.uid);

                const details = {
                    firstName: firstName,
                    lastName: lastName.join(),
                    email: user.email,
                    uid: user.uid,
                    major: '',
                    ref: docRef,
                };
                const primaryUser = new PrimaryUser(user, details);
                await setDoc(details.ref.withConverter(PrimaryUser), primaryUser);
                return primaryUser;
            } else {
            }
        } catch (e) {
            console.log(e);
        }
    };
    /**
     * @author Mohamad Abdel Rida
     *
     * @param email:string user email address
     * @param password:string user password
     * @returns <PrimaryUser|undefined>: a primary user instance that has fully extended firebase functionality
     *
     */
    static async signInWithEmail(email: string, password: string): Promise<FirebaseUser | undefined> {
        try {
            const res = await signInWithEmailAndPassword(FirebaseAuth, email, password);
            const user = res.user;
            console.log(res);
            if (user) {
                return user;
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
        details: {
            firstName: string;
            lastName: string;
            major: string;
            [key: string]: string;
        },
    ): Promise<PrimaryUser | undefined> {
        try {
            const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
            if (res.user) {
                const user = res.user;
                await updateProfile(user, {
                    displayName: [details.firstName, details.lastName].join(' '),
                });
                const docRef = doc(collection(db.db, 'users'), user.uid);
                const primaryUser = new PrimaryUser(user, {
                    uid: user.uid,
                    email: email,
                    ref: docRef,
                    ...details,
                });
                primaryUser.verifyEmail();
                console.log(primaryUser);
                try {
                    await setDoc(docRef.withConverter(PrimaryUser), primaryUser);
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
        error?: (e: FirebaseError) => void,
        completed?: Unsubscribe,
    ): Unsubscribe {
        return onAuthStateChanged(
            FirebaseAuth,
            async (user) => {
                if (user) {
                    const primaryUser = await PrimaryUser.fromUser(user);
                    console.log(primaryUser);
                    callback(primaryUser);
                }
            },
            async (error) => console.log(error),
            completed,
        );
    }
}
