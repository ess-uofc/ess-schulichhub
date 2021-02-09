import User from './User';
import { Timestamp } from '@firebase/firestore-types';

export default class Post {
    /**
     * Post class for holding information about bosts
     * @author Robert Brown
     */

    content: string;
    title: string;
    timestamp?: Timestamp;
    user?: User;

    /**
     * default constructor
     * @param title title of the post
     * @param user user who created the post
     * @param timestamp time the post was created
     * @param content content of the post
     */
    constructor(title: string, content: string, timestamp?: Timestamp, user?: User) {
        this.title = title;
        this.user = user;
        this.timestamp = timestamp;
        this.content = content;
    }
}
