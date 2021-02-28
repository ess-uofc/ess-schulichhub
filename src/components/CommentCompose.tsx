import React, { useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonIcon, IonTextarea } from '@ionic/react';
import './CommentCompose.scss';
import { CommentDoc } from '../Models/DocTypes';
import { db, Timestamp } from '../Models/firebase';
import { arrowForward } from 'ionicons/icons';
import PropTypes from 'prop-types';
import PrimaryUser from '../Models/PrimaryUser';

const CommentCompose: React.FC<{ user: PrimaryUser; postId: string }> = (props) => {
    const [content, setContent] = useState<string>('');
    function handleComment() {
        if (content) {
            const now = Timestamp.now();
            db.uploadDoc<CommentDoc>('comments', {
                user: { ...props.user.toJson(), photoUrl: props.user.getPhotoUrl() ?? '' },
                replyTo: props.postId,
                content: content,
                timestamp: now,
            });
        }
    }
    return (
        <>
            <IonCard>
                <IonCardContent>
                    <IonAvatar></IonAvatar>
                    <IonTextarea
                        placeholder="Write a comment..."
                        className="commentText"
                        onIonChange={(e) => setContent(e.detail.value ?? '')}
                    ></IonTextarea>
                </IonCardContent>
            </IonCard>
            <IonButton onClick={handleComment}>
                <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
        </>
    );
};

export default CommentCompose;
CommentCompose.propTypes = {
    postId: PropTypes.string.isRequired,
    user: PropTypes.instanceOf(PrimaryUser).isRequired,
};
