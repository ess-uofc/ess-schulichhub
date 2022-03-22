import {
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonIcon,
    IonImg, IonItem,
    IonLabel, IonList,
    IonListHeader, IonPopover, IonRouterLink,
    IonTextarea
} from '@ionic/react';
import { ellipsisVertical, share, trash } from 'ionicons/icons';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from '../app/toast';
import { selectUser } from '../features/User/UserStore';
import { IPost } from '../Models/DocTypes';
import { db, Timestamp } from '../Models/firebase';
import { HomePost } from './HomePostView';
import './PostContainer.scss';

interface ContainerProps {
    postData: HomePost;
    children?: ReactElement;
}

const PostContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
    const [popOver, setPopOver] = useState<{
        event: React.MouseEvent<HTMLIonIconElement, MouseEvent> | undefined;
        show: boolean;
    }>({ show: false, event: undefined });
    const user = useSelector(selectUser);
    const history = useHistory();

    async function handleDelete() {
        /**
         * @author Mohamad Abdel Rida
         */
        setPopOver({ show: false, event: undefined });

        try {
            if (user) {
                user.uid === props.postData.uid
                    ? await db.deleteDoc('posts', props.postData.id)
                    : toast('Oops...', 'You can not delete this post because it does not belong to you.');
            }
        } catch (e) {
            console.error(e);
        }
    }

    async function handleShare() {
        if (user) {
            const _now = Timestamp.now();
            await db.uploadDoc<IPost>('posts', {
                title: props.postData.title,
                uid: user.uid,
                content: props.postData.content,
                timestamp: _now,
                category: props.postData.category,
                postReference: props.postData.postReference ?? props.postData.id,
                aggregations: {
                    comments: 0,
                    likes: 0,
                    views: 0,
                },
            });
            history.push('/home');
        }
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
                        <IonItem className="item" onClick={handleShare}>
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
                <IonCardTitle className="postInfo text">
                    {props.postData.postReference ? `Shared post: ${props.postData.title}` : props.postData.title}{' '}
                </IonCardTitle>
                <IonCardSubtitle className="postInfo text">
                    {props.postData.getTimePosted()} - University of Calgary{' '}
                </IonCardSubtitle>
                <IonCardSubtitle className="postInfo text">{props.postData.username}</IonCardSubtitle>
            </IonCardHeader>

            <IonRouterLink color={'black'} routerLink={`/post/${props.postData.postReference ?? props.postData.id}`}>
                <IonCardContent className="content">
                    <IonImg
                        className="image"
                        src={props.postData.attachment?.getHyperlink() ?? 'https://essucalgary.com/images/ess-logo.png'}
                    ></IonImg>
                    {props.children && props.children}
                    {!props.children && (
                        <IonTextarea readonly auto-grow="true" value={props.postData.content}></IonTextarea>
                    )}
                </IonCardContent>
            </IonRouterLink>
        </IonCard>
    );
};

export default PostContainer;
