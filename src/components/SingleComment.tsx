import React, { ReactElement } from 'react';
import './SingleComment.scss';
import Comment from '../Models/Comment';
import { IonItem, IonAvatar, IonLabel, IonText, IonIcon } from '@ionic/react';
import { arrowUndo } from 'ionicons/icons';
import { useState } from 'react';
import SingleSubComment from './SingleSubComment';

interface CommentProps {
    comment: Comment;
    commentArray: Array<number>;
}

const SingleComment: React.FC<CommentProps> = (props: CommentProps) => {
    const [hidden, setHidden] = useState<boolean>(true);
    function toggleSubcomments() {
        if (hidden) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    }
    function getSubcomments() {
        const subComments: Array<ReactElement> = [];
        {
            for (const comment in props.commentArray) {
                if (comment != '0') {
                    subComments.push(<SingleSubComment comment={testsubcomment} toggled={hidden} key={comment} />);
                }
            }
        }
        return subComments;
    }
    const testsubcomment = ['123456', 'This is a very basic test subcomment.'];
    console.log(props.comment.user.photoUrl);
    return (
        <>
            <IonItem className="commentItem" onClick={toggleSubcomments}>
                <IonAvatar className="commentAvatar">
                    <img src={props.comment.user.photoUrl ?? 'https://essucalgary.com/images/ess-logo.png'} />
                </IonAvatar>
                <IonLabel className="commentUser">{props.comment.getTimePosted()}</IonLabel>
                <IonText className="commentContent">{props.comment.content}</IonText>
                <IonIcon icon={arrowUndo}></IonIcon>
            </IonItem>
            {getSubcomments()}
        </>
    );
};

export default SingleComment;
