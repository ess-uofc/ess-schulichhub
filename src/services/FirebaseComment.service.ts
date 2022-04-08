import { CommentAggregations, IComment, IUser } from './models/DocTypes.model';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from './data/firebase';
import FirebaseDocument from './FirebaseDocument.service';
import User from './User.service';
export default class FirebaseCommentService extends FirebaseDocument {
    /**
     * Comment class for holding comments
     * @author Robert Brown, Ratik Kapoor
     * @since 0.0.4z
     */

    id: string;
    content: string;
    timestamp: Timestamp;
    replyToPost: string;
    replyToComment: string;
    user: User;
    aggregations: CommentAggregations;

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
        timestamp: Timestamp,
        replyToPost: string,
        user: User,
        replyToComment: string,
        aggregations: CommentAggregations,
    ) {
        super(timestamp);
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.replyToPost = replyToPost;
        this.user = user;
        this.replyToComment = replyToComment;
        this.aggregations = aggregations;
    }

    public toJson(): IComment {
        return {
            id: this.id,
            replyToPost: this.replyToPost,
            user: this.user as IUser,
            content: this.content,
            timestamp: this.timestamp,
            replyToComment: this.replyToComment,
            aggregations: this.aggregations,
        };
    }

    public static toFirestore(comment: FirebaseCommentService): IComment {
        return comment.toJson();
    }

    /**
     * Called by the Firestore SDK to convert Firestore data into an object of
     * type T. You can access your data by calling: `snapshot.data(options)`.
     *
     * @param snapshot A QueryDocumentSnapshot containing your data and metadata.
     * @param options The SnapshotOptions from the initial call to `data()`.
     */
    public static fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): FirebaseCommentService {
        const data = snapshot.data(options) as IComment;
        const id = snapshot.id;
        console.log(data);

        return new this(
            id,
            data.content,
            data.timestamp,
            data.replyToPost,
            new User(data.user as IUser),
            data.replyToComment,
            data.aggregations,
        );
    }
}
