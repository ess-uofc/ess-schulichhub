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
import '../styles/pages/PostView.scss';
import PostComments from '../components/PostComments';
import CommentCompose from '../components/CommentCompose';
import Post from '../services/FirebasePost.service';
import { useParams } from 'react-router-dom';
import Comment from '../services/FirebaseComment.service';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/UserStore';
import { db } from '../services/data/firebase';
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
    type sortedComment = { [key: string]: PostViewComments[] };
    const arrangeComments = (comments: PostViewComments[]): PostViewComments[] => {
        const sortedComments: sortedComment = {};
        comments.forEach((comment) => {
            if (comment.comment.replyToComment) {
                if (comment.comment.replyToComment in sortedComments) {
                    sortedComments[comment.comment.replyToComment].push(comment);
                } else {
                    sortedComments[comment.comment.replyToComment] = [comment];
                }
            } else {
                if (comment.id in sortedComments) {
                    sortedComments[comment.id].unshift(comment);
                } else {
                    sortedComments[comment.id] = [comment];
                }
            }
        });
        console.log('sorted', sortedComments);
        return _.orderBy(
            Object.keys(sortedComments).map((e) => {
                return sortedComments[e];
            }),
            (comments) => {
                return comments[0].comment.timestamp;
            },
        )
            .reverse()
            .flat();
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
                            <IonCardTitle className="postName">
                                {' '}
                                {post.postReference ? `Shared post: ${post.title}` : post.title}
                            </IonCardTitle>
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
