import { PostAttachmentType } from './Enums';
import { DocumentReference, Timestamp } from './firebase';

export interface UserDoc {
    firstName: string;
    lastName: string;
    uid: string;
    major: string;
    email: string;
    ref:DocumentReference
    [key: string]: any;

    // Add other user fields here
}
export interface PostDoc {
    id?: string;
    title: string;
    content: string;
    uid: string;
    timestamp: Timestamp;
    comments?: Array<string>;
    category: string;
    attachmentUrl?: string;
    attachmentType?: PostAttachmentType;
    [key: string]: any;
}
export interface CommentDoc {
    replyTo: string;
    user?: UserDoc;
    content: string;
    timestamp: Timestamp;
    [key: string]: any;
}
