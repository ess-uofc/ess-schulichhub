import { IonButton, IonContent, IonImg, IonItem, IonPage, IonTitle } from '@ionic/react';
import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import PostContainer from '../components/PostContainer';
import { selectUser } from '../features/User/UserStore';
import { db } from '../Models/firebase';
import Post from '../Models/Post.firebase';
import PrimaryUser from '../Models/PrimaryUser';
import User from '../Models/User';
import './ProfileView.scss';

const ProfileView: React.FC = () => {
    const [user, setUser] = useState<User | PrimaryUser | undefined>();

    const { uid } = useParams<{ uid: string }>();
    const [userPosts, setUserPosts] = useState<Post[] | undefined>();
    const [isPrimaryUser, setIsPrimaryUser] = useState<boolean | undefined>();

    async function setUserBasedOnType(isPrimaryUser: boolean) {
        if (isPrimaryUser) {
            const user = useSelector(selectUser);
            setUser(user);
        } else {
            const user = (await getDoc(doc(db.db, 'users', uid).withConverter(User))).data();
            setUser(user);
        }
    }

    useEffect(() => {
        const isPrimaryUser = (user?.uid ?? '') == uid;
        setIsPrimaryUser(isPrimaryUser);
        setUserBasedOnType(isPrimaryUser);

        const userPostsQueryListener = onSnapshot(
            query(collection(db.db, 'posts'), where('uid', '==', uid)).withConverter(Post),
            (snapshot) => setUserPosts(snapshot.docs.map((e) => e.data())),
            (e) => console.log(e),
        );

        return () => {
            userPostsQueryListener();
        };
    }, []);
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonItem className="wrapper">
                    <IonTitle>Profile</IonTitle>
                </IonItem>
                <IonImg className="videoPlaceholder" src="https://essucalgary.com/images/ess-logo.png" />
                <IonTitle>{user?.fullName ?? ''}</IonTitle>
                <div className="multiline">{user?.bio ?? ''}</div>
                {!isPrimaryUser && <IonButton className="follow">Follow</IonButton>}
                <IonItem>Previous Posts:</IonItem>
                <IonContent>{userPosts && userPosts.map((e, k) => <PostContainer key={k} postData={e} />)}</IonContent>
                <Footer />
            </IonContent>
        </IonPage>
    );
};

export default ProfileView;
