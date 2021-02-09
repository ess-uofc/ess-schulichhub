import app from './firebase';
import { DocumentData, WhereFilterOp,} from '@firebase/firestore-types';

export default class FireStoreDB {
    /**
     * @author Mohamad Abdel Rida
     * @method
     */
    static db = app.firestore();

    public static async fetchDoc<DocType>(docID: string): Promise<DocumentData | undefined | null> {
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
        operator: WhereFilterOp,
        value: any,
    ): Promise<Array<DocumentData>> {
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
