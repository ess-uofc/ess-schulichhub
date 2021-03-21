import React, { useEffect, useState } from 'react';
import {
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonContent,
    IonLabel,
    IonPage,
    IonSkeletonText,
    IonTextarea,
} from '@ionic/react';
import './PostView.scss';
import PostComments from '../components/PostComments';
import CommentCompose from '../components/CommentCompose';
import Post from '../Models/Post';
import { useParams } from 'react-router-dom';
import Comment from '../Models/Comment';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/UserStore';
import { db } from '../Models/firebase';
import { ReplyCommentPairContext } from '../contexts/replyComment';
import _ from 'lodash';

interface PostViewComments {
    id: string;
    comment: Comment;
}

const PostView: React.FC = () => {
    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<PostViewComments[]>();
    const user = useSelector(selectUser);
    const { id } = useParams<{ id: string }>();
    const [replyToCommentID, setReplyToCommentID] = useState<string>('');

    const arrangeComments = (comments: PostViewComments[]): PostViewComments[] => {
        return _.orderBy(comments, (comment) => {
            return comment.comment.replyToComment.length === 0 ? comment.comment.id : comment.comment.replyToComment;
        }).reverse();
    };

    useEffect(() => {
        console.log('Adding event listeners...');
        const unSubscribeFromPosts = db.db
            .collection('posts')
            .withConverter(Post)
            .doc(id)
            .onSnapshot({
                next: (snapshot) => {
                    console.log('Fetched Post');
                    const doc = snapshot.data();
                    setPost(doc);
                },
            });
        const unSubscribeFromComments = db.db
            .collection('comments')
            .where('replyToPost', '==', id)
            .orderBy('timestamp', 'desc')
            .withConverter(Comment)
            .onSnapshot({
                next: (snapshot) => {
                    console.log('Fetched Comments');
                    const Comments = snapshot.docs.map((e) => {
                        return {
                            id: e.id,
                            comment: e.data(),
                        };
                    });
                    setComments(arrangeComments(Comments));
                    console.log(Comments);
                },
            });
        return () => {
            unSubscribeFromPosts();
            unSubscribeFromComments();
            console.log('Unsubscribed...');
        };
    }, [id]);
    return (
        <IonPage>
            <IonContent>
                <IonCard className="singlePost wrapper">
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
                            <IonTextarea spellcheck={true} auto-grow="true" value={post.content} readonly></IonTextarea>
                        ) : (
                            <IonSkeletonText animated />
                        )}
                    </IonCardContent>
                </IonCard>
                <ReplyCommentPairContext.Provider value={{ replyToCommentID, setReplyToCommentID }}>
                    <PostComments comments={comments} />
                    {user && <CommentCompose postId={id} />}
                </ReplyCommentPairContext.Provider>
            </IonContent>
        </IonPage>
    );
};

export default PostView;
