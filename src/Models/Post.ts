import firebase from 'firebase';
import { PostCategory } from './Enums';
import FirebaseDocument from './FirebaseDocument';
import PostAttachment from './PostAttachment';
export default class Post extends FirebaseDocument {
    id: string;
    content: string;
    title: string;
    timestamp?: firebase.firestore.Timestamp;
    uid: string;
    attachment?: PostAttachment;
    category: PostCategory;

    /**
     * Default constructor
     *
     * @param title - Title of the post
     * @param user - User who created the post TODO: Make mandatory
     * @param timestamp - Time the post was created
     * @param content - Content of the post
     * @param category - Category of the post
     * @param attachment - Optional attachment for the post
     */
    constructor(
        id: string,
        title: string,
        content: string,
        category: PostCategory,
        timestamp: firebase.firestore.Timestamp,
        uid: string,
        attachment?: PostAttachment,
    ) {
        super();
        this.id = id;
        this.title = title;
        this.uid = uid;
        this.timestamp = timestamp;
        this.content = content;
        this.category = category;
        this.attachment = attachment;
        
    }
}
