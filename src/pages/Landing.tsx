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
} from '@ionic/react';
import './Landing.scss';

const Tab1: React.FC = () => {
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
                <div className="VideoPlaceholder">Video Placeholder</div>
                <h2 className="hubLogoText">LG SchulichHub</h2>
                <IonItemDivider className="footerRule" color="secondary" />
                <p className="copyRight">© ESS Schulich School of Engineering U of C, 2020</p>
            </IonContent>
        </IonPage>
    );
};

export default Tab1;
