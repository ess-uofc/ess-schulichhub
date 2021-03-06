import React, { useEffect, useState } from 'react';
import './HomePostView.scss';
import { IonContent, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import PostContainer from '../components/PostContainer';
import Post from '../Models/Post';
import { PostCategory } from '../Models/Enums';
import PostSkeleton from './PostContainerSkeleton';
import { db, QuerySnapshot } from '../Models/firebase';
const HomePostView: React.FC = () => {
    const [posts, setPosts] = useState<{ id: string; data: Post }[]>();
    const [postFilters, SetPostFilters] = useState<PostCategory[]>([]);
    function handleSnapshot(snapshot: QuerySnapshot) {
        /**
         * @author Mohamad Abdel Rida
         * @param snapshot firebase query snapshot - post snapshot in this case
         *
         * transforms post collection into an array of objects of type {id:string, data:PostDoc}
         * to serve frontend
         *
         */
        console.log('Updated');
        const snapshots = snapshot.docs;
        const docs = snapshots.map((docSnapshot) => {
            return { id: docSnapshot.id, data: docSnapshot.data() as Post };
        });

        setPosts(docs);
    }
    function getPosts() {
        /**
         * @author Mohamad ABdel Rida
         * Executes a query to get posts.
         * Gets posts that have a Timestamp
         *
         */
        const postsCollection = db.db.collection('posts').orderBy('timestamp', 'desc').withConverter(Post);

        if (postFilters.length != 0) {
            return postsCollection.where('category', 'in', postFilters).onSnapshot({ next: handleSnapshot });
        } else {
            return postsCollection.onSnapshot({
                next: handleSnapshot,
            });
        }
    }

    useEffect(() => {
        console.log('Fetching Posts');
        const unSubscribe = getPosts();
        return () => {
            unSubscribe();
        };
    }, [posts?.length, postFilters.length]);
    return (
        <IonContent>
            <IonLabel>Post Category</IonLabel>
            <IonSelect
                value={postFilters}
                multiple={true}
                cancelText="Nvm.."
                okText="Okay"
                onIonChange={(e) => SetPostFilters(e.detail.value)}
                placeholder="No Filters"
            >
                {Object.keys(PostCategory).map((v, k) => {
                    return (
                        <IonSelectOption key={k} value={v}>
                            {v}
                        </IonSelectOption>
                    );
                })}
            </IonSelect>
            {posts ? (
                posts.map((v, k) => {
                    return <PostContainer key={k} postData={v.data} />;
                })
            ) : (
                <PostSkeleton />
            )}
        </IonContent>
    );
};

export default HomePostView;
