import React from 'react';
import './SingleComment.scss';
import Comment from '../Models/Comment';
import { IonItem, IonAvatar, IonLabel, IonText } from '@ionic/react';

interface CommentProps {
    comment: Comment;
}

const SingleComment: React.FC<CommentProps> = (props: CommentProps) => {
    return (
        <IonItem className="commentItem">
            <IonAvatar className="commentAvatar"></IonAvatar>
            {/* <IonLabel className="commentUser">{props.comment.timestamp}</IonLabel> */}
            <IonText className="commentContent">{props.comment.content}</IonText>
        </IonItem>
    );
};

export default SingleComment;
