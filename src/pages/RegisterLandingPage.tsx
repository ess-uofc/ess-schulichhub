import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import RegisterLanding from '../components/RegisterLandingComp';

const RegisterLandingPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <RegisterLanding />
            </IonContent>
        </IonPage>
    );
};

export default RegisterLandingPage;
