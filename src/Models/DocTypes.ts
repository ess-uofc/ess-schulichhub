import { PostAttachmentType } from './Enums';
import { DocumentReference, Timestamp } from 'firebase/firestore';

export interface IUser {
    firstName: string;
    lastName: string;
    uid: string;
    major: string;
    email: string;
    ref: DocumentReference;
    photoUrl?: string;

    // Add other user fields here
}
export interface IPost {
    id?: string;
    postReference?: string;
    title: string;
    content: string;
    uid: string;
    timestamp: Timestamp;
    comments?: Array<string>;
    category: string;
    attachmentUrl?: string;
    attachmentType?: PostAttachmentType;
    aggregations: PostAggregations;
}
export interface IComment {
    replyToPost: string;
    user?: IUser;
    content: string;
    timestamp: Timestamp;
    id?: string;
    replyToComment: string;
    aggregations: CommentAggregations;
}

export interface CommentAggregations {
    replyComments: number;
}

export interface ILike {
    uid: string;
    likedId: string;
    timestamp: Timestamp;
}
export interface PostAggregations {
    views: number;
    comments: number;
    likes: number;
}
