import React, { useState } from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonListHeader,
    IonButton,
    IonInput,
    IonSelect,
    IonSelectOption,
} from '@ionic/react';
import FireStoreDB from '../Models/firestore';
import { Timestamp } from '../Models/firebase';
import { PostDoc } from '../Models/DocTypes';
import { InputChangeEventDetail } from '@ionic/core';
import { loadingComponent } from './Loading';
import { PostCategory } from '../Models/Enums';
import { useHistory } from 'react-router';
import './HomePostView.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/UserStore';

const WritePost: React.FC = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [postCategory, setPostCategory] = useState<string>(PostCategory.Discussion);
    const [loading, setLoading] = useState(false);
    const db = new FireStoreDB();
    const history = useHistory();
    const user = useSelector(selectUser);
    // NOTE: Enable this if User needs to be accessed within this file
    console.log(user);

    async function uploadPost() {
        /**
         * @author Mohamad Abdel Rida
         *  Uploads a post
         */
        // const user = app.auth().currentUser;

        setLoading(true);

        if (user) {
            const _now = Timestamp.now();
            await db.uploadDoc<PostDoc>('posts', {
                title: title,
                uid: user.uid,
                content: content,
                timestamp: _now,
                category: postCategory,
            });
            setLoading(false);
            history.push('/home');
        }
    }
    return loading ? (
        loadingComponent
    ) : (
        <IonList className="wrapper">
            <IonListHeader>
                <IonLabel>Write Post</IonLabel>
            </IonListHeader>
            <IonItem>
                <IonLabel>Title</IonLabel>
                <IonInput
                    type="text"
                    value={title}
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setTitle(e.detail.value ?? '')}
                ></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel>Category</IonLabel>
                <IonSelect
                    value={postCategory}
                    okText="Okay"
                    cancelText="Dismiss"
                    placeholder="Post Category"
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) =>
                        setPostCategory(e.detail.value ?? PostCategory.Announcement)
                    }
                >
                    {Object.keys(PostCategory).map((v, k) => (
                        <IonSelectOption key={k} value={v}>
                            {v}
                        </IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>
            <IonItem>
                <IonLabel>Content</IonLabel>
                <IonInput
                    type="text"
                    value={content}
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setContent(e.detail.value ?? '')}
                ></IonInput>
            </IonItem>
            <IonButton color="danger" onClick={uploadPost}>
                Upload Post
            </IonButton>
        </IonList>
    );
};
export default WritePost;
