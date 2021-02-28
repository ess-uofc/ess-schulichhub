import { db, FirebaseAuth, FirebaseAuthError, FirebaseUnsubscribe, GoogleProvider } from "./firebase";
import PrimaryUser from "./PrimaryUser";

export class Auth {
    private static auth = FirebaseAuth;
    protected static user = Auth.auth.currentUser;
    /**
     * @author Mohamad Abdel Rida
     * signs a user in using google redirect. Doesn't acutally work
     * @todo implement cordova google sign in
     */
    static signInWithGoogle = async (): Promise<PrimaryUser | void> => {
        const googleProvider = new GoogleProvider();
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
                const docRef = db.db.collection('users').doc(user.uid);
                // .collection('users').doc(user.uid).withConverter(PrimaryUser);
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
        error?: (e: FirebaseAuthError) => void,
        completed?: FirebaseUnsubscribe,
    ): FirebaseUnsubscribe {
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
