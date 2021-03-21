import React, { useEffect, useState } from 'react';
import { IonAvatar, IonButton, IonCard, IonCardContent, IonIcon, IonTextarea } from '@ionic/react';
import './CommentCompose.scss';
import { IComment } from '../Models/DocTypes';
import { db, Timestamp } from '../Models/firebase';
import { arrowForward } from 'ionicons/icons';
import PropTypes from 'prop-types';
import PrimaryUser from '../Models/PrimaryUser';
import { useReplyCommentPair } from '../contexts/replyComment';
import { selectUser } from '../features/User/UserStore';
import { useSelector } from 'react-redux';

const CommentCompose: React.FC<{ postId: string }> = (props) => {
    const [content, setContent] = useState<string>('');
    const { replyToCommentID } = useReplyCommentPair();
    const user = useSelector(selectUser);

    useEffect(() => {
        console.log('REPLYING TO', replyToCommentID);
    }, [replyToCommentID]);

    function handleComment() {
        if (content) {
            const now = Timestamp.now();
            user &&
                db.uploadDoc<IComment>('comments', {
                    user: { ...user.toJson(), photoUrl: user.getPhotoUrl() ?? '' },
                    replyToPost: props.postId,
                    replyToComment: replyToCommentID ?? '',
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
                        spellcheck={true}
                        placeholder="Write a comment..."
                        className="commentText"
                        onIonChange={(e) => setContent(e.detail.value ?? '')}
                    ></IonTextarea>
                </IonCardContent>
            </IonCard>
            <IonButton disabled={!user?.isEmailVerified} onClick={handleComment}>
                <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
        </>
    );
};

export default CommentCompose;
CommentCompose.propTypes = {
    postId: PropTypes.string.isRequired,
};
