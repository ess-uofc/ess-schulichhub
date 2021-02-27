import FirebaseDocument from './FirebaseDocument';
import User from './User';
export default class Comment extends FirebaseDocument {
    /**
     * Comment class for holding comments
     * @author Robert Brown
     * @since 0.0.4
     */

    id: string;
    content: string;
    timestamp: firebase.default.firestore.Timestamp;
    replyTo?: string;
    user?: User;

    /**
     * default constructor for the comment class
     * @param id comment identifier
     * @param content content of the comment
     * @param timestamp time the comment was posted
     * @param replyTo (optional) if the comment is in reply, the parent comment
     * @param user (optional for development) user who posted the comment
     */
    constructor(
        id: string,
        content: string,
        timestamp: firebase.default.firestore.Timestamp,
        replyTo?: string,
        user?: User,
    ) {
        super(timestamp);
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.replyTo = replyTo;
        this.user = user;
    }
}
