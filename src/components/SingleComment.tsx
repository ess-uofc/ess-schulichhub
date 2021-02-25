import React from 'react';
import './SingleComment.scss';
import Comment from '../Models/Comment';
import { IonItem, IonAvatar, IonLabel, IonText, IonIcon } from '@ionic/react';
import { arrowUndo } from 'ionicons/icons';
import { Timestamp } from '../Models/firebase';

interface CommentProps {
    comment: Comment;
}

const SingleComment: React.FC<CommentProps> = (props: CommentProps) => {
    console.log((props.comment.timestamp?.seconds ?? 0) - Timestamp.now().seconds);
    return (
        <IonItem className="commentItem">
            <IonAvatar className="commentAvatar"></IonAvatar>
            <IonLabel className="commentUser">{props.comment.getTimePosted()}</IonLabel>
            <IonText className="commentContent">{props.comment.content}</IonText>
            <IonIcon icon={arrowUndo}></IonIcon>
        </IonItem>
    );
};

export default SingleComment;
