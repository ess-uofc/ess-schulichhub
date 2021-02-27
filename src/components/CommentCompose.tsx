import React, { useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonIcon, IonTextarea } from '@ionic/react';
import './CommentCompose.scss';
import FireStoreDB from '../Models/firestore';
import { CommentDoc, UserDoc } from '../Models/DocTypes';
import { Timestamp } from '../Models/firebase';
import { arrowForward } from 'ionicons/icons';
import PropTypes from 'prop-types';
import PrimaryUser from '../Models/PrimaryUser';

const CommentCompose: React.FC<{ user: PrimaryUser; postId: string }> = (props) => {
    const [content, setContent] = useState<string>();
    const db = new FireStoreDB();

    function handleComment() {
        if (content) {
            const now = Timestamp.now();
            db.uploadDoc<CommentDoc>('comments', {
                user: props.user.toJson(),
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
    user: PropTypes.instanceOf(PrimaryUser).isRequired,
};
