import React from 'react';
import { IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
import './Home.scss';
import HomePostView from '../components/HomePostView';

const Home: React.FC = () => {
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
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonButton routerLink="/writePost" className="composeButton">
                Write a New Post...
            </IonButton>
            <HomePostView />
        </IonPage>
    );
};

export default Home;
