import React from 'react';
import { IonPage, IonContent, IonImg, IonItem, IonText, IonButton } from '@ionic/react';
import './ProfileView.scss';

const bio = 'University of Calgary - ESS LOVER \n This is the Bio \n It supports multiline stuff';
const name = 'Student Name';

const ProfileView: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonItem className="wrapper">
                    <h4>Profile</h4>
                </IonItem>
                <IonImg className="videoPlaceholder" src="https://essucalgary.com/images/ess-logo.png" />
                <h2>{name}</h2>
                <div className="multiline">{bio}</div>
                <IonButton className="follow">Follow</IonButton>
                <IonItem>Previous Posts:</IonItem>
                <IonContent>
                    Posts Go Here Mohammed should do this cuz he got it set up some fancy ass way haha
                </IonContent>
                <IonText>[LOGO] SchulichHub</IonText>
                <IonItem className="footer ion-margin" color="secondary" />
                <IonText className="bottomOfPage">© ESS Schulich School of Engineering U of C, 2020</IonText>
            </IonContent>
        </IonPage>
    );
};

export default ProfileView;
