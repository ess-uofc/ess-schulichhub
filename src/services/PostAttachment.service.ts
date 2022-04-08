import { PostAttachmentType } from './models/Enums.model';

/**
 * PostAttachment
 *
 * This class holds information for an attachment to a post
 *
 * @author Ratik Kapoor
 * @since 0.0.5
 */
export default class PostAttachment {
    private hyperlink: string;
    private attachmentType: PostAttachmentType;

    /**
     * Default constructor
     * @param hyperlink - Hyperlink to external resource to render
     * @param attachmentType - Type of attachment (as defined in `Enums.ts`)
     */
    constructor(hyperlink: string, attachmentType: PostAttachmentType) {
        this.hyperlink = hyperlink;
        this.attachmentType = attachmentType;
    }

    /**
     * Gets hyperlink of post attachment from instance
     *
     * @returns - String representing hyperlink
     */
    getHyperlink(): string {
        return this.hyperlink;
    }

    /**
     * Gets attachment type of post attachment from instance
     *
     * @returns - PostAttachmentType enum of instance
     */
    getAttachmentType(): PostAttachmentType {
        return this.attachmentType;
    }

    /**
     * This method updates the hyperlink stored in the object instance
     *
     * @param newLink New hyperlink for attachment
     */
    updateHyperlink(newLink: string): void {
        this.hyperlink = newLink;
    }

    /**
     * This method updates the PostAttachmentType enum stored in the object instance
     *
     * @param newType New attachment type for attachment
     */
    updateAttachmentType(newType: PostAttachmentType): void {
        this.attachmentType = newType;
    }
}
