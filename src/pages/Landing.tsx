import React from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonButton,
    IonIcon,
    IonItemDivider,
    IonText,
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
                <IonItemDivider className="VideoPlaceholder">Video Placeholder</IonItemDivider>
                <LandingInfo />
                <LandingFeatureBox />
                <LandingRegisterPrompt />
                <IonText className="hubLogoText">LG SchulichHub</IonText>
                <IonItemDivider className="footerRule" color="secondary" />
                <IonText className="copyRight">© ESS Schulich School of Engineering U of C, 2020</IonText>
            </IonContent>
        </IonPage>
    );
};

export default Landing;
