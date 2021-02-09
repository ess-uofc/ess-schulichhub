export interface UserDoc {
    firstName: string;
    lastName: string;
    [key: string]: any;

    //[key: string]: any;

    // Add other user fields here
}
export interface PostDoc {
    title: string;
    content: string;
    uid: string;
    comments: Array<string>;
    [key: string]: any;
}
export interface CommentDoc {
    replyTo: string;
    uid: string;
    content: string;
    [key: string]: any;
}
