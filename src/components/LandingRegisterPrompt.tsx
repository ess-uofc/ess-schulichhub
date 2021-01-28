import React from 'react';
import { IonButton, IonItemDivider, IonText, IonItem, IonList } from '@ionic/react';
import '../pages/Landing.scss';

const LandingRegisterPrompt: React.FC = () => {
    return (
        <IonList className="RegisterPrompt">
            <IonItem className="RegisterTextSpot" lines="none">
                <IonText className="RegisterPromptText">
                    There’s nothing but benefits to joining the Hub and registering your club, get started today.
                </IonText>
            </IonItem>
            <IonButton href="register" size="large" className="RegisterPromptButton">
                Join Today
            </IonButton>
            <IonButton size="large" className="RegisterPromptButton">
                Contact Us
            </IonButton>
        </IonList>
    );
};

export default LandingRegisterPrompt;
