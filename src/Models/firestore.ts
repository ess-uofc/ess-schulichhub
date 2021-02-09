import { collapseTextChangeRangesAcrossMultipleVersions, InterfaceType, TypeQueryNode } from 'typescript';
import app from './firebase';

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
    public static async query(
        collection: string,
        field: string,
        operator: firebase.default.firestore.WhereFilterOp,
        value: any,
    ): Promise<firebase.default.firestore.QuerySnapshot<firebase.default.firestore.DocumentData>> {
        const query = await this.db.collection(collection).where(field, operator, value).get();
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
