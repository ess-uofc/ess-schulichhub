import React from 'react';
import '../styles/components/CommentView.scss';
import Comment from '../services/FirebaseComment.service';
import { IonItem, IonAvatar, IonLabel, IonText, IonIcon } from '@ionic/react';
import { arrowUndo } from 'ionicons/icons';
import { useReplyCommentPair } from '../contexts/replyComment';

interface CommentProps {
    comment: Comment;
}

const CommentView: React.FC<CommentProps> = (props: CommentProps) => {
    const { replyToCommentID, setReplyToCommentID } = useReplyCommentPair();

    console.log(props.comment.user.photoUrl);
    return (
        <IonItem
            className={
                props.comment.replyToComment && props.comment.replyToComment.length > 1
                    ? 'subCommentItem'
                    : 'commentItem'
            }
        >
            <IonAvatar className="commentAvatar">
                <img
                    src={
                        props.comment.user.photoUrl?.length
                            ? props.comment.user.photoUrl
                            : 'https://essucalgary.com/images/ess-logo.png'
                    }
                />
            </IonAvatar>
            <IonLabel className="commentUser">{props.comment.getTimePosted()}</IonLabel>
            <IonText className="commentContent">{props.comment.content}</IonText>
            {props.comment.replyToComment.length === 0 && (
                <IonIcon
                    icon={arrowUndo}
                    onClick={() => {
                        replyToCommentID === props.comment.id
                            ? setReplyToCommentID('')
                            : setReplyToCommentID(props.comment.id);
                    }}
                    style={replyToCommentID === props.comment.id ? { color: '#00c4b4' } : undefined}
                />
            )}
        </IonItem>
    );
};

export default CommentView;
