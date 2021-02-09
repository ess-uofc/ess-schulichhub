import React, { useEffect, useState } from 'react';
import './HomePostView.scss';
import { IonContent } from '@ionic/react';
import PostContainer from '../components/PostContainer';
import Post from '../Models/Post';
import FireStoreDB from '../Models/firestore';
import { PostDoc } from '../Models/DocTypes';
import { loadingComponent } from './Loading';
import { DocumentData, Timestamp } from '../Models/firebase';
const HomePostView: React.FC = () => {
    const [posts, setPosts] = useState<Array<DocumentData>>();
    async function getPosts() {
        const post = await FireStoreDB.query<PostDoc>('posts', 'title', '!=', '');
        setPosts(post);
    }
    useEffect(() => {
        getPosts();
    }, []);
    return (
        <IonContent>
            {posts
                ? posts.map((v, k) => {
                      console.log(Timestamp.fromMillis(v.timestamp));
                      return (
                          <PostContainer
                              key={k}
                              postData={new Post(v.title, v.content, Timestamp.fromMillis(v.timestamp))}
                          />
                      );
                  })
                : loadingComponent}
        </IonContent>
    );
};

export default HomePostView;
