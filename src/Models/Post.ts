import { Timestamp } from './firebase';
import User from './User';
export default class Post {
    content: string;
    title: string;
    timestamp?: typeof Timestamp;
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
    constructor(title: string, content: string, timestamp?: typeof Timestamp, user?: User) {
        this.title = title;
        this.user = user;
        this.timestamp = timestamp;
        this.content = content;
        this.category = category;
        this.attachment = attachment;
    }
}
