import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import './RegisterMain.scss';
import RegisterForm from '../components/RegisterFormComp';

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <RegisterForm />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
