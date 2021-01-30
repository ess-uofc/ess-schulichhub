import React from 'react';
import {
    IonPage,
    IonContent,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonMenuButton,
    IonButtons,
    IonButton,
    IonIcon,
    IonText,
    IonItem,
    IonImg,
} from '@ionic/react';
import './Landing.scss';
import LandingFeatureBox from '../components/LandingFeatureBox';
import LandingRegisterPrompt from '../components/LandingRegisterPrompt';
import LandingInfo from '../components/LandingInfo';

const Landing: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton auto-hide="false">
                            <IonButton>
                                <IonIcon name="reorder-three-outline"></IonIcon>
                            </IonButton>
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle>Landing</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Landing</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonItem className="videoContainer" color="light">
                    <IonImg className="videoPlaceholder" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonItem>
                <LandingInfo />
                <LandingFeatureBox />
                <LandingRegisterPrompt />
                <IonText>[LOGO] SchulichHub</IonText>
                <IonItem className="footer ion-margin" color="secondary"></IonItem>
                <IonText>© ESS Schulich School of Engineering U of C, 2020</IonText>
            </IonContent>
        </IonPage>
    );
};

export default Landing;
