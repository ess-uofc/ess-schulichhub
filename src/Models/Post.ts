import User from './User';
import { PostCategory } from './Enums';
import PostAttachment from './PostAttachment';

/**
 * Post class for holding information about posts
 * @author Robert Brown
 */
export default class Post {
    content: string;
    title: string;
    timestamp: number;
    category: PostCategory;
    attachment?: PostAttachment;
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
    constructor(
        title: string,
        content: string,
        timestamp: number,
        category: PostCategory,
        user?: User,
        attachment?: PostAttachment,
    ) {
        this.title = title;
        this.user = user;
        this.timestamp = timestamp;
        this.content = content;
        this.category = category;
        this.attachment = attachment;
    }
}
