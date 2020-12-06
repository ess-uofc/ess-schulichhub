import React, { useState } from 'react';
import { InputChangeEventDetail } from '@ionic/core';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonRouterLink } from '@ionic/react';
import './Login.css';
import User from '../Models/User';

/**
 * @author Carter Zimmer
 * @param email the user's email aka username
 * @param password the user's password
 */
async function handleSubmit(email: string, password: string) {
    if (await User.login(email, password)) {
        alert('login success');
    } else {
        alert('login failed');
    }
}

/**
 * @author Carter Zimmer & Dennis Lieu
 * @constructor sets up the state variables that get bound to the input fields and
 * are used when the login button is clicked
 */
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="loginToolbar">
                    <IonTitle className="loginTitle">Login to the Schulich Hub</IonTitle>
                </IonToolbar>
            </IonHeader>
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
                    <IonButton className="googleLogin">Sign in with Google</IonButton>
                </div>
                <p>
                    New here? <IonRouterLink href="/register">Join the Hub</IonRouterLink>
                </p>
                <IonRouterLink>Forgot Password?</IonRouterLink>
            </IonContent>
        </IonPage>
    );
};

export default Login;
