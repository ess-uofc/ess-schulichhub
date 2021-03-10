import { createContext, useContext } from 'react';

export type ReplyCommentPairType = {
    replyToCommentID: string;
    setReplyToCommentID: (id: string) => void;
};

export const ReplyCommentPairContext = createContext<ReplyCommentPairType>({
    replyToCommentID: '',
    setReplyToCommentID: () => console.log('No comment pair provider error'),
});

export const useReplyCommentPair = (): ReplyCommentPairType => useContext(ReplyCommentPairContext);
