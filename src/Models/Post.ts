import { IPost, PostAggregations } from './DocTypes';
import { PostCategory } from './Enums';
import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from './firebase';
import FirebaseDocument from './FirebaseDocument';
import PostAttachment from './PostAttachment';
export default class Post extends FirebaseDocument {
    id: string;
    postReference?: string;
    content: string;
    title: string;
    uid: string;
    attachment?: PostAttachment;
    category: PostCategory;
    aggregations: PostAggregations;

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
        timestamp: Timestamp,
        uid: string,
        aggregations: PostAggregations,
        postReference?: string,
        attachment?: PostAttachment,
    ) {
        super(timestamp);
        this.id = id;
        this.postReference = postReference;
        this.title = title;
        this.uid = uid;
        this.content = content;
        this.category = category;
        this.attachment = attachment;
        this.aggregations = aggregations;
    }

    public static toFirestore(post: Post): IPost {
        return {
            uid: post.uid,
            title: post.title,
            timestamp: post.timestamp,
            content: post.content,
            category: post.category,
            attachmentUrl: post.attachment?.getHyperlink(),
            attachmentType: post.attachment?.getAttachmentType(),
            postReference: post.postReference,
            aggregations: post.aggregations,
        };
    }

    /**
     * Called by the Firestore SDK to convert Firestore data into an object of
     * type T. You can access your data by calling: `snapshot.data(options)`.
     *
     * @param snapshot A QueryDocumentSnapshot containing your data and metadata.
     * @param options The SnapshotOptions from the initial call to `data()`.
     */
    public static fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): Post {
        const data = snapshot.data(options) as IPost;
        const id = snapshot.id;

        const attachment =
            data.attachmentUrl && data.attachmentType
                ? new PostAttachment(data.attachmentUrl, data.attachmentType)
                : undefined;
        return new this(
            id,
            data.title,
            data.content,
            data.category as PostCategory,
            data.timestamp,
            data.uid,
            data.aggregations,
            data.postReference,
            attachment,
        );
    }
}
