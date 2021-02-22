import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import RegisterLanding from '../components/RegisterLandingComp';
import './RegisterMain.scss';

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <RegisterLanding />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
