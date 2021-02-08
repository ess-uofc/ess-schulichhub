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
                <IonImg className="image" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                <IonButton className="moreButtonActions" href="/post">
                    <IonIcon icon={ellipsisVerticalOutline} />
                </IonButton>
                <IonCardTitle className="postInfo text">{props.postData.title} </IonCardTitle>
                <IonCardSubtitle className="postInfo text">1 day ago - University of Calgary </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>{props.postData.content}</IonCardContent>
        </IonCard>
    );
};

export default PostContainer;
