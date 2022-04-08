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
    IonTextarea,
} from '@ionic/react';
import { IPost } from '../services/models/DocTypes.model';
import { InputChangeEventDetail } from '@ionic/core';
import { loadingComponent } from './Loading';
import { PostCategory } from '../services/models/Enums.model';
import { useHistory } from 'react-router';
import './HomePostView.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/User/UserStore';
import { db, Timestamp } from '../services/data/firebase';

const WritePost: React.FC = () => {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [postCategory, setPostCategory] = useState<string>(PostCategory.Discussion);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const user = useSelector(selectUser);
    console.log(user);

    async function uploadPost() {
        /**
         * @author Mohamad Abdel Rida
         *  Uploads a post
         */
        setLoading(true);

        if (user) {
            const _now = Timestamp.now();
            await db.uploadDoc<IPost>('posts', {
                title: title,
                uid: user.uid,
                content: content,
                timestamp: _now,
                category: postCategory,
                aggregations: {
                    comments: 0,
                    likes: 0,
                    views: 0,
                },
            });
            setLoading(false);
            history.push('/home');

            setContent('');
            setTitle('');
            setPostCategory(PostCategory.Discussion);
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
                    spellcheck={true}
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
                <IonTextarea
                    spellcheck={true}
                    autoGrow={true}
                    inputMode="text"
                    value={content}
                    onIonChange={(e: CustomEvent<InputChangeEventDetail>) => setContent(e.detail.value ?? '')}
                />
            </IonItem>
            <IonButton color="danger" onClick={uploadPost}>
                Upload Post
            </IonButton>
        </IonList>
    );
};
export default WritePost;
