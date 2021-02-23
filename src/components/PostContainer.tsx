import React, { useState } from 'react';
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
    IonPopover,
} from '@ionic/react';
import { ellipseOutline, trashBin } from 'ionicons/icons';
import Post from '../Models/Post';
import FireStoreDB from '../Models/firestore';
import app from '../Models/firebase';
import { useHistory } from 'react-router';
import { toast } from '../app/toast';

interface ContainerProps {
    postData: Post;
}
const db = new FireStoreDB();

const PostContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
    const history = useHistory();
    const [popOver, setPopOver] = useState<bool>();
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
                    : toast('Oops...', 'You can not delete this post because it does not belong to you.');
            }
        } catch (e) {}
    }
    return (
        <IonCard>
            <IonCardHeader onClick={() => history.push(`/post/${props.postData.id.split('/')[1]}`)}>
                <IonImg className="image" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                <IonPopover cssClass="my-custom-class" isOpen={popOver} onDidDismiss={() => setPopOver(false)}>
                    <p>This is popover content</p>
                </IonPopover>
                <IonButton onClick={() => setPopOver(true)}>
                    <IonIcon icon={ellipseOutline}></IonIcon>
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
