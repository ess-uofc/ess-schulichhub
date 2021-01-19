import React from 'react';
import './RegisterLanding.scss';
import { IonButton, IonItemDivider } from '@ionic/react';
import '../pages/RegisterMain.scss';

const RegisterLanding: React.FC = () => {
    return (
        <div className="container">
            <h1 className="hubRegisterText">
                <span>There’s nothing but </span>
                <span className="accentText">benefits</span> to joining the <span className="accentText">Hub </span>
                and registering your club, get started <span className="accentText">today</span>.
            </h1>
            <IonButton className="custombutton" color="tertiary">
                <span className="ButtonText">Sign in with Google</span>
            </IonButton>
            <div>
                <IonButton className="custombutton" color="primary" href="/emailregister">
                    <span className="ButtonText">Sign Up With Email</span>
                </IonButton>
            </div>
            <h1 className="hubRegisterText">
                Already have an account with the <span className="accentText">Hub</span>?
            </h1>
            <div>
                <IonButton className="custombutton" color="primary" href="/login">
                    <span className="ButtonText">Sign In</span>
                </IonButton>
            </div>
            <h2 className="hubLogoText">LG SchulichHub</h2>
            <IonItemDivider className="footerRule" color="secondary" />
            <p className="copyRight">© ESS Schulich School of Engineering U of C, 2020</p>
        </div>
    );
};

export default RegisterLanding;
