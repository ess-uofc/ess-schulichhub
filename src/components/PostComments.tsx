import React from 'react';
import './PostComments.scss';
import Comment from '../Models/Comment';
import SingleComment from './SingleComment';
import { IonList, IonLabel, IonListHeader } from '@ionic/react';

const PostComments: React.FC = () => {
    const testcomment = new Comment('123456', 'This is a very basic test post.', new Date());
    return (
        <IonList className="commentContainer">
            <IonListHeader>
                <IonLabel>Comments</IonLabel>
            </IonListHeader>
            <SingleComment comment={testcomment}></SingleComment>
            <SingleComment comment={testcomment}></SingleComment>
            <SingleComment comment={testcomment}></SingleComment>
        </IonList>
    );
};

export default PostComments;
