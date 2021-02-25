import React, { useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonIcon, IonTextarea } from '@ionic/react';
import './CommentCompose.scss';
import FireStoreDB from '../Models/firestore';
import { CommentDoc } from '../Models/DocTypes';
import app, { Timestamp } from '../Models/firebase';
import { arrowForward } from 'ionicons/icons';
import PropTypes from 'prop-types';

const CommentCompose: React.FC<{ userId: string; postId: string }> = (props) => {
    const [content, setContent] = useState<string>();
    const db = new FireStoreDB();

    function handleComment() {
        if (content) {
            const now = Timestamp.now();
            db.uploadDoc<CommentDoc>('comments', {
                uid: props.userId,
                replyTo: props.postId,
                content: content,
                timestamp: now,
            });
        }
    }
    return (
        <IonCard>
            <IonCardContent>
                <IonAvatar></IonAvatar>
                <IonTextarea
                    placeholder="Write a comment..."
                    className="commentText"
                    onIonChange={(e) => setContent(e.detail.value ?? '')}
                ></IonTextarea>
            </IonCardContent>
            <IonButton onClick={handleComment}>
                <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
        </IonCard>
    );
};

export default CommentCompose;
CommentCompose.propTypes = {
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
};
