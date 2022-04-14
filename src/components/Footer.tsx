import React from 'react';
import '../styles/components/Footer.scss';
import { IonText, IonImg, IonFooter, IonToolbar, IonGrid, IonRow, IonCol, IonRouterLink } from '@ionic/react';

const Footer: React.FC = () => {
    return (
        <IonFooter>
            <IonToolbar className="ion-padding" color="light">
                <IonGrid fixed={true}>
                    <IonRow className="ion-padding">
                        <IonCol>
                            {/* Logo goes here */}
                            <IonImg className="logo_pic" src="https://essucalgary.com/images/ess-logo.png" />
                        </IonCol>
                        <IonCol className="footer_item">
                            <IonRouterLink href="https://essucalgary.com/">About</IonRouterLink>
                        </IonCol>
                        <IonCol className="footer_item">
                            <IonRouterLink href="">Contact</IonRouterLink>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-padding">
                        <IonCol>
                            <IonText>© ESS Schulich School of Engineering U of C, 2020</IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonToolbar>
        </IonFooter>
    );
};

export default Footer;
