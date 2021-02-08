import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonItemDivider, IonRow, IonText, IonTitle } from '@ionic/react';
import '../pages/RegisterMain.scss';

const RegisterLanding: React.FC = () => {
    return (
        <div className="container">
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
                <IonButton className="custombutton" color="primary" href="/emailregister">
                    <span className="ButtonText">Sign Up With Email</span>
                </IonButton>
            </div>
            <IonText>
                Already have an account with the <span className="accentText">Hub</span>?
            </IonText>
            <div>
                <IonButton className="custombutton" color="primary" href="/login">
                    <span className="ButtonText">Sign In</span>
                </IonButton>
            </div>
            <IonTitle className="hubLogoText">LG SchulichHub</IonTitle>
            <IonItemDivider className="footerRule" color="secondary" />
            <p className="copyRight">© ESS Schulich School of Engineering U of C, 2020</p>
        </div>
    );
};

export default RegisterLanding;
