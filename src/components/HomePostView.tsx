import { IonContent, IonLabel, IonSelect, IonSelectOption, IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from '../app/toast';
import PostContainer from '../components/PostContainer';
import { selectUser } from '../features/User/UserStore';
import { PostAggregations } from '../Models/DocTypes';
import { PostCategory } from '../Models/Enums';
import { db, QueryDocumentSnapshot, QuerySnapshot, Timestamp } from '../Models/firebase';
import PostFirebase from '../Models/Post.firebase';
import PostAttachment from '../Models/PostAttachment';
import User, { UserError } from '../Models/User';
import './HomePostView.scss';
import PostSkeleton from './PostContainerSkeleton';

export class HomePost extends PostFirebase {
    username?: string;

    constructor(
        id: string,
        postReference: string,
        title: string,
        content: string,
        category: PostCategory,
        timestamp: Timestamp,
        uid: string,
        aggregations: PostAggregations,
        attachment?: PostAttachment,
        username?: string,
    ) {
        super(id, title, content, category, timestamp, uid, aggregations, postReference, attachment);
        this.username = username;
    }
}

const HomePostView: React.FC = () => {
    const [posts, setPosts] = useState<{ id: string; data: HomePost }[]>([]);
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

        const array = await Promise.all(
            snapshots.map(async (docSnapshot) => {
                const username = (await getUser(docSnapshot.data().uid)).fullName;
                const data = new HomePost(
                    docSnapshot.data().id,
                    docSnapshot.data().postReference,
                    docSnapshot.data().title,
                    docSnapshot.data().content,
                    docSnapshot.data().category,
                    docSnapshot.data().timestamp,
                    docSnapshot.data().uid,
                    docSnapshot.data().aggregations,
                    docSnapshot.data().attachment,
                    username,
                );
                return { id: docSnapshot.id, data };
            }),
        );
        setPosts(array);
    }
    //      * @author Mohamad Abdel Rida
    //      * @param snapshot firebase query snapshot - post snapshot in this case
    //      *
    //      * transforms post collection into an array of objects of type {id:string, data:PostDoc}
    //      * to serve frontend
    //      *
    //      */
    function getPosts() {
        /**
         * @author Mohamad ABdel Rida
         * Executes a query to get posts.
         * Gets posts that have a Timestamp
         *
         */
        const postsCollection = db.db.collection('posts').orderBy('timestamp', 'desc').withConverter(PostFirebase);
        if (postFilters.length !== 0) {
            return postsCollection.where('category', 'in', postFilters).onSnapshot({ next: handleSnapshot });
        } else {
            return postsCollection.onSnapshot({
                next: async (observerObject) => await handleSnapshot(observerObject),
            });
        }
    }

    async function getUser(id: string): Promise<User> {
        const users = await db.db.collection('users').where('uid', '==', id).withConverter(User).get();
        const result = users.docs.map((each: QueryDocumentSnapshot) => each.data() as User);
        if (result.length !== 0) return result[0];
        else {
            throw new UserError();
        }
    }
    const getReferenceData = (id: string) => {
        const found = posts.find((post) => post.data.id == id);
        return found ?? posts[0];
    };

    useEffect(() => {
        console.log('Fetching Posts');
        getPosts();
    }, [posts.length, postFilters.length]);

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
                posts.map((v) => {
                    return (
                        <>
                            {v.data.postReference && (
                                <PostContainer key={v.id} postData={v.data}>
                                    <>
                                        <PostContainer postData={getReferenceData(v.data.id).data} />
                                    </>
                                </PostContainer>
                            )}
                            {!v.data.postReference && <PostContainer key={v.id} postData={v.data} />}
                        </>
                    );
                })
            ) : (
                <PostSkeleton />
            )}
        </IonContent>
    );
};

export default HomePostView;
