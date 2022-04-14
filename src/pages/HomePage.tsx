import React from 'react';
import { IonPage, IonButton } from '@ionic/react';
import '../styles/pages/Home.scss';
import HomePostView from '../components/HomePostView';
import { useSelector } from 'react-redux';
import { selectUser } from '../stores/users/user.store';

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
