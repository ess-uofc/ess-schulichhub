import { IonContent, IonLabel, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from '../app/toast';
import PostContainer from '../components/PostContainer';
import { selectUser } from '../features/User/UserStore';
import { PostCategory } from '../Models/Enums';
import { db, QueryDocumentSnapshot, QuerySnapshot } from '../Models/firebase';
import Post from '../Models/Post';
import User, { UserError } from '../Models/User';
import './HomePostView.scss';
import PostSkeleton from './PostContainerSkeleton';

export interface HomePost extends Post {
    username?: string;
}

const HomePostView = () => {
    const [posts, setPosts] = useState<{ id: string; data: Post }[]>([]);
    const [postFilters, SetPostFilters] = useState<PostCategory[]>([]);
    const user = useSelector(selectUser);

    async function handleSnapshot(snapshot: QuerySnapshot) {
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

        snapshots.forEach(async (docSnapshot) => {
            const user1 = (await getUser(docSnapshot.data().uid)).fullName;
            const data = { ...docSnapshot.data(), username: user1 } as HomePost;
            const docs = [...posts, { id: docSnapshot.id, data }];
            setPosts(docs);
        });
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

    async function getUser(id: string): Promise<User> {
        const users = await db.db.collection('users').where('uid', '==', id).withConverter(User).get();
        const result = users.docs.map((each: QueryDocumentSnapshot) => each.data() as User);
        if (result.length !== 0) return result[0];
        else {
            console.log(id);
            throw new UserError();
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
                cancelText="Deselect All"
                okText="Okay"
                onIonCancel={() => SetPostFilters([])}
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
            <IonToast
                message={'Please verify your email to post or comment'}
                header={'Email Verification Required'}
                position={'bottom'}
                buttons={[
                    {
                        text: 'verify',
                        role: '',
                        handler: () => {
                            user?.verifyEmail();
                            toast('Email Verification Sent', '');
                        },
                    },
                ]}
                isOpen={!user?.isEmailVerified}
            />

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
