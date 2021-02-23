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
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
} from '@ionic/react';
import { ellipsisVertical, share, trash } from 'ionicons/icons';
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
    const [popOver, setPopOver] = useState<boolean>(false);
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
            <IonCardHeader>
                <IonPopover cssClass="" isOpen={popOver} onDidDismiss={() => setPopOver(false)}>
                    <IonList lines="none">
                        <IonListHeader className="listHeader">Options</IonListHeader>
                        <IonItem>
                            <IonLabel>Share</IonLabel> <IonIcon className="stickRight" icon={share}></IonIcon>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Delete</IonLabel> <IonIcon className="stickRight" icon={trash}></IonIcon>
                        </IonItem>
                    </IonList>
                </IonPopover>
                <IonButton className="stickRight" onClick={() => setPopOver(true)}>
                    <IonIcon icon={ellipsisVertical}></IonIcon>
                </IonButton>
                <IonCardTitle className="postInfo text">{props.postData.title} </IonCardTitle>
                <IonCardSubtitle className="postInfo text">
                    {props.postData.getTimePosted()} - University of Calgary{' '}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent onClick={() => history.push(`/post/${props.postData.id.split('/')[1]}`)}>
                <IonImg className="image" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                {props.postData.content}
            </IonCardContent>
        </IonCard>
    );
};

export default PostContainer;
