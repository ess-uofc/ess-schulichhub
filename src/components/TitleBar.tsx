import React from 'react';
import {
    IonIcon,
    IonLabel,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonMenuToggle,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonAvatar,
    IonChip,
    IonImg,
} from '@ionic/react';
import { ellipseOutline, homeOutline, logOutOutline } from 'ionicons/icons';
import User from '../Models/User';

const TitleBar: React.FC = () => {
    return (
        <>
            <IonMenu side="start" content-id="main">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList>
                        <IonMenuToggle>
                            <IonItem routerLink="/home">
                                <IonIcon icon={homeOutline} size="small" class="ion-padding"></IonIcon>
                                <IonLabel>Home</IonLabel>
                            </IonItem>
                            <IonItem routerLink="/landing">
                                <IonIcon icon={ellipseOutline} size="small" class="ion-padding"></IonIcon>
                                <IonLabel>Landing</IonLabel>
                            </IonItem>
                            <IonItem onClick={() => User.signOut()}>
                                <IonIcon icon={logOutOutline} size="small" class="ion-padding"></IonIcon>
                                <IonLabel>Sign Out</IonLabel>
                            </IonItem>
                        </IonMenuToggle>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton auto-hide="false">
                            <IonButton>
                                <IonIcon name="reorder-three-outline"></IonIcon>
                            </IonButton>
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle>Schulich Hub</IonTitle>
                    <IonChip slot="end">
                        <IonAvatar>
                            <IonImg src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                        </IonAvatar>
                        <IonLabel>Username</IonLabel>
                    </IonChip>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default TitleBar;
