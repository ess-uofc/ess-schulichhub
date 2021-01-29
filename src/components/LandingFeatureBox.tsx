import React from 'react';
import { IonGrid, IonRow, IonCol, IonText, IonHeader, IonImg } from '@ionic/react';
import '../pages/Landing.scss';
import './LandingInfo.scss';

const LandingFeatureBox: React.FC = () => {
    return (
        <IonGrid>
            <IonRow>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
                <IonCol>
                    <IonHeader className="ion-margin">Get Special ESS Perks!</IonHeader>
                    <IonText className="ion-margin">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,sed quia consequuntur
                        magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porroquisquam est, qui dolorem.
                    </IonText>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonHeader className="ion-margin">Get Special ESS Perks!</IonHeader>
                    <IonText className="ion-margin">
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,sed quia consequuntur
                        magni dolores eos qui ratione voluptatem sequi nesciunt.Neque porroquisquam est, qui dolorem.
                    </IonText>
                </IonCol>
                <IonCol>
                    <IonImg className="placeholderBlock" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LandingFeatureBox;
