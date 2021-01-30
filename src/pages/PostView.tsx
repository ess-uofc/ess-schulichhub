import React from 'react';
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonMenuButton,
    IonPage,
    IonTextarea,
    IonToolbar,
} from '@ionic/react';
import './PostView.scss';
import PostComments from '../components/PostComments';
import CommentCompose from '../components/CommentCompose';
import Post from '../Models/Post';

interface PostContent {
    postData: Post;
}

const testPost = new Post(
    'Test',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mauris purus. Nunc ut lorem nec est accumsan luctus. Proin rhoncus, dolor sit amet vehicula elementum, turpis nulla sagittis velit, at auctor est urna vehicula libero. Phasellus facilisis neque non euismod rhoncus. Phasellus ipsum erat, varius id tellus a, blandit posuere elit. Donec sagittis mauris tristique urna egestas, eget placerat ligula sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ut eleifend dolor. Donec non dolor laoreet, malesuada eros ut, aliquam nu',
    1612037497,
);

const PostView: React.FC<PostContent> = (props: PostContent) => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton auto-hide="false">
                            <IonButton>
                                <IonIcon name="reorder-three-outline"></IonIcon>
                            </IonButton>
                        </IonMenuButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonCard className="singlePost">
                    <IonCardHeader className="postInfo">
                        <IonAvatar className="postAvatar"></IonAvatar>
                        <IonCardTitle className="postName">{testPost.title}</IonCardTitle>
                        <IonCardSubtitle className="postDescription">University of Calgary - 1 Day ago</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonChip className="subjectChip">
                            <IonLabel>Subject</IonLabel>
                        </IonChip>
                        <IonChip className="subjectChip">
                            <IonLabel>Subject</IonLabel>
                        </IonChip>
                        <IonChip className="subjectChip">
                            <IonLabel>Subject</IonLabel>
                        </IonChip>
                        <IonTextarea auto-grow="true" value={testPost.content}></IonTextarea>
                    </IonCardContent>
                </IonCard>
                <PostComments> </PostComments>
                <CommentCompose />
            </IonContent>
        </IonPage>
    );
};

export default PostView;
