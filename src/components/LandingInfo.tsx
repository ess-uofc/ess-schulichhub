import React from 'react';
import './LandingInfo.scss';
import '../pages/Landing.scss';
import { IonButton, IonGrid, IonRow, IonCol, IonText, IonHeader, IonImg } from '@ionic/react';

const LandingInfo: React.FC = () => {
    return (
        <IonGrid className="ion-margin">
            <IonRow>
                <IonHeader className="ion-margin ion-no-border">
                    Connect with clubs and find opportunitites to get involved
                </IonHeader>
            </IonRow>
            <IonRow className="ion-margin">
                <IonCol>
                    <IonText className="ion-margin">Project Hub</IonText>
                    <IonText className="landingParagraphs ion-margin">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.
                    </IonText>
                    <IonButton className="learnMore ion-margin">Learn More</IonButton>
                </IonCol>
                <IonCol>
                    <IonText className="ion-margin">Volunteer Hub</IonText>
                    <IonText className="landingParagraphs ion-margin">
                        Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.
                    </IonText>
                    <IonButton className="learnMore ion-margin">Learn More</IonButton>
                </IonCol>
            </IonRow>
            <IonRow className="ion-margin">
                <IonCol>
                    <IonText className="ion-margin">Startup Hub</IonText>
                    <IonText className="landingParagraphs ion-margin">
                        Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                        qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.
                    </IonText>
                    <IonButton className="learnMore ion-margin">Learn More</IonButton>
                </IonCol>
                <IonCol>
                    <IonText className="ion-margin">Club Listings</IonText>
                    <IonText className="landingParagraphs ion-margin">
                        Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia
                        dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                    </IonText>
                    <IonButton className="learnMore ion-margin">Learn More</IonButton>
                </IonCol>
            </IonRow>
            <IonRow className="ion-margin">
                <IonHeader className="ion-margin ion-no-border">You&apos;re in good company</IonHeader>
            </IonRow>
            <IonRow className="ion-margin">
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
            </IonRow>
            <IonRow className="ion-margin">
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LandingInfo;
