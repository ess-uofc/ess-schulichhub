import React, { useState } from 'react';
import { InputChangeEventDetail } from '@ionic/core';
import { IonContent, IonPage, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import './Login.scss';
import User from '../Models/User';
import { toast } from '../app/toast';
import { Auth } from '../Models/firebase';

/**
 * @author Carter Zimmer & Dennis Lieu
 * @constructor sets up the state variables that get bound to the input fields and
 * are used when the login button is clicked
 */
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * @author Carter Zimmer
     * @param email the user's email aka username
     * @param password the user's password
     */
    async function handleSubmit(email: string, password: string) {
        if (await User.login(email, password)) {
            toast('Yay!', 'login success');
            // history.push('/home');
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
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setEmail(e.detail.value ?? '')}
                />
                <IonInput
                    type="password"
                    placeholder="Password"
                    className="password loginInputs"
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setPassword(e.detail.value ?? '')}
                />
                <IonButton className="loginButton" onClick={async () => handleSubmit(email, password)}>
                    Sign In
                </IonButton>
                <div>
                    <IonButton onClick={Auth.signInWithGoogle} className="googleLogin">
                        Sign in with Google
                    </IonButton>
                </div>
                <IonButton className="testLogin" onClick={() => handleSubmit('test1@test.com', '123456')}>
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
