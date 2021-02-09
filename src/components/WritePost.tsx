import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonListHeader, IonButton, IonInput } from '@ionic/react';
import FireStoreDB from '../Models/firestore';
import app, { Timestamp } from '../Models/firebase';
import { PostDoc } from '../Models/DocTypes';
import { InputChangeEventDetail } from '@ionic/core';
import { loadingComponent } from './Loading';
import firebase from 'firebase';

const WritePost: React.FC = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    async function uploadPost() {
        /**
         * @author Mohamad Abdel Rida
         *  Uploads a post
         */
        const user = app.auth().currentUser;
        setLoading(true);

        if (user) {
            const _now = firebase.firestore.Timestamp.now();
            await FireStoreDB.uploadDoc<PostDoc>('posts', {
                title: title,
                uid: user.uid,
                content: content,
                timestamp: _now,
            });
            setLoading(false);
        }
    }
    return loading ? (
        loadingComponent
    ) : (
        <IonList>
            <IonListHeader>
                <IonLabel>Write Post</IonLabel>
            </IonListHeader>
            <IonItem>
                <IonLabel>Title</IonLabel>
                <IonInput
                    type="text"
                    value={title}
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setTitle(e.detail.value ?? '')}
                ></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Content</IonLabel>
                <IonInput
                    type="text"
                    value={content}
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setContent(e.detail.value ?? '')}
                ></IonInput>
            </IonItem>
            <IonButton color="danger" onClick={uploadPost}>
                Upload Post
            </IonButton>
        </IonList>
    );
};
export default WritePost;
