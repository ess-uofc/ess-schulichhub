import React from 'react';
import '../styles/components/RegisterLanding.scss';
import { IonButton, IonInput, IonTitle, IonContent } from '@ionic/react';
import { InputChangeEventDetail } from '@ionic/core';
import { useState } from 'react';
import Select from 'react-select';
import majors from '../majors';
import { toast } from './data/toast';
import FirebaseAuthService from '../services/FirebaseAuth.service';
import Footer from '../components/Footer';

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
            if (await FirebaseAuthService.createWithEmail(userState.email, userState.password, userState)) {
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
        <IonContent>
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
            <Select
                className="facultySelect"
                placeholder="Select Faculty"
                options={facultyOptions}
                onChange={(e) => setFaculty(e?.value)}
            ></Select>
            {faculty && (
                <Select
                    placeholder="Select Major"
                    className="majorSelect"
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
            <Footer />
        </IonContent>
    );
};

export default RegisterForm;
