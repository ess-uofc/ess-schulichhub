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
    IonSkeletonText,
} from '@ionic/react';
import { trashBin } from 'ionicons/icons';

const PostSkeleton: React.FC = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonImg className="image" src="https://essucalgary.com/images/ess-logo.png"></IonImg>
                <IonButton>
                    <IonIcon icon={trashBin} />
                </IonButton>
                <IonCardTitle className="postInfo text">
                    <IonSkeletonText></IonSkeletonText>
                </IonCardTitle>
                <IonCardSubtitle className="postInfo text">
                    <IonSkeletonText></IonSkeletonText>
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonSkeletonText></IonSkeletonText>
            </IonCardContent>
        </IonCard>
    );
};

export default PostSkeleton;
