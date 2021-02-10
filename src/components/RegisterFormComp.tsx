import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonInput, IonItemDivider, IonTitle } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { useState } from 'react';
import '../pages/RegisterMain.scss';
import User from '../Models/User';

const RegisterForm: React.FC = () => {
    const [Email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [Cpassword, setCpassword] = useState<string>('');

    async function RegisterUser() {
        if (Password == Cpassword) {
            if (await User.signUp(firstName, lastName, Email, Password)) {
            } else {
                alert('Sign up failed');
            }
        } else {
            console.log('Password and confirm password do not match');
        }
    }

    return (
        <>
            <IonTitle>
                Join The <span className="accentTextBig">Hub</span>.
            </IonTitle>
            <IonInput
                type="email"
                className="registerInput"
                placeholder="Email"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setEmail(e.detail.value ?? '')}
            />
            <IonInput
                className="registerInput"
                placeholder="First Name"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setFirstName(e.detail.value ?? '')}
            />
            <IonInput
                className="registerInput"
                placeholder="Last Name"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setLastName(e.detail.value ?? '')}
            />
            <IonInput
                type="password"
                className="registerInput"
                placeholder="Password"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setPassword(e.detail.value ?? '')}
            />
            <IonInput
                type="password"
                className="registerInput"
                placeholder="Confirm Password"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setCpassword(e.detail.value ?? '')}
            />
            <IonButton className="custombutton" onClick={RegisterUser}>
                <span className="ButtonText">Sign Up</span>
            </IonButton>
            <IonTitle className="hubLogoText">LG SchulichHub</IonTitle>
            <IonItemDivider className="footerRule" color="secondary" />
            <p className="copyRight">© ESS Schulich School of Engineering U of C, 2020</p>
        </>
    );
};

export default RegisterForm;
