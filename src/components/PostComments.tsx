import React from 'react';
import './PostComments.scss';
import Comment from '../Models/Comment';
import SingleComment from './SingleComment';
import { IonList, IonLabel, IonListHeader } from '@ionic/react';
import PropTypes from 'prop-types';

const PostComments: React.FC<{ comments?: { id: string; comment: Comment }[] }> = (props) => {
    const commentsArray: Array<Array<number>> = [[0, 1, 2, 3]];
    return (
        <IonList className="commentContainer">
            <IonListHeader>
                <IonLabel>Comments</IonLabel>
            </IonListHeader>
            {props.comments &&
                props.comments.map((v, k) => {
                    return <SingleComment key={k} comment={v.comment} commentArray={commentsArray[0]}></SingleComment>;
                })}
        </IonList>
    );
};

PostComments.propTypes = {
    comments: PropTypes.array,
};

export default PostComments;
