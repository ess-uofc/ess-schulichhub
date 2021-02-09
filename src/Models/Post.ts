import User from './User';
import { Timestamp } from '@firebase/firestore-types';

/**
 * Post class for holding information about posts
 * @author Robert Brown
 */
export default class Post {
    content: string;
    title: string;
    timestamp?: Timestamp;
    user?: User;

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
    constructor(title: string, content: string, timestamp?: Timestamp, user?: User) {
        this.title = title;
        this.user = user;
        this.timestamp = timestamp;
        this.content = content;
        this.category = category;
        this.attachment = attachment;
    }
}
