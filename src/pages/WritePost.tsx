import React, { useState } from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
    IonButton,
    IonInput,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonIcon,
    IonButtons,
    IonTitle,
} from '@ionic/react';
import FireStoreDB from '../Models/firestore';
import app from '../Models/firebase';
import { PostDoc } from '../Models/DocTypes';
import { InputChangeEventDetail } from '@ionic/core';
import firebase from 'firebase';
import WritePost from '../components/WritePost';
import { loadingComponent } from '../components/Loading';

const WritePostView: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton auto-hide="false">
                            <IonButton>
                                <IonIcon name="reorder-three-outline"></IonIcon>
                            </IonButton>
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle>Write A Post</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <WritePost />
            </IonContent>
        </IonPage>
    );
};
export default WritePostView;
