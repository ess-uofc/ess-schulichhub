import React from 'react';
import './PostComments.scss';
import Comment from '../Models/Comment';
import CommentView from './CommentView';
import { IonList, IonLabel, IonListHeader } from '@ionic/react';
import PropTypes from 'prop-types';

const PostComments: React.FC<{
    comments?: { id: string; comment: Comment }[];
}> = (props) => {
    return (
        <IonList className="commentContainer">
            <IonListHeader>
                <IonLabel>Comments</IonLabel>
            </IonListHeader>
            {props.comments &&
                props.comments.map((v, k) => {
                    return <CommentView key={k} comment={v.comment} />;
                })}
        </IonList>
    );
};

PostComments.propTypes = {
    comments: PropTypes.array,
};

export default PostComments;
