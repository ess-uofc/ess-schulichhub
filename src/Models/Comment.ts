import { IComment, IUser } from './DocTypes';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from './firebase';
import FirebaseDocument from './FirebaseDocument';
import User from './User';
export default class Comment extends FirebaseDocument {
    /**
     * Comment class for holding comments
     * @author Robert Brown, Ratik Kapoor
     * @since 0.0.4
     */

    id: string;
    content: string;
    timestamp: Timestamp;
    replyTo: string;
    user: User;

    /**
     * default constructor for the comment class
     * @param id comment identifier
     * @param content content of the comment
     * @param timestamp time the comment was posted
     * @param replyTo (optional) if the comment is in reply, the parent comment
     * @param user (optional for development) user who posted the comment
     */
    constructor(id: string, content: string, timestamp: Timestamp, replyTo: string, user: User) {
        super(timestamp);
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.replyTo = replyTo;
        this.user = user;
    }

    public toJson(): IComment {
        return {
            id: this.id,
            replyTo: this.replyTo,
            user: this.user as IUser,
            content: this.content,
            timestamp: this.timestamp,
        };
    }

    public static toFirestore(comment: Comment): IComment {
        return comment.toJson();
    }

    /**
     * Called by the Firestore SDK to convert Firestore data into an object of
     * type T. You can access your data by calling: `snapshot.data(options)`.
     *
     * @param snapshot A QueryDocumentSnapshot containing your data and metadata.
     * @param options The SnapshotOptions from the initial call to `data()`.
     */
    public static fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Comment {
        const data = snapshot.data(options) as IComment;
        const id = snapshot.id;
        console.log(data);

        return new this(id, data.content, data.timestamp, data.replyTo, new User(data.user as IUser));
    }
}
