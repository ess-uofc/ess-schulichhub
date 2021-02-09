import React from 'react';
import {
    IonButton,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonIcon,
    IonButtons,
    IonTitle,
} from '@ionic/react';
import WritePost from '../components/WritePost';

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
