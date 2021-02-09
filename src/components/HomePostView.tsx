import React from 'react';
import './HomePostView.scss';
import { IonContent } from '@ionic/react';
import PostContainer from '../components/PostContainer';
import Post from '../Models/Post';
import { PostCategory } from '../Models/Enums';

const HomePostView: React.FC = () => {
    const testPost = new Post('Test', 'testing 123', 1612037497, PostCategory.Discussion);
    return (
        <IonContent>
            <PostContainer postData={testPost}></PostContainer>
            <PostContainer postData={testPost}></PostContainer>
            <PostContainer postData={testPost}></PostContainer>
            <PostContainer postData={testPost}></PostContainer>
        </IonContent>
    );
};

export default HomePostView;
