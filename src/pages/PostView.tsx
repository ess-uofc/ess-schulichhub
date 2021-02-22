import React, { useEffect, useState } from 'react';
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
    IonSkeletonText,
    IonTextarea,
    IonToolbar,
} from '@ionic/react';
import './PostView.scss';
import PostComments from '../components/PostComments';
import CommentCompose from '../components/CommentCompose';
import Post from '../Models/Post';
import { PostCategory } from '../Models/Enums';
import { Timestamp } from '../Models/firebase';
import FireStoreDB from '../Models/firestore';
import { useParams } from 'react-router-dom';
import { PostDoc } from '../Models/DocTypes';

const PostView: React.FC = () => {
    const [post, setPost] = useState<Post>();
    const db = new FireStoreDB();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const unSubscribe = db.db
            .collection('posts')
            .doc(id)
            .onSnapshot({
                next: (snapshot) => {
                    console.log('Updated');
                    const doc = snapshot.data() as PostDoc;
                    const _post = new Post(
                        id,
                        doc.title,
                        doc.content,
                        doc.category as PostCategory,
                        doc.timestamp,
                        doc.uid,
                    );
                    setPost(_post);
                },
            });
        return unSubscribe;
    }, [post?.id]);
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
                        {post ? (
                            <IonCardTitle className="postName">{post.title}</IonCardTitle>
                        ) : (
                            <IonSkeletonText animated />
                        )}
                        {post ? (
                            <IonCardSubtitle className="postDescription">
                                University of Calgary - {post.getTimePosted()}
                            </IonCardSubtitle>
                        ) : (
                            <IonSkeletonText animated />
                        )}
                    </IonCardHeader>
                    <IonCardContent>
                        <IonChip className="subjectChip">
                            {post ? <IonLabel>{post.category}</IonLabel> : <IonSkeletonText animated />}
                        </IonChip>
                        {post ? (
                            <IonTextarea auto-grow="true" value={post.content}></IonTextarea>
                        ) : (
                            <IonSkeletonText animated />
                        )}
                    </IonCardContent>
                </IonCard>
                <PostComments> </PostComments>
                <CommentCompose />
                <IonButton> Submit </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default PostView;
