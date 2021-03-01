import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonInput, IonItemDivider, IonTitle } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { useState } from 'react';
import Select from 'react-select';
import '../pages/RegisterMain.scss';
import majors from '../majors';
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

    const faculties = Object.keys(majors);
    const facultyOptions = faculties.map((item) => ({
        value: item,
        label: item,
    }));

    const [faculty, setFaculty] = useState<string>();

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
            <Select options={facultyOptions} onChange={(e) => setFaculty(e?.value)}></Select>
            {faculty && (
                <Select
                    options={majors[faculty].map((item: string) => ({
                        value: item,
                        label: item,
                    }))}
                    isDisabled={faculty == null}
                    onChange={(e) => e && setUserState({ ...userState, major: e.value })}
                ></Select>
            )}
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
