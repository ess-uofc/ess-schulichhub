import React from 'react';
/**import { IoIosMenu } from "react-icons/io";**/
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './RegisterMain.css';
import RegisterForm from '../components/RegisterFormComp';
/**import '../theme/variables.css';**/

const Tab1: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="light">
                    <IonTitle className="hubLogoText">
                        <span>LG SchulichHub</span>
                    </IonTitle>
                </IonToolbar>
                <IonToolbar color="regheader">
                    <IonTitle>
                        <h1 className="hubRegisterHeader">Register for the Schulich Hub</h1>
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large"></IonTitle>
                    </IonToolbar>
                </IonHeader>
                <RegisterForm />
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
