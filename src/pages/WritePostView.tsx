import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import WritePost from '../components/WritePost';

const WritePostView: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <WritePost />
            </IonContent>
        </IonPage>
    );
};
export default WritePostView;
