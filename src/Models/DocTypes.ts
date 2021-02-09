import { PostCategory } from './Enums';

export interface UserDoc {
    firstName: string;
    lastName: string;
    uid: string;
    [key: string]: any;

    //[key: string]: any;

    // Add other user fields here
}
export interface PostDoc {
    title: string;
    content: string;
    uid: string;
    timestamp: firebase.default.firestore.Timestamp;
    comments?: Array<string>;
    category: string;
    [key: string]: any;
}
export interface CommentDoc {
    replyTo: string;
    uid: string;
    content: string;
    timestamp: string;

    [key: string]: any;
}
