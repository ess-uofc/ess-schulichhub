import React from 'react';
import {IonPage, IonContent, IonImg, IonItem, IonText, IonButton} from '@ionic/react';
import './ProfileView.scss';

const ProfileView: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonItem className="wrapper">
                    <h4>Profile</h4>
                </IonItem>
                <IonImg className="videoPlaceholder" src="https://essucalgary.com/images/ess-logo.png"/>
                <h2>Student Name</h2>
                <IonText>Bio Goes Here !!</IonText>
                <div/>
                <IonButton className="button">Edit Profile</IonButton>
                <div className="bottomOfPage"/>
                <IonItem>Previous Posts:</IonItem>
                <IonContent />
                <IonText>[LOGO] SchulichHub</IonText>
                <IonItem className="footer ion-margin" color="secondary"></IonItem>
                <IonText className="bottomOfPage">© ESS Schulich School of Engineering U of C, 2020</IonText>
            </IonContent>
        </IonPage>
    );
};

export default ProfileView;
