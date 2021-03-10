import React from 'react';
import './CommentView.scss';
import Comment from '../Models/Comment';
import { IonItem, IonAvatar, IonLabel, IonText, IonIcon } from '@ionic/react';
import { arrowUndo } from 'ionicons/icons';
import { useReplyCommentPair } from '../contexts/replyComment';

interface CommentProps {
    comment: Comment;
}

const CommentView: React.FC<CommentProps> = (props: CommentProps) => {
    const { setReplyToCommentID } = useReplyCommentPair();

    console.log(props.comment.user.photoUrl);
    return (
        <IonItem className="commentItem">
            <IonAvatar className="commentAvatar">
                <img src={props.comment.user.photoUrl ?? 'https://essucalgary.com/images/ess-logo.png'} />
            </IonAvatar>
            <IonLabel className="commentUser">{props.comment.getTimePosted()}</IonLabel>
            <IonText className="commentContent">{props.comment.content}</IonText>
            <IonIcon icon={arrowUndo} onClick={() => setReplyToCommentID(props.comment.id)} />
        </IonItem>
    );
};

export default CommentView;
