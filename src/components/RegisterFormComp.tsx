import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonInput, IonItemDivider, IonItem } from '@ionic/react';
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
        <div className="container">
            <h1 className="hubRegisterText">
                Join The <span className="accentTextBig">Hub</span>.
            </h1>
            <ul className="inputList">
                <IonItem className="inputItem">
                    <IonInput
                        type="email"
                        className="inputField"
                        placeholder="Email"
                        onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setEmail(e.detail.value ?? '')}
                    />
                </IonItem>
                <IonItem className="inputItem">
                    <IonInput
                        className="inputField"
                        placeholder="Username"
                        onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setUsername(e.detail.value ?? '')}
                    />
                </IonItem>
                <IonItem className="inputItem">
                    <IonInput
                        type="password"
                        className="inputField"
                        placeholder="Password"
                        onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setPassword(e.detail.value ?? '')}
                    />
                </IonItem>
                <IonItem className="inputItem">
                    <IonInput
                        type="password"
                        className="inputField"
                        placeholder="Confirm Password"
                        onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setCpassword(e.detail.value ?? '')}
                    />
                </IonItem>
            </ul>
            <IonButton className="custombutton" onClick={RegisterUser}>
                <span className="ButtonText">Sign Up</span>
            </IonButton>
            <h2 className="hubLogoText">LG SchulichHub</h2>
            <IonItemDivider className="footerRule" color="secondary" />
            <p className="copyRight">© ESS Schulich School of Engineering U of C, 2020</p>
        </div>
    );
};

export default RegisterForm;
