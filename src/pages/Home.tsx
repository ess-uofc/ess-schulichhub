import React from 'react';
import { IonPage, IonButton } from '@ionic/react';
import './Home.scss';
import HomePostView from '../components/HomePostView';

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonButton routerLink="/writePost" className="composeButton wrapper">
                Write a New Post...
            </IonButton>
            <HomePostView />
        </IonPage>
    );
};

export default Home;
