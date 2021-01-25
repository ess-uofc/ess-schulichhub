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
import './Post.scss';
import PostComments from '../components/PostComments';
import CommentCompose from '../components/CommentCompose';

const Post: React.FC = () => {
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
                        <IonCardTitle className="postName">MyName</IonCardTitle>
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
                        <IonTextarea
                            auto-grow="true"
                            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut mauris purus. Nunc ut lorem nec est
                accumsan luctus. Proin rhoncus, dolor sit amet vehicula elementum, turpis nulla sagittis velit, at
                auctor est urna vehicula libero. Phasellus facilisis neque non euismod rhoncus. Phasellus ipsum erat,
                varius id tellus a, blandit posuere elit. Donec sagittis mauris tristique urna egestas, eget placerat
                ligula sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                Sed ut eleifend dolor. Donec non dolor laoreet, malesuada eros ut, aliquam nunc. Cras eget malesuada
                odio, eu vulputate erat. Aenean a tempus arcu, sit amet fermentum erat. Sed suscipit dui in mattis
                aliquet. Pellentesque condimentum, orci non sollicitudin rhoncus, ante lorem blandit mauris, et pretium
                augue augue et libero. Donec sagittis sapien erat, at egestas felis consequat at. Morbi pulvinar ipsum
                diam, id placerat arcu blandit eu. Mauris euismod ex non nibh mattis, in faucibus quam scelerisque.
                Interdum et malesuada fames ac ante ipsum primis in faucibus."
                        ></IonTextarea>
                    </IonCardContent>
                </IonCard>
                <PostComments> </PostComments>
                <CommentCompose />
            </IonContent>
        </IonPage>
    );
};

export default Post;
