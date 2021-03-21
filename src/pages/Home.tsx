import React from 'react';
import { IonPage, IonButton } from '@ionic/react';
import './Home.scss';
import HomePostView from '../components/HomePostView';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/UserStore';

const Home: React.FC = () => {
    const user = useSelector(selectUser);
    return (
        <IonPage>
            <IonButton disabled={!user?.isEmailVerified} routerLink="/writePost" className="composeButton wrapper">
                Write a New Post...
            </IonButton>
            <HomePostView />
        </IonPage>
    );
};

export default Home;
