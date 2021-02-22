import React from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonTextarea } from '@ionic/react';
import './CommentCompose.scss';

const CommentCompose: React.FC = () => {
    return (
        <IonCard>
            <IonCardContent>
                <IonAvatar></IonAvatar>
                <IonTextarea placeholder="Write a comment..." className="commentText"></IonTextarea>
            </IonCardContent>
        </IonCard>
    );
};

export default CommentCompose;
