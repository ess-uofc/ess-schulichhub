import firebase from 'firebase';
import { PostAttachmentType, PostCategory } from './Enums';
import User from './User';
export default class Post {
    content: string;
    title: string;
    timestamp?: firebase.firestore.Timestamp;
    user?: User;
    attachment?: PostAttachmentType;
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
        title: string,
        content: string,
        category: PostCategory,
        timestamp: firebase.firestore.Timestamp,
        user?: User,
        attachment?: PostAttachmentType,
    ) {
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
                    return Math.ceil(diff / 3600) + ' hours ago';
                } else if (diff >= 60) {
                    const minutes = Math.ceil(diff / 60);
                    return minutes == 1 ? minutes + '  minute ago' : minutes + '  minutes ago';
                } else {
                    return 'A few seconds ago';
                }
            }
        } else {
            return 'Some time Somewhere in the cosmic web';
        }
    }
}
