import { PostAttachmentType } from './Enums';
import { DocumentReference, Timestamp } from './firebase';

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
    title: string;
    content: string;
    uid: string;
    timestamp: Timestamp;
    comments?: Array<string>;
    category: string;
    attachmentUrl?: string;
    attachmentType?: PostAttachmentType;
}
export interface IComment {
    replyTo: string;
    user?: IUser;
    content: string;
    timestamp: Timestamp;
    id?: string;
}
