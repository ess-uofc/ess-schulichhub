import React from 'react';
import './HomePostView.css';
import { IonContent } from '@ionic/react';
import PostContainer from '../components/PostContainer';

const HomePostView: React.FC = () => {
    return (
        <IonContent>
            <PostContainer StudentName="Robert"></PostContainer>
            <PostContainer StudentName="Ratik"></PostContainer>
            <PostContainer StudentName="Robert"></PostContainer>
            <PostContainer StudentName="Robert"></PostContainer>
        </IonContent>
    );
};

export default HomePostView;
