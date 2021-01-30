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
import { ellipsisVerticalOutline } from 'ionicons/icons';
import Post from '../Models/Post';

interface ContainerProps {
    postData: Post;
}

const PostContainer: React.FC<ContainerProps> = (props: ContainerProps) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonImg className="image"></IonImg>

                <IonCardTitle className="postInfo text">{props.postData.title}</IonCardTitle>
                <IonCardSubtitle className="postInfo text">1 day ago - University of Calgary</IonCardSubtitle>

                <IonButton className="moreButton actions" href="/home">
                    <IonIcon icon={ellipsisVerticalOutline} />
                </IonButton>
            </IonCardHeader>
            <IonCardContent>{props.postData.content}</IonCardContent>
        </IonCard>
    );
};

export default PostContainer;
