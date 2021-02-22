import React, { useEffect, useState } from 'react';
import './HomePostView.scss';
import { IonContent, IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import PostContainer from '../components/PostContainer';
import Post from '../Models/Post';
import FireStoreDB from '../Models/firestore';
import { PostDoc } from '../Models/DocTypes';
import { loadingComponent } from './Loading';
import { PostCategory } from '../Models/Enums';
const HomePostView: React.FC = () => {
    const [posts, setPosts] = useState<Array<{ id: string; data: PostDoc }>>();
    const db = new FireStoreDB();
    const [postCategory, SetPostCategory] = useState<PostCategory>();
    function handleSnapshot(snapshot: firebase.default.firestore.QuerySnapshot) {
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
            return { id: docSnapshot.id, data: docSnapshot.data() as PostDoc };
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
        const postsCollection = db.db.collection('posts').orderBy('timestamp', 'desc');
        if (postCategory) {
            return postsCollection.where('category', '==', postCategory).onSnapshot({ next: handleSnapshot });
        } else {
            return postsCollection.onSnapshot({
                next: handleSnapshot,
            });
        }
    }

    useEffect(() => {
        const unSubscribe = getPosts();
        return () => {
            unSubscribe();
        };
    }, [posts?.length, postCategory]);
    return (
        <IonContent>
            <IonItem>
                <IonLabel>Post Category</IonLabel>
                <IonSelect
                    value={postCategory}
                    okText="Okay"
                    cancelText="Dismiss"
                    onIonChange={(e) => SetPostCategory(e.detail.value as PostCategory)}
                >
                    {Object.keys(PostCategory).map((v, e) => {
                        return (
                            <IonSelectOption key={e} value={v}>
                                {v}
                            </IonSelectOption>
                        );
                    })}
                </IonSelect>
            </IonItem>
            {posts
                ? posts.map((v, k) => {
                      return (
                          <PostContainer
                              key={k}
                              postData={
                                  new Post(
                                      'posts/' + v.id,
                                      v.data.title,
                                      v.data.content,
                                      PostCategory.Discussion,
                                      v.data.timestamp,
                                      v.data.uid,
                                  )
                              }
                          />
                      );
                  })
                : loadingComponent}
        </IonContent>
    );
};

export default HomePostView;
