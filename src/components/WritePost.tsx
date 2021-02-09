import React, { useState } from 'react';
import { IonList, IonItem, IonLabel, IonListHeader, IonAvatar, IonText } from '@ionic/react';
import FireStoreDB from '../Models/firestore';

const PostComments: React.FC = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    FireStoreDB.uploadDoc('posts', {
        title: '',
        
    })
    return (
        <IonList className="commentContainer">
            <IonListHeader>
                <IonLabel>Comments</IonLabel>
            </IonListHeader>
            <IonItem className="commentItem">
                <IonAvatar className="commentAvatar"></IonAvatar>
                <IonLabel className="commentUser">Student Name</IonLabel>
                <IonText className="commentContent">comments are written here</IonText>
            </IonItem>
            <IonItem className="commentItem">
                <IonAvatar className="commentAvatar"></IonAvatar>
                <IonLabel className="commentUser">Student Name</IonLabel>
                <IonText className="commentContent">comments are written here</IonText>
            </IonItem>
            <IonItem className="commentItem">
                <IonAvatar className="commentAvatar"></IonAvatar>
                <IonLabel className="commentUser">Student Name</IonLabel>
                <IonText className="commentContent">comments are written here</IonText>
            </IonItem>
        </IonList>
    );
};

export default PostComments;
