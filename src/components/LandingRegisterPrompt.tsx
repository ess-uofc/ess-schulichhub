import React from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonHeader } from '@ionic/react';
import '../pages/Landing.scss';

const LandingRegisterPrompt: React.FC = () => {
    return (
        <IonGrid className="ion-margin">
            <IonRow>
                <IonCol>
                    <IonHeader>
                        There’s nothing but benefits to joining the Hub and registering your club, get started today!
                    </IonHeader>
                </IonCol>
                <IonCol>
                    <IonButton href="register">Join Today</IonButton>
                    <IonButton>Contact Us</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LandingRegisterPrompt;
