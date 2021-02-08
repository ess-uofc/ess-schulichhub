import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonInput, IonItemDivider, IonTitle } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { useState } from 'react';
import '../pages/RegisterMain.scss';

const RegisterForm: React.FC = () => {
    const [Email, setEmail] = useState<string>('');
    const [Username, setUsername] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [Cpassword, setCpassword] = useState<string>('');

    function RegisterUser() {
        if (Password == Cpassword) {
            console.log(Email, Username, Password, Cpassword);
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
                placeholder="Username"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setUsername(e.detail.value ?? '')}
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
