import React from 'react';
import { IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Typing from 'react-typing-animation'
import './Landing.css';
import splash from '../images/Landing/splash.jpg'

const Landing: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        {/* <IonToolbar>
          <IonTitle>SchulichHub</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Homepage</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Landing" /> */}
        <div className="SplashDiv">
          <IonImg src={splash} className="LandingSplash" />
          <IonTitle className="Title">Engineering Students Society SchulichHub</IonTitle>
        </div>
        <div>
          <Typing loop={true}>
            <IonTitle>Connect with clubs</IonTitle>
            <Typing.Delay ms={3000} />
            <Typing.Backspace count={20} speed={20} />
            <IonTitle>Find opportunities</IonTitle>
            <Typing.Delay ms={3000} />
            <Typing.Backspace count={20} speed={20} />
            <IonTitle>Get involved</IonTitle>
            <Typing.Delay ms={3000} />
            <Typing.Backspace count={20} speed={20} />
          </Typing>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Landing;
