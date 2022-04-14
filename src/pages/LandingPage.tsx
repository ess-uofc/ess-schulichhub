import React from 'react';
import { IonPage, IonContent, IonItem, IonImg } from '@ionic/react';
import '../styles/pages/Landing.scss';
import LandingFeatureBox from '../components/LandingFeatureBox';
import LandingRegisterPrompt from '../components/LandingRegisterPrompt';
import LandingInfo from '../components/LandingInfo';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonItem className="videoContainer wrapper" color="light">
                    <IonImg className="videoPlaceholder" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonItem>
                <LandingInfo />
                <LandingFeatureBox />
                <LandingRegisterPrompt />
                <Footer />
            </IonContent>
        </IonPage>
    );
};

export default LandingPage;
