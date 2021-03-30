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
    IonPopover,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonRouterLink,
    IonTextarea,
} from '@ionic/react';
import { ellipsisVertical, share, trash } from 'ionicons/icons';
import Post from '../Models/Post';
import { toast } from '../app/toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/UserStore';
import { db } from '../Models/firebase';

interface ContainerProps {
    postData: Post;
}

const PostContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
    const [popOver, setPopOver] = useState<{
        event: React.MouseEvent<HTMLIonIconElement, MouseEvent> | undefined;
        show: boolean;
    }>({ show: false, event: undefined });
    const user = useSelector(selectUser);

    async function handleDelete() {
        /**
         * @author Mohamad Abdel Rida
         */
        setPopOver({ show: false, event: undefined });

        try {
            if (user) {
                user.uid == props.postData.uid
                    ? await db.deleteDoc(props.postData.id)
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
                        <IonItem onClick={() => handleDelete()}>
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
            <IonRouterLink routerLink={`/post/${props.postData.id}`}>
                <IonCardContent className="content">
                    <IonImg
                        className="image"
                        src={props.postData.attachment?.getHyperlink() ?? 'https://essucalgary.com/images/ess-logo.png'}
                    ></IonImg>
                    <IonTextarea readonly auto-grow="true" value={props.postData.content}></IonTextarea>
                </IonCardContent>
            </IonRouterLink>
        </IonCard>
    );
};

export default PostContainer;
