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
    IonRouterLink,
} from '@ionic/react';
import { ellipseOutline, homeOutline, logOutOutline } from 'ionicons/icons';
import { toast } from '../app/toast';
import { Auth } from '../Models/Auth';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/UserStore';

const TitleBar: React.FC = () => {
    const user = useSelector(selectUser);

    const handleSignOut = async () => {
        await Auth.signOut();
        toast('You have signed out :(', 'Signed out...');

        location.href = '/login';
    };

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
                            <IonItem onClick={() => handleSignOut()}>
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
                        <IonRouterLink color={'black'} routerLink={`/u/${user?.uid ?? ''}`}>
                            <IonLabel>{user?.fullName}</IonLabel>
                        </IonRouterLink>
                    </IonChip>
                </IonToolbar>
            </IonHeader>
        </>
    );
};

export default TitleBar;
