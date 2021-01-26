import React from 'react';
import './PostComments.scss';
import { IonList, IonItem, IonLabel, IonListHeader, IonAvatar, IonText } from '@ionic/react';

const PostComments: React.FC = () => {
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
