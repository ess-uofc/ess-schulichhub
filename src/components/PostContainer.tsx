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
    const [popOver, setPopOver] = useState<{
        event: React.MouseEvent<HTMLIonIconElement, MouseEvent> | undefined;
        show: boolean;
    }>({ show: false, event: undefined });
    async function handleDelete(postData: Post) {
        /**
         * @author Mohamad Abdel Rida
         * @param postId, the post to be deleted
         */
        setPopOver({ show: false, event: undefined });

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
                <IonPopover
                    cssClass=""
                    event={popOver.event?.nativeEvent}
                    isOpen={popOver.show}
                    onDidDismiss={() => setPopOver({ show: false, event: undefined })}
                >
                    <IonList lines="none">
                        <IonListHeader className="listHeader">Options</IonListHeader>
                        <IonItem className="item">
                            <IonLabel>Share</IonLabel> <IonIcon className="stickRight" icon={share}></IonIcon>
                        </IonItem>
                        <IonItem onClick={() => handleDelete(props.postData)}>
                            <IonLabel>Delete</IonLabel> <IonIcon className="stickRight" icon={trash}></IonIcon>
                        </IonItem>
                    </IonList>
                </IonPopover>
                <IonIcon
                    onClick={(e: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => {
                        e.persist();
                        setPopOver({
                            show: true,
                            event: e,
                        });
                    }}
                    className="options"
                    icon={ellipsisVertical}
                ></IonIcon>
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
