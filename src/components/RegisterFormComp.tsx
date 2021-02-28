import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonInput, IonItemDivider, IonTitle } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { useState } from 'react';
import '../pages/RegisterMain.scss';
import { toast } from '../app/toast';
import { Auth } from '../Models/Auth';

const RegisterForm: React.FC = () => {
    const [userState, setUserState] = useState({
        email: '',
        password: '',
        cPassword: '',
        firstName: '',
        lastName: '',
        major: '',
    });

    async function RegisterUser() {
        if (userState.password == userState.cPassword) {
            if (await Auth.createWithEmail(userState.email, userState.password, userState)) {
            } else {
                toast('Oops...', 'Sign up failed');
            }
        } else {
            toast('Oh no...', 'Password and confirm password do not match');
        }
    }

    return (
        <>
            <IonTitle className="wrapper">
                Join The <span className="accentTextBig">Hub</span>.
            </IonTitle>
            <IonInput
                type="email"
                className="registerInput"
                placeholder="Email"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                    setUserState({ ...userState, email: e.detail.value ?? '' })
                }
            />
            <IonInput
                className="registerInput"
                placeholder="First Name"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                    setUserState({ ...userState, firstName: e.detail.value ?? '' })
                }
            />
            <IonInput
                className="registerInput"
                placeholder="Last Name"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                    setUserState({ ...userState, lastName: e.detail.value ?? '' })
                }
            />
            <IonInput
                type="password"
                className="registerInput"
                placeholder="Password"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                    setUserState({ ...userState, password: e.detail.value ?? '' })
                }
            />
            <IonInput
                type="password"
                className="registerInput"
                placeholder="Confirm Password"
                onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                    setUserState({ ...userState, cPassword: e.detail.value ?? '' })
                }
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
