import React, { useState } from 'react';
import { InputChangeEventDetail } from '@ionic/core';
import { IonContent, IonPage, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import './Login.scss';
import { toast } from '../app/toast';
import { Auth } from '../Models/Auth';

/**
 * @author Carter Zimmer & Dennis Lieu
 * @constructor sets up the state variables that get bound to the input fields and
 * are used when the login button is clicked
 */
const Login: React.FC = () => {
    const [userState, setUserState] = useState<{ email: string; password: string }>({ email: '', password: '' });

    /**
     * @author Carter Zimmer
     */
    async function handleSubmit() {
        const user = await Auth.signInWithEmail(userState.email, userState.password);
        console.log(user);
        if (user) {
            toast('Yay!', 'login success');
        } else {
            toast('Oh no.. :(', 'login failed');
        }
    }

    return (
        <IonPage>
            <IonContent fullscreen className="loginContent">
                <IonInput
                    placeholder="Email"
                    className="username loginInputs"
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                        setUserState({ ...userState, email: e.detail.value ?? '' })
                    }
                />
                <IonInput
                    type="password"
                    placeholder="Password"
                    className="password loginInputs"
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                        setUserState({ ...userState, password: e.detail.value ?? '' })
                    }
                />
                <IonButton className="loginButton" onClick={async () => handleSubmit()}>
                    Sign In
                </IonButton>
                <div>
                    <IonButton onClick={Auth.signInWithGoogle} className="googleLogin">
                        Sign in with Google
                    </IonButton>
                </div>
                <IonButton
                    className="testLogin"
                    onClick={() => {
                        Auth.signInWithEmail('testUser@test.com', '123456');
                    }}
                >
                    Test Sign in
                </IonButton>
                <p>
                    New here?
                    <IonRouterLink routerLink="/register"> Join the Hub</IonRouterLink>
                </p>
                <IonRouterLink>Forgot Password?</IonRouterLink>
            </IonContent>
        </IonPage>
    );
};

export default Login;
