import firebase from 'firebase';
import User from './User';
export default class Post {
    content: string;
    title: string;
    timestamp?: firebase.firestore.Timestamp;
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
    constructor(title: string, content: string, timestamp?: firebase.firestore.Timestamp, user?: User) {
        this.title = title;
        this.user = user;
        this.timestamp = timestamp;
        this.content = content;
        this.category = category;
        this.attachment = attachment;
    }
    public getTimePosted(): string {
        /**
         * @author Mohamad Abdel Rida
         * Returns a formatted string of when the post
         * was created.
         *
         *
         */
        if (this.timestamp) {
            const now = firebase.firestore.Timestamp.now();

            const diff = now.seconds - this.timestamp.seconds;

            if (diff / 86400 >= 1) {
                return Math.ceil(diff / 86400) + ' days ago';
            } else {
                if (diff > 3600) {
                    return Math.ceil(diff / 3600) + ' hours go';
                } else {
                    return Math.ceil(diff / 60) + '  minutes ago';
                }
            }
        } else {
            return 'Some time Somewhere in the cosmic web';
        }
    }
}
