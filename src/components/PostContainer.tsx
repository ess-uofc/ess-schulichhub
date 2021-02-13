import React from 'react';
import './PostContainer.scss';
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonImg,
    IonButton,
} from '@ionic/react';
import { ellipsisVerticalOutline, trashBin } from 'ionicons/icons';
import Post from '../Models/Post';
import FireStoreDB from '../Models/firestore';
import app from '../Models/firebase';

interface ContainerProps {
    postData: Post;
}
const db = new FireStoreDB();

const PostContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
    async function handleDelete(postData: Post) {
        /**
         * @author Mohamad Abdel Rida
         * @param postId, the post to be deleted
         */
        try {
            const user = app.auth().currentUser;
            if (user) {
                user.uid == postData.uid
                    ? await db.deleteDoc(postData.id)
                    : alert('You can not delete this post because it does not belong to you.');
            }
        } catch (e) {}
    }
    return (
        <IonCard>
            <IonCardHeader>
                <IonImg className="image" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                <IonButton className="moreButtonActions" href="/post">
                    <IonIcon icon={ellipsisVerticalOutline} />
                </IonButton>
                <IonButton onClick={() => handleDelete(props.postData)} className="moreButtonActions">
                    <IonIcon icon={trashBin} />
                </IonButton>
                <IonCardTitle className="postInfo text">{props.postData.title} </IonCardTitle>
                <IonCardSubtitle className="postInfo text">
                    {props.postData.getTimePosted()} - University of Calgary{' '}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{props.postData.content}</IonCardContent>
        </IonCard>
    );
};

export default PostContainer;
