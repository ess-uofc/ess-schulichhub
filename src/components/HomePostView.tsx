import React, { useEffect, useState } from 'react';
import './HomePostView.scss';
import { IonContent } from '@ionic/react';
import PostContainer from '../components/PostContainer';
import Post from '../Models/Post';
import FireStoreDB from '../Models/firestore';
import { PostDoc } from '../Models/DocTypes';
import { loadingComponent } from './Loading';
import { DocumentData, Timestamp } from '../Models/firebase';
import { PostCategory } from '../Models/Enums';
import { key } from 'ionicons/icons';
const HomePostView: React.FC = () => {
    const [posts, setPosts] = useState<Array<{ id: string; data: PostDoc }>>();
    const db = new FireStoreDB();
    async function getPosts() {
        /**
         * @author Mohamad ABdel Rida
         * Executes a query to get posts.
         * Gets posts that have a Timestamp
         *
         */
        // const post = await db.query<PostDoc>('posts', 'timestamp', '!=', '');
        const changes = db.db
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot({
                next: (snapshot: firebase.default.firestore.QuerySnapshot) => {
                    const snapshots = snapshot.docs;
                    const docs = snapshots.map((docSnapshot) => {
                        return { id: docSnapshot.id, data: docSnapshot.data() as PostDoc };
                    });

                    setPosts(docs);
                },
            });
    }
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <IonContent>
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
