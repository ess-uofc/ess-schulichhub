import {
    db,
    FirebaseAuth,
    FirebaseAuthError,
    FirebaseUnsubscribe,
    FirebaseUser,
    GoogleProvider,
    OAuthProvider,
} from './firebase';
import PrimaryUser from './PrimaryUser';

export class Auth {
    private static auth = FirebaseAuth;
    protected static user = Auth.auth.currentUser;
    public static get googleProvider(): OAuthProvider {
        const provider = new GoogleProvider();
        provider.addScope('https://www.googleapis.com/auth/calendar.events');
        return provider;
    }

    public static get microsoftProvider(): OAuthProvider {
        const provider = new OAuthProvider('microsoft.com');
        provider.setCustomParameters({
            tenant: 'feecbd0c-7306-472b-916c-41e5803e85c3',
            prompt: 'consent',
        });
        provider.addScope('calendars.read');
        provider.addScope('calendars.write');

        return provider;
    }
    /**
     * @author Mohamad Abdel Rida
     * signs a user in using google redirect. Doesn't work properly
     * @todo implement cordova google sign in
     */
    static signInWithGoogle = async (): Promise<PrimaryUser | void> => {
        const googleProvider = Auth.googleProvider;

        try {
            const res = await Auth.auth.signInWithPopup(googleProvider);
            const user = res.user;

            if (res.additionalUserInfo?.isNewUser && user && user.displayName && user.email) {
                const [firstName, ...lastName] = user.displayName?.split(' ');
                const docRef = db.db.collection('users').doc(user.uid);

                const details = {
                    firstName: firstName,
                    lastName: lastName.join(),
                    email: user.email,
                    uid: user.uid,
                    major: '',
                    ref: docRef,
                };
                const primaryUser = new PrimaryUser(user, details);
                await details.ref.withConverter(PrimaryUser).set(primaryUser);
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
     * @todo implement cordova google sign in
     */
    static signInWithMicrosoft = async (): Promise<PrimaryUser | void> => {
        const provider = Auth.microsoftProvider;

        try {
            const res = await Auth.auth.signInWithPopup(provider);
            const user = res.user;

            if (res.additionalUserInfo?.isNewUser && user && user.displayName && user.email) {
                const [firstName, ...lastName] = user.displayName?.split(' ');
                const docRef = db.db.collection('users').doc(user.uid);

                const details = {
                    firstName: firstName,
                    lastName: lastName.join(),
                    email: user.email,
                    uid: user.uid,
                    major: '',
                    ref: docRef,
                };
                const primaryUser = new PrimaryUser(user, details);
                await details.ref.withConverter(PrimaryUser).set(primaryUser);
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
            const res = await this.auth.signInWithEmailAndPassword(email, password);
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
        details: { firstName: string; lastName: string; major: string; [key: string]: string },
    ): Promise<PrimaryUser | undefined> {
        try {
            const res = await this.auth.createUserWithEmailAndPassword(email, password);
            if (res.user) {
                const user = res.user;
                await user.updateProfile({ displayName: [details.firstName, details.lastName].join(' ') });
                const docRef = db.db.collection('users').doc(user.uid);
                const primaryUser = new PrimaryUser(user, { uid: user.uid, email: email, ref: docRef, ...details });
                primaryUser.verifyEmail();
                console.log(primaryUser);
                try {
                    await docRef.withConverter(PrimaryUser).set(primaryUser);
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
