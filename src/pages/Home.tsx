import React from 'react';
import { IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';
import HomePostView from '../components/HomePostView';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Home</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonButton className="composeButton">Write a New Post...</IonButton>

            <HomePostView />
        </IonPage>
    );
};

export default Home;
