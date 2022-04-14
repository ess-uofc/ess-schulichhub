import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import RegisterForm from '../components/RegisterFormComp';

const RegisterFormPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <RegisterForm />
            </IonContent>
        </IonPage>
    );
};

export default RegisterFormPage;
