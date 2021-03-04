import React from 'react';
import './SingleComment.scss';
import { IonItem, IonAvatar, IonLabel, IonText } from '@ionic/react';

interface CommentProps {
    comment: Array<string>;
    toggled: boolean;
}

const SingleSubComment: React.FC<CommentProps> = (props: CommentProps) => {
    return (
        <IonItem className="subcommentItem" hidden={props.toggled}>
            <IonAvatar className="commentAvatar"></IonAvatar>
            <IonLabel className="commentUser">Just now.</IonLabel>
            <IonText className="commentContent">{props.comment[1]}</IonText>
        </IonItem>
    );
};

export default SingleSubComment;
