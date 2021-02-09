/**
 * Enums.ts
 *
 * This file is used to store enumerations to be used for type checking across various components of the Hub
 */

/**
 * Enum: UserRole
 *
 * Associated with a user in order to define permissions
 * @since 0.0.5
 * @author Ratik Kapoor
 */
export enum UserRole {
    Student,
    Club,
    Council,
    Moderator,
    Administrator,
    External,
    DeansOffice,
}

/**
 * Enum: PostCategory
 *
 * Defines category of post to be used in filtering and tagging
 * @since 0.0.5
 * @author Ratik Kapoor
 */
export enum PostCategory {
    Discussion,
    Opportunity,
    Announcement,
    Event,
    Advertisement,
}

/**
 * Enum: PostAttachmentType
 *
 * Contains types of possible attachments to posts to render accordingly
 * @since 0.0.5
 * @author Ratik Kapoor
 */
export enum PostAttachmentType {
    Website,
    Document,
    Image,
}
