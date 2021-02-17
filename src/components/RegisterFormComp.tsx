import React from 'react';
import './RegisterLanding.scss';
import {
    IonButton,
    IonInput,
    IonItemDivider,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonItem,
    IonLabel,
} from '@ionic/react';
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
            <IonTitle className="ion-margin">Join The Hub</IonTitle>
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
            <IonItem className="majorSelect">
                <IonLabel>Faculty</IonLabel>
                <IonSelect>
                    <IonSelectOption>Engineering</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonItem className="majorSelect">
                <IonLabel>Major</IonLabel>
                <IonSelect>
                    <IonSelectOption>Electrical</IonSelectOption>
                    <IonSelectOption>Chemical</IonSelectOption>
                    <IonSelectOption>Software</IonSelectOption>
                    <IonSelectOption>Mechanical</IonSelectOption>
                    <IonSelectOption>Civil</IonSelectOption>
                    <IonSelectOption>Geomatics</IonSelectOption>
                    <IonSelectOption>Oil & Gas</IonSelectOption>
                    <IonSelectOption>Energy</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonButton className="custombutton" onClick={RegisterUser}>
                <span className="ButtonText">Sign Up</span>
            </IonButton>
            <IonTitle className="hubLogoText ion-margin">LG SchulichHub</IonTitle>
            <IonItemDivider className="footerRule" color="secondary" />
            <p className="copyRight">© ESS Schulich School of Engineering U of C, 2020</p>
        </>
    );
};

export default RegisterForm;
