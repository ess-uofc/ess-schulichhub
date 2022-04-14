import { IonButton, IonContent, IonImg, IonItem, IonPage, IonTitle } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import PostContainer from '../components/PostContainer';
import { selectUser } from '../stores/users/user.store';
import { db } from '../services/data/firebase';
import Post from '../services/FirebasePost.service';
import PrimaryUser from '../services/PrimaryUser.service';
import User from '../services/User.service';
import '../styles/pages/ProfileView.scss';

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
            const user = (await db.db.collection('users').doc(uid).withConverter(User).get()).data();
            setUser(user);
        }
    }

    useEffect(() => {
        const isPrimaryUser = (user?.uid ?? '') == uid;
        setIsPrimaryUser(isPrimaryUser);
        setUserBasedOnType(isPrimaryUser);

        const userPostsQueryListener = db.db
            .collection('posts')
            .where('uid', '==', uid)
            .withConverter(Post)
            .onSnapshot({
                next: (snapshot) => {
                    setUserPosts(snapshot.docs.map((e) => e.data()));
                },
                error: (e) => {
                    console.log(e);
                },
            });
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
