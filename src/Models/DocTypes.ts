export interface UserDoc {
    firstName: string;
    lastName: string;

    //[key: string]: any;

    // Add other user fields here
}
export interface PostDoc { 
    title: string,
    content: string,
    [key: string]: any,
    
}
export interface CommentDoc {
    title: string;
    content: string;
    [key: string]: any;
}