import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonItemDivider, IonRow, IonText, IonTitle } from '@ionic/react';
import '../pages/RegisterMain.scss';
import Footer from '../components/Footer';

const RegisterLanding: React.FC = () => {
    return (
        <div className="wrapper">
            <IonRow>
                <IonText className="registerText">
                    <span>There’s nothing but </span>
                    <span className="accentText">benefits</span> to joining the <span className="accentText">Hub </span>
                    and registering your club, get started <span className="accentText">today</span>.
                </IonText>
            </IonRow>
            <IonButton className="custombutton" color="tertiary">
                <span className="ButtonText">Sign in with Google</span>
            </IonButton>
            <div>
                <IonButton className="custombutton" color="primary" routerLink="/emailregister">
                    <span className="ButtonText">Sign Up With Email</span>
                </IonButton>
            </div>
            <IonText>
                Already have an account with the <span className="accentText">Hub</span>?
            </IonText>
            <div>
                <IonButton className="custombutton" color="primary" routerLink="/login">
                    <span className="ButtonText">Sign In</span>
                </IonButton>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterLanding;
