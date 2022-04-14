import { Timestamp } from './data/firebase';

export default class FirebaseDocumentService {
    /**
     *
     *@author Mohamad Abdel Rida
     *  A class to rule them all,
     * this class allows us to pass down functions to all
     * models that are related to firebase documents
     *
     */

    timestamp: Timestamp;

    public getTimePosted(): string {
        /**
         * @author Mohamad Abdel Rida
         * Returns a formatted string of when the post
         * was created.
         *
         *
         */
        if (this.timestamp) {
            const now = Timestamp.now();

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

    constructor(timestamp: Timestamp) {
        this.timestamp = timestamp;
    }
}
