import React from 'react';
import { IonButton, IonGrid, IonRow, IonCol, IonHeader } from '@ionic/react';
import '../pages/Landing.scss';

const LandingRegisterPrompt: React.FC = () => {
    return (
        <IonGrid className="ion-margin">
            <IonRow className="ion-margin">
                <IonCol>
                    <IonHeader className="ion-margin ion-no-border">
                        There’s nothing but benefits to joining the Hub and registering your club, get started today!
                    </IonHeader>
                </IonCol>
                <IonCol>
                    <IonButton className="ion-margin" routerLink="/register">
                        Join Today
                    </IonButton>
                    <IonButton className="ion-margin">Contact Us</IonButton>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LandingRegisterPrompt;
