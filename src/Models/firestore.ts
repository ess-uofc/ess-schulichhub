import { collapseTextChangeRangesAcrossMultipleVersions, InterfaceType, TypeQueryNode } from 'typescript';
import { PostDoc } from './DocTypes';
import app from './firebase';
import Post from './Post';

export default class FireStoreDB {
    /**
     * @author Mohamad Abdel Rida
     * @method
     */
    static db = app.firestore();

    public static async fetchDoc<DocType>(
        docID: string,
    ): Promise<firebase.default.firestore.DocumentData | undefined | null> {
        try {
            const doc = await this.db.doc(docID).get();
            return doc.data() as DocType;
        } catch (e) {
            return null;
        }
    }
    public static async query<T>(
        collection: string,
        field: string,
        operator: firebase.default.firestore.WhereFilterOp,
        value: any,
    ): Promise<Array<firebase.default.firestore.DocumentData>> {
        const query = await (await this.db.collection(collection).where(field, operator, value).get()).docs.map(
            (doc) => doc.data() as T,
        );
        return query;
    }

    public static async uploadDoc<DocType>(collection: string, fields: DocType): Promise<void> {
        try {
            const res = await this.db.collection(collection).doc().set(fields);
        } catch (e) {
            console.log(e);
        }
    }
}
